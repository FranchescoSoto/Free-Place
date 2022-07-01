export class OpenReservationRequest {
  constructor(
    public readonly clientId: number,
    public readonly number: string
  ) {
  }
}