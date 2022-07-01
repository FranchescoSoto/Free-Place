import {Reservation} from "../../entities/reservation.entity";

export abstract class ReservationState {
    protected user: Reservation;

    public setContext(user: Reservation) {
        this.user = user;
    }

    public abstract handle(): void;
}