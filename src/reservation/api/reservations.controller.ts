import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { OpenReservationRequest } from '../application/dtos/request/open-reservations-request.dto';
import { OpenReservationResponse } from '../application/dtos/response/open-reservations-response.dto';
import { ReservationsApplicationService } from '../application/services/reservations-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetReservationByIdQuery } from '../application/queries/get-reservation-by-id.query';
import { GetReservationsQuery } from "../application/queries/get-reservations.query";

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly accountsApplicationService: ReservationsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async open(
    @Body() openAccountRequest: OpenReservationRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenReservationResponse> = await this.accountsApplicationService.open(openAccountRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getAccounts(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetReservationsQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') accountId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetReservationByIdQuery(accountId));
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}