export class ReservationOpened {
  constructor(
    public readonly id: number,
    public readonly number: string,
    public readonly clientId: number
  ) {
  }
}