import {ReservationState} from "../abstract/user-state";

export class ActiveUser extends ReservationState {
    public handle(): void {
        console.log('Reserva activa');
        //this.user.transitionTo(new InactiveUser());
    }
}