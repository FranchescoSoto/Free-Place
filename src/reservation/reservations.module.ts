import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReservationTypeORM } from './infrastructure/entities/reservation.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './api/reservations.controller';
import { ReservationOpenedHandler } from './application/handlers/events/reservation-opened.handler';
import { ReservationsApplicationService } from './application/services/reservations-application.service';
import { OpenReservationValidator } from './application/validators/open-reservation.validator';
import { GetReservationsHandler } from './application/handlers/queries/get-reservations.handler';
import { GetReservationByIdHandler } from './application/handlers/queries/get-reservation-by-id.handler';
import { OpenReservationHandler } from './application/handlers/commands/open-reservation.handler';

export const CommandHandlers = [OpenReservationHandler];
export const EventHandlers = [ReservationOpenedHandler];
export const QueryHandlers = [GetReservationsHandler, GetReservationByIdHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ReservationTypeORM]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsApplicationService,
    OpenReservationValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ReservationsModule {}