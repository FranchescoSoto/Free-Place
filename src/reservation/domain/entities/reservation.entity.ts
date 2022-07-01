import { ClientId } from '../../../clients/domain/value-objects/client-id.value';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { AggregateRoot } from '@nestjs/cqrs';
import { ReservationId } from '../value-objects/reservation-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { ReservationNumber } from '../value-objects/reservation-number.value';
import { ReservationOpened } from '../events/reservation-opened.event';

export class Reservation extends AggregateRoot {
  private id: ReservationId;
  private readonly number: ReservationNumber;
  private readonly clientId: ClientId;
  private readonly auditTrail: AuditTrail;

  public constructor(number: ReservationNumber,  clientId: ClientId, auditTrail: AuditTrail) {
    super();
    this.number = number;
    this.clientId = clientId;
    this.auditTrail = auditTrail;
  }

  public open() {
    const event = new ReservationOpened(this.id.getValue(), this.number.getValue(), this.clientId.getValue());
    this.apply(event);
  }



  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }

  public doesNotExist(): boolean {
    return !this.exist();
  }

  public hasIdentity(): boolean {
    return this.number.getValue().trim().length > 0;
  }

  public getId(): ReservationId {
    return this.id;
  }

  public getNumber(): ReservationNumber {
    return this.number;
  }


  public getClientId(): ClientId {
    return this.clientId;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: ReservationId) {
    this.id = id;
  }
}