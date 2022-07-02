import { AddTypeORM } from 'src/adds/infrastructure/entities/add.typeorm';
import { Add } from 'src/adds/domain/entities/add.entity';
import { ProductDescriptionTypeORM } from 'src/adds/infrastructure/value-objects/product-description.typeorm';
import { DescriptionTypeORM } from 'src/adds/infrastructure/value-objects/description.typeorm';
export class AddMapper {
  public static toTypeORM(add: Add): AddTypeORM {
    const addTypeORM: AddTypeORM = new AddTypeORM();
    addTypeORM.productdescription = ProductDescriptionTypeORM.from(add.getProductname(), add.getCompanyname());
    addTypeORM.description = DescriptionTypeORM.from(add.getDescription());
    return addTypeORM;
  }
}