import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterAddRequest } from '../dtos/request/register-add-request.dto';
import { RegisterAddResponse } from '../dtos/response/register-person-response.dto';
import { RegisterAddValidator } from '../validators/register-add.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterAdd } from '../commands/register-add.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class AddApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPersonValidator: RegisterAddValidator,
  ) {}

  async register(
    registerPersonRequest: RegisterAddRequest,
  ): Promise<Result<AppNotification, RegisterAddResponse>> {
    const notification: AppNotification = await this.registerPersonValidator.validate(registerPersonRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerAdd: RegisterAdd = new RegisterAdd(
      registerPersonRequest.id,
      registerPersonRequest.productname,
      registerPersonRequest.companyname,
      registerPersonRequest.description
    );
    const addId: number = await this.commandBus.execute(registerAdd);
    const registerResponse: RegisterAddResponse = new RegisterAddResponse(
      addId,
      registerPersonRequest.productname,
      registerPersonRequest.companyname,
      registerPersonRequest.description,
    );
    return Result.ok(registerResponse);
  }
}