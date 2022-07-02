import { ChildEntity, Column, Unique } from 'typeorm';
import { AbstractAddTypeORM } from './abstract-add.typeorm';
import { AddType } from '../../domain/enums/add-type.enum';
import { DescriptionTypeORM } from '../value-objects/description.typeorm';
import { ProductDescriptionTypeORM } from '../value-objects/product-description.typeorm'; 
@ChildEntity(AddType.CHILDREN)
export class AddTypeORM extends AbstractAddTypeORM {

  @Column((type) => ProductDescriptionTypeORM, { prefix: false })
  public productdescription: ProductDescriptionTypeORM;

  @Column((type) => DescriptionTypeORM, { prefix: false })
  public description: DescriptionTypeORM;
}