import { ClientId } from '../../../clients/domain/value-objects/client-id.value';
import { Reservation } from '../entities/reservation.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { ReservationNumber } from '../value-objects/reservation-number.value';
import { ReservationId } from '../value-objects/reservation-id.value';

export class ReservationFactory {
  public static createFrom(number: ReservationNumber,  clientId: ClientId, auditTrail: AuditTrail): Reservation {
    return new Reservation(number, clientId, auditTrail);
  }

  public static withId(accountId: ReservationId, number: ReservationNumber, clientId: ClientId, auditTrail: AuditTrail): Reservation {
    let account: Reservation = new Reservation(number, clientId, auditTrail);
    account.changeId(accountId);
    return account;
  }
}