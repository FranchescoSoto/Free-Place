import { Module } from '@nestjs/common';
import { AddsController } from './api/adds.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterAddValidator } from './application/validators/register-add.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddRegisteredHandler } from './application/handlers/events/add-registered.handler';
import { GetAddsHandler } from './application/handlers/queries/get-adds.handler';
import { AddApplicationService } from './application/services/add-application.service';
import { RegisterAddHandler } from './application/handlers/commands/register-add.handler';
import { AddTypeORM } from './infrastructure/entities/add.typeorm';
import { AbstractAddTypeORM } from './infrastructure/entities/abstract-add.typeorm';

export const CommandHandlers = [RegisterAddHandler];
export const EventHandlers = [AddRegisteredHandler];
export const QueryHandlers = [GetAddsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([AbstractAddTypeORM, AddTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [AddsController],
  providers: [
    AddApplicationService,
    RegisterAddValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class AddsModule {}