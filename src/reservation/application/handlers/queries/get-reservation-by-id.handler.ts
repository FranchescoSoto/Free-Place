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
      accounts a
    WHERE
      a.id = ?;`;
    const ormAccounts = await manager.query(sql, [query.reservationId]);
    if (ormAccounts.length <= 0) {
      return {};
    }
    const ormAccount = ormAccounts[0];
    let accountDto = new GetReservationsDto();
    accountDto.id = Number(ormAccount.id);
    accountDto.number = ormAccount.number;
    accountDto.clientId = Number(ormAccount.client_id);
    accountDto.createdAt = ormAccount.created_at;
    accountDto.createdBy = ormAccount.created_by;
    accountDto.updatedAt = ormAccount.updated_at;
    accountDto.updatedBy = ormAccount.updated_by;
    return accountDto;
  }
}