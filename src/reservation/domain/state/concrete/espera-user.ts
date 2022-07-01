import {ReservationState} from "../abstract/user-state";
import {ActiveUser} from "./active-user";

export class AusenteUser extends ReservationState {
    public handle(): void {
        console.log('Usuario ausente');
        //this.user.transitionTo(new ActiveUser());
    }
}