import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AddRegistered } from '../../../domain/events/add-registered.event';

@EventsHandler(AddRegistered)
export class AddRegisteredHandler implements IEventHandler<AddRegistered> {
  constructor() {}

  async handle(event: AddRegistered) {
    console.log('handle logic for addRegistered');
    console.log(event);
  }
}