import { Description } from '../value-objects/description.value';
import { Add } from '../entities/add.entity';
import { ProductDescription } from '../../../common/domain/value-objects/product-description.value';

export class AddFactory {
  public static createFrom(productdesc: ProductDescription, desc: Description): Add {
    return new Add(productdesc, desc);
  }
}