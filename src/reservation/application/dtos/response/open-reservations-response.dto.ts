export class OpenReservationResponse {
  constructor(
    public id: number,
    public number: string,
    public createdAt: string,
    public createdBy: number,
    public updatedAt: string,
    public updatedBy: number,
    public clientId: number
  ) {}
}