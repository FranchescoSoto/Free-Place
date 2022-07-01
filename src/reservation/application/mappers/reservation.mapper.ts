import { ReservationTypeORM } from '../../infrastructure/entities/reservation.typeorm';
import { Reservation } from '../../domain/entities/reservation.entity';
import { ReservationNumberTypeORM } from '../../infrastructure/value-objects/reservation-number.typeorm';
import { CustomerIdTypeORM } from '../../infrastructure/value-objects/customer-id.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/value-objects/audit-trail.typeorm';

export class ReservationMapper {
  public static toTypeORM(reservation: Reservation): ReservationTypeORM {
    const accountTypeORM: ReservationTypeORM = new ReservationTypeORM();
    accountTypeORM.id = reservation.getId() != null ? reservation.getId().getValue() : 0;
    accountTypeORM.number = reservation.getNumber() != null ? ReservationNumberTypeORM.from(reservation.getNumber().getValue()) : null;
    accountTypeORM.clientId = reservation.getClientId() != null ? CustomerIdTypeORM.from(reservation.getClientId().getValue()) : null;
    accountTypeORM.auditTrail = reservation.getAuditTrail() != null ? AuditTrailTypeORM.from(
      reservation.getAuditTrail().getCreatedAt().format(),
      reservation.getAuditTrail().getCreatedBy().getValue(),
      reservation.getAuditTrail().getUpdatedAt().format(),
      reservation.getAuditTrail().getUpdatedBy().getValue()) : null;
    return accountTypeORM;
  }
}