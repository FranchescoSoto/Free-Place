import { AggregateRoot } from '@nestjs/cqrs';
import { AddId } from '../value-objects/add-id.value';
import { AddType } from '../enums/add-type.enum';

export class AbstractAdd extends AggregateRoot {
  protected id: AddId;
  protected type: AddType;

  public constructor(type: AddType) {
    super();
    this.type = type;
  }

  public getId(): AddId {
    return this.id;
  }

  public getType(): AddType {
    return this.type;
  }

  public changeId(id: AddId) {
    this.id = id;
  }
}