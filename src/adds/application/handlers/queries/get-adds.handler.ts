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
      description as desc
    FROM 
      adds
    WHERE
      type = 'C'
    ORDER BY
    product_name, company_name, desc;`;
    const ormAdds = await manager.query(sql);
    if (ormAdds.length <= 0) {
      return [];
    }
    const adds: GetAddDto[] = ormAdds.map(function (ormAdd) {
      let addDto = new GetAddDto();
      addDto.id = Number(ormAdd.id);
      addDto.productname = ormAdd.productname;
      addDto.companyname = ormAdd.companyname;
      addDto.description = ormAdd.description;
      return addDto;
    });
    return adds;
  }
}