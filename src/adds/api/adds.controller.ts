import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterAddRequest } from '../application/dtos/request/register-add-request.dto';
import { RegisterAddResponse } from '../application/dtos/response/register-person-response.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetAddsQuery } from '../application/queries/get-adds.query';
import { AddApplicationService } from '../application/services/add-application.service';

@Controller('adds')
export class AddsController {
  constructor(
    private readonly addApplicationService: AddApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/add')
  async registerAdd(
    @Body() registerAddRequest: RegisterAddRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAddResponse> = await this.addApplicationService.register(registerAddRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  

  @Get('/add')
  async getCustomersPerson(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetAddsQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  
}