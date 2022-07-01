import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './reservation/reservations.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    url: process.env.FREE_PLACE_NEST_MYSQL,
    migrationsRun: true,
    logging: true,
    timezone: '+00:00',
    bigNumberStrings: false,
    entities: [
      process.env.ENVIRONMENT == 'prod' ? 
      '**/infrastructure/entities/*{.ts,.js}' : 
      'dist/**/infrastructure/entities/*{.ts,.js}'
    ],
    subscribers: [],
    migrations: [
      process.env.ENVIRONMENT == 'prod' ? 
      'common/infrastructure/migrations/*{.ts,.js}' : 
      'dist/common/infrastructure/migrations/*{.ts,.js}'
    ],
    migrationsTableName: "migrations"
  }),
  ClientsModule,
  ReservationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
