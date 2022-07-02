import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OpenReservation } from '../../commands/open-reservation.command';
import { ReservationTypeORM } from '../../../infrastructure/entities/reservation.typeorm';
import { ReservationNumber } from '../../../domain/value-objects/reservation-number.value';
import { ReservationFactory } from '../../../domain/factories/reservation.factory';
import { Reservation } from '../../../domain/entities/reservation.entity';
import { ReservationMapper } from '../../mappers/reservation.mapper';
import { ClientId } from '../../../../clients/domain/value-objects/client-id.value';
import { ReservationId } from '../../../domain/value-objects/reservation-id.value';

@CommandHandler(OpenReservation)
export class OpenReservationHandler
  implements ICommandHandler<OpenReservation> {
  constructor(
    @InjectRepository(ReservationTypeORM)
    private reservationRepository: Repository<ReservationTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: OpenReservation) {
    let reservationId: number = 0;
    const reservationNumberResult: Result<AppNotification, ReservationNumber> = ReservationNumber.create(command.number);
    if (reservationNumberResult.isFailure()) {
      return reservationId;
    }
    const clientId: ClientId = ClientId.of(command.clientId);
    let reservation: Reservation = ReservationFactory.createFrom(reservationNumberResult.value, clientId, null);
    let reservationTypeORM:ReservationTypeORM = ReservationMapper.toTypeORM( reservation);
    reservationTypeORM = await this.reservationRepository.save(reservationTypeORM);
    if (reservationTypeORM == null) {
      return reservationId;
    }
    reservationId = Number(reservationTypeORM.id);
    reservation.changeId(ReservationId.of(reservationId));
    reservation = this.publisher.mergeObjectContext(reservation);
    reservation.open();
    reservation.commit();
    return reservationId;
  }
}