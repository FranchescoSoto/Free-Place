import { Column, Unique } from 'typeorm';

export class DescriptionTypeORM {
  @Column('varchar', { name: 'description', length: 150, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): DescriptionTypeORM {
    return new DescriptionTypeORM(value);
  }
}