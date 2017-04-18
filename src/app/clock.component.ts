import {Observable} from 'rxjs/Rx';
import {Component} from '@angular/core';

@Component({
    selector: 'clock',
    template: `<div><h1>{{dateclock | async | date:'hh:mm'}}</h1><div>
                <div><h3>{{dateclock | async | date:'EEEE, MMMM d'}}</h3></div>`,
})

export class ClockComponent {
     dateclock = Observable
     .interval(1000)
     .map(()=> new Date());
}
