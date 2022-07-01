import {ReservationState} from "../abstract/user-state";

export class AusenteUser extends ReservationState {
    public handle(): void {
        console.log('La reserva para a estado usuario ausente');
        //this.user.transitionTo(new InactiveUser());
    }
}