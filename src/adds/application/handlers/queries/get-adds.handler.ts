import { GetAddsQuery } from '../../queries/get-adds.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetAddDto } from '../../dtos/queries/get-add.dto';

@QueryHandler(GetAddsQuery)
export class GetAddsHandler implements IQueryHandler<GetAddsQuery> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetAddsQuery) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      product_name as productName,
      company_name as companyName,
      dni
    FROM 
      adds
    WHERE
      type = 'C'
    ORDER BY
    product_name, company_name;`;
    const ormAdds = await manager.query(sql);
    if (ormAdds.length <= 0) {
      return [];
    }
    const adds: GetAddDto[] = ormAdds.map(function (ormAdd) {
      let addDto = new GetAddDto();
      addDto.id = Number(ormAdd.id);
      addDto.productname = ormAdd.firstName;
      addDto.companyname = ormAdd.lastName;
      addDto.description = ormAdd.dni;
      return addDto;
    });
    return adds;
  }
}