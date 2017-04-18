import {Component, Input} from '@angular/core';
import {Appointment} from './appointment';

@Component({
    selector: 'google-calendar',
    template: `<ul *ngIf="appointments">
                <li *ngFor="let appointment of appointments" class="appt">
                    <div>
                    {{appointment.summary}}
                    </div>
                </li>`,
})

export class GoogleCalendarComponent {
 @Input()
    appointments: Appointment;
}
