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
      accounts a
    ORDER BY
      a.created_at DESC;`;
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return [];
    }
    const accounts: GetReservationsDto[] = ormAccounts.map(function (ormAccount) {
      let accountDto = new GetReservationsDto();
      accountDto.id = Number(ormAccount.id);
      accountDto.number = ormAccount.number;
      accountDto.clientId = Number(ormAccount.client_id);
      accountDto.createdAt = ormAccount.created_at;
      accountDto.createdBy = ormAccount.created_by;
      accountDto.updatedAt = ormAccount.updated_at;
      accountDto.updatedBy = ormAccount.updated_by;
      return accountDto;
    });
    return accounts;
  }
}