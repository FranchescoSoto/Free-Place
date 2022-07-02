export class EditAddRequest {
  constructor(
    public readonly productname: string,
    public readonly companyname: string,
    public readonly description: string
  ) {}
}
