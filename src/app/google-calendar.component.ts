import {Component, Input} from '@angular/core';
import {Appointment} from './appointment';

@Component({
    selector: 'google-calendar',
    template: `<ul *ngIf="appointments">
                <li *ngFor="let appointment of appointments" class="appt">
                    <div *ngIf="appointment.start.date">
                    <h5>{{appointment.startTime}}</h5>
                    </div>
                    <div *ngIf="!appointment.start.date">
                    <h5>{{appointment.startTime | date:'hh:mm'}}</h5>
                    </div>
                    <div>
                    <h4>{{appointment.summary}}</h4>
                    </div>
                </li>`,
})

export class GoogleCalendarComponent {
 @Input()
    appointments: Appointment;
}
