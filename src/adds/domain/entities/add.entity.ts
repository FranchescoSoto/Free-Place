import { AddId } from '../value-objects/add-id.value';
import { AbstractAdd } from './abstract-add.entity';
import { AddType } from '../enums/add-type.enum';
import { AddRegistered } from '../events/add-registered.event';
import { Description } from '../value-objects/description.value';
import { ProductDescription } from 'src/common/domain/value-objects/product-description.value';

export class Add extends AbstractAdd {
  private productdescription: ProductDescription;
  private description: Description;
  public constructor(productdescription: ProductDescription, description: Description) {
    super(AddType.CHILDREN);
    this.productdescription = productdescription;
    this.description=description;
  }

  public register() {
    const event = new AddRegistered(this.id.getValue(), this.productdescription.getproductname(), this.productdescription.getcompanyname(), this.description.getValue());
    this.apply(event);
  }

  public getId(): AddId {
    return this.id;
  }

  public getProductname(): string {
    return this.productdescription.getproductname();
  }

  public getCompanyname(): string {
    return this.productdescription.getcompanyname();
  }

  public getDescription(): string {
    return this.description.getValue();
  }

}