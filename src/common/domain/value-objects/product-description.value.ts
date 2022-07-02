import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class ProductDescription {
  private readonly productname: string;
  private readonly companyname: string;
  private static MAX_LENGTH: number = 75;

  private constructor(productname: string, companyname: string) {
    this.productname = productname;
    this.companyname = companyname;
  }
  public getproductname(): string {
    return this.productname;
  }

  public getcompanyname(): string {
    return this.companyname;
  }

  public static create(productname: string, companyname: string): Result<AppNotification, ProductDescription> {
    let notification: AppNotification = new AppNotification();
    productname = (productname ?? "").trim();
    companyname = (companyname ?? "").trim();
    if (productname === "") {
      notification.addError('product name is required', null);
    }
    if (companyname === "") {
      notification.addError('company name is required', null);
    }
    if (productname.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an product name is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (companyname.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an company name is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ProductDescription(productname, companyname));
  }
}