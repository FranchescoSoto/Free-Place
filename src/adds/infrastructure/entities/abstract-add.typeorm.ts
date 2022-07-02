import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AddType } from '../../domain/enums/add-type.enum';

@Entity('clients')
@TableInheritance({ column: 'type', })
export class AbstractAddTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column({ name: 'type', type: 'enum', enum: AddType, default: AddType.CHILDREN })
  readonly type: AddType;
}