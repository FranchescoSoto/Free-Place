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
    private accountRepository: Repository<ReservationTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: OpenReservation) {
    let accountId: number = 0;
    const accountNumberResult: Result<AppNotification, ReservationNumber> = ReservationNumber.create(command.number);
    if (accountNumberResult.isFailure()) {
      return accountId;
    }
    const clientId: ClientId = ClientId.of(command.clientId);
    let account: Reservation = ReservationFactory.createFrom(accountNumberResult.value, clientId, null);
    let accountTypeORM:ReservationTypeORM = ReservationMapper.toTypeORM(account);
    accountTypeORM = await this.accountRepository.save(accountTypeORM);
    if (accountTypeORM == null) {
      return accountId;
    }
    accountId = Number(accountTypeORM.id);
    account.changeId(ReservationId.of(accountId));
    account = this.publisher.mergeObjectContext(account);
    account.open();
    account.commit();
    return accountId;
  }
}