import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ReservationNumberTypeORM } from '../value-objects/reservation-number.typeorm';
import { ReservationIdTypeORM } from '../value-objects/reservation-id.typeorm';
import { CustomerIdTypeORM } from '../value-objects/customer-id.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/value-objects/audit-trail.typeorm';

@Entity('accounts')
export class ReservationTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => ReservationNumberTypeORM, { prefix: false })
  public number: ReservationNumberTypeORM;


  @Column((type) => CustomerIdTypeORM, { prefix: false })
  public clientId: CustomerIdTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}