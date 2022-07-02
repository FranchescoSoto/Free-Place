import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterAddRequest } from '../dtos/request/register-add-request.dto';
import { Repository } from 'typeorm';
import { AbstractAddTypeORM } from '../../infrastructure/entities/abstract-add.typeorm';
import { AddTypeORM } from '../../infrastructure/entities/add.typeorm';

@Injectable()
export class RegisterAddValidator {
  constructor(
    @InjectRepository(AddTypeORM)
    private addRepository: Repository<AddTypeORM>,
  ) {
  }

  public async validate(
    registerAddRequest: RegisterAddRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const productName: string = registerAddRequest.productname ? registerAddRequest.productname.trim() : '';
    if (productName.length <= 0) {
      notification.addError('Product name is required', null);
    }
    const companyName: string = registerAddRequest.companyname ? registerAddRequest.companyname.trim() : '';
    if (companyName.length <= 0) {
      notification.addError('Company name is required', null);
    }
    const dni: string = registerAddRequest.description ? registerAddRequest.description.trim() : '';
    if (dni.length <= 0) {
      notification.addError('Description is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    
    return notification;
  }
}