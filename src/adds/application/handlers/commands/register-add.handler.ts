import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDescription } from 'src/common/domain/value-objects/product-description.value';
import { AddFactory } from '../../../domain/factories/add.factory';
import { AddId } from '../../../domain/value-objects/add-id.value';
import { Description } from '../../../domain/value-objects/description.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { RegisterAdd } from '../../commands/register-add.command';
import { Add } from '../../../domain/entities/add.entity';
import { AddMapper } from '../../mappers/add.mapper';
import { AddTypeORM } from '../../../infrastructure/entities/add.typeorm';

@CommandHandler(RegisterAdd)
export class RegisterAddHandler
  implements ICommandHandler<RegisterAdd> {
  constructor(
    @InjectRepository(AddTypeORM)
    private personRepository: Repository<AddTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterAdd) {
    let addId: number = 0;
    const ProductDescriptionResult: Result<AppNotification, ProductDescription> = ProductDescription.create(command.productname, command.companyname);
    if (ProductDescriptionResult.isFailure()) {
      return addId;
    }
    const DescResult: Result<AppNotification, Description> = Description.create(command.description);
    if (DescResult.isFailure()) {
      return addId;
    }
    
    let add: Add = AddFactory.createFrom(ProductDescriptionResult.value,DescResult.value);
    let addTypeORM: AddTypeORM = AddMapper.toTypeORM(add);
    addTypeORM = await this.personRepository.save(addTypeORM);
    if (addTypeORM == null) {
      return addId;
    }
    addId = Number(addTypeORM.id);
    add.changeId(AddId.of(addId));
    add = this.publisher.mergeObjectContext(add);
    add.register();
    add.commit();
    return addId;
  }
}