import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetReservationsQuery } from "../../queries/get-reservations.query";
import { GetReservationsDto } from '../../dtos/queries/get-reservations.dto';

@QueryHandler(GetReservationsQuery)
export class GetReservationsHandler implements IQueryHandler<GetReservationsQuery> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetReservationsQuery) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      a.client_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      reservations a
    ORDER BY
      a.created_at DESC;`;
    const ormReservations = await manager.query(sql);
    if (ormReservations.length <= 0) {
      return [];
    }
    const reservations: GetReservationsDto[] = ormReservations.map(function (ormReservation) {
      let reservationDto = new GetReservationsDto();
      reservationDto.id = Number(ormReservation.id);
      reservationDto.number = ormReservation.number;
      reservationDto.clientId = Number(ormReservation.client_id);
      reservationDto.createdAt = ormReservation.created_at;
      reservationDto.createdBy = ormReservation.created_by;
      reservationDto.updatedAt = ormReservation.updated_at;
      reservationDto.updatedBy = ormReservation.updated_by;
      return reservationDto;
    });
    return reservations;
  }
}