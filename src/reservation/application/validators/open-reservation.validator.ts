import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { ReservationTypeORM } from '../../infrastructure/entities/reservation.typeorm';
import { OpenReservationRequest } from '../dtos/request/open-reservations-request.dto';

@Injectable()
export class OpenReservationValidator {
  constructor(@InjectRepository(ReservationTypeORM) private accountRepository: Repository<ReservationTypeORM>) {}

  public async validate(openAccountRequestDto: OpenReservationRequest): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const number: string = openAccountRequestDto.number.trim();
    if (number.length <= 0) {
      notification.addError('Account number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const accountTypeORM: ReservationTypeORM = await this.accountRepository.createQueryBuilder().where("number = :number", { number }).getOne();
    if (accountTypeORM != null) {
      notification.addError('Account number is taken', null);
    }
    return notification;
  }
}