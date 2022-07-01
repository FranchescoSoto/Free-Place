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
    private openAccountValidator: OpenReservationValidator,
  ) {}

  async open(openAccountRequestDto: OpenReservationRequest): Promise<Result<AppNotification, OpenReservationResponse>> {
    const notification: AppNotification = await this.openAccountValidator.validate(openAccountRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const openAccount: OpenReservation = new OpenReservation(
      openAccountRequestDto.clientId,
      openAccountRequestDto.number
    );
    const accountId: number = await this.commandBus.execute(openAccount);
    const openReservationResponse: OpenReservationResponse = new OpenReservationResponse(
      accountId, openAccount.number, null, 1, null, null, openAccount.clientId
    );
    return Result.ok(openReservationResponse);
  }
}