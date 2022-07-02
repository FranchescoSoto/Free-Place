import { Column } from 'typeorm';

export class ProductDescriptionTypeORM {
  @Column('varchar', { name: 'product_name', length: 75, nullable: true })
  public productname: string;

  @Column('varchar', { name: 'company_name', length: 75, nullable: true })
  public companyname: string;

  private constructor(productname: string, companyname: string) {
    this.productname = productname;
    this.companyname = companyname;
  }

  public static from(productname: string, companyname: string): ProductDescriptionTypeORM {
    return new ProductDescriptionTypeORM(productname, companyname);
  }
}