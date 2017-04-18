import { Component } from '@angular/core';
import { Printer } from './printer';
import { Appointment } from './appointment';
import {PrinterService} from './services/printer.service';
import {CalendarAuthService} from './services/calendar-auth.service';
import {Observable} from 'rxjs/Rx';


const errorPRINTERS: Printer[]=[];
const Appointments: Appointment[]=[];

@Component({
  selector: 'my-app',
  template: `<!--<h1>{{user}}'s {{title}}</h1>
              <input [(ngModel)]="user" placeholder="name">-->
              <div class="mainContainer">
                <div class="leftCollumn">
                <clock></clock>
                <google-calendar [appointments]="appointments"></google-calendar>
                <my-printer-detail [printer]="selectedPrinter"></my-printer-detail>
                <!--<printer-health></printer-health>-->
                </div>
                <div class="printers">
                  <ul>
                    <li *ngFor="let printer of printers" (click)="onSelectPrinter(printer)">
                      <div>
                        <label>name: </label> {{printer.shortName}}
                      </div>
                      <div>
                        <label>status: </label> {{printer.status}}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>`,
  providers: [PrinterService, CalendarAuthService]
})
export class AppComponent  { 
  title = 'Dashboard';
  user= 'IT';
  selectedPrinter: Printer;
  printers= errorPRINTERS;
  appointments = Appointments;

  constructor(private printerservice: PrinterService, calendarauthservice: CalendarAuthService) {
    this.printerservice.getPrinters()
    .subscribe(errorPrinters => {
      console.log(errorPrinters);
      for (let i of errorPrinters.printers.inError)
      {
        if (i.name.search("printsrv08") != -1)
        {
          this.printers.push(i);
          i.shortName = i.name.substring(11, i.name.length);
        }
        //console.log(i);
      }
    })

    this.appointments = calendarauthservice.getAppointments();
    console.log(this.appointments);

  }
  onSelectPrinter(printer: Printer): void{
    this.selectedPrinter = printer;
  }
}
