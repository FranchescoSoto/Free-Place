import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetReservationsDto } from '../../dtos/queries/get-reservations.dto';
import { GetReservationByIdQuery } from '../../queries/get-reservation-by-id.query';

@QueryHandler(GetReservationByIdQuery)
export class GetReservationByIdHandler implements IQueryHandler<GetReservationByIdQuery> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetReservationByIdQuery) {
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
    WHERE
      a.id = ?;`;
    const ormReservations = await manager.query(sql, [query.reservationId]);
    if (ormReservations.length <= 0) {
      return {};
    }
    const ormReservation = ormReservations[0];
    let reservationDto = new GetReservationsDto();
    reservationDto.id = Number(ormReservation.id);
    reservationDto.number = ormReservation.number;
    reservationDto.clientId = Number(ormReservation.client_id);
    reservationDto.createdAt = ormReservation.created_at;
    reservationDto.createdBy = ormReservation.created_by;
    reservationDto.updatedAt = ormReservation.updated_at;
    reservationDto.updatedBy = ormReservation.updated_by;
    return reservationDto;
  }
}