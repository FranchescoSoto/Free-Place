import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenReservation } from '../commands/open-reservation.command';
import { OpenReservationResponse } from '../dtos/response/open-reservations-response.dto';
import { OpenReservationValidator } from '../validators/open-reservation.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { OpenReservationRequest } from '../dtos/request/open-reservations-request.dto';

@Injectable()
export class ReservationsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private openreservationValidator: OpenReservationValidator,
  ) {}

  async open(openReservationRequestDto: OpenReservationRequest): Promise<Result<AppNotification, OpenReservationResponse>> {
    const notification: AppNotification = await this.openreservationValidator.validate(openReservationRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const openreservation: OpenReservation = new OpenReservation(
      openReservationRequestDto.clientId,
      openReservationRequestDto.number
    );
    const reservationId: number = await this.commandBus.execute(openreservation);
    const openReservationResponse: OpenReservationResponse = new OpenReservationResponse(
      reservationId, openreservation.number, null, 1, null, null, openreservation.clientId
    );
    return Result.ok(openReservationResponse);
  }
}