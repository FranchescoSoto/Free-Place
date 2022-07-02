import { AbstractAddRegistered } from './adbstract-add-registered.event';

export class AddRegistered extends AbstractAddRegistered {
  constructor(
    public readonly id: number,
    public readonly productname: string,
    public readonly companyname: string,
    public readonly description: string,
  ) {
    super(id);
  }
}