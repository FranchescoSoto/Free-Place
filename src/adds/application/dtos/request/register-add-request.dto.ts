export class RegisterAddRequest {
  constructor(
    public readonly id: number,
    public readonly productname: string,
    public readonly companyname: string,
    public readonly description: string
  ) {}
}