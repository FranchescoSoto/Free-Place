export class RegisterAddResponse {
  constructor(
    public id: number,
    public readonly productname: string,
    public readonly companyname: string,
    public readonly description: string
  ) {}
}
