import { Component, OnInit} from '@angular/core';
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
                  <div class="topLeft">
                    <clock></clock>
                  </div>
                  <div class="bottomLeft">
                    <google-calendar [appointments]="appointments"></google-calendar>
                    <my-printer-detail [printer]="selectedPrinter"></my-printer-detail>
                    <!--<printer-health></printer-health>-->
                  </div>
                </div>
                <div class="rightCollumn" id="rightCollumn">
                  <div class="printers">
                    <ul>
                      <li *ngFor="let printer of printers" (click)="onSelectPrinter(printer)" class="printer">
                        <div>
                          <h4>{{printer.shortName}}</h4>
                        </div>
                        <div>
                          <h5>{{printer.status}}</h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>`,
  providers: [PrinterService, CalendarAuthService]
})
export class AppComponent implements OnInit { 
  title = 'Dashboard';
  user= 'IT';
  selectedPrinter: Printer;
  printers= errorPRINTERS;
  appointments = Appointments;

  constructor(private printerservice: PrinterService, calendarauthservice: CalendarAuthService) {
    this.appointments = calendarauthservice.getAppointments();
    console.log(this.appointments);
  }

  ngOnInit() {
    this.autoUpdate();
      setInterval(() => {
      this.autoUpdate(); 
      }, 30000);
  }

  autoUpdate() {
     return this.updatePrinters()
		 .then(() => this.restyleAutoScroll())
  }

  updatePrinters() {
    return new Promise((resolve, reject) => {
    console.log("UPDATING");
    errorPRINTERS.length = 0;
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
    resolve();
    });
  }

  restyleAutoScroll(){
    var elmnt = document.getElementById("rightCollumn");
    console.log(elmnt.scrollHeight)
    var height = elmnt.scrollHeight-elmnt.clientHeight;
    console.log("height: " + height);
    elmnt.scrollTop = height;
    console.log("scrolltop: " + elmnt.scrollTop);
    /*
    elmnt.animate([
      // keyframes
      { transform: 'translateY(0%)' }, 
      { transform: 'translateY('+ -height +')' }
    ], { 
      // timing options
      duration: 5000,
      iterations: Infinity,
      easing: "ease-in-out",
      direction: "alternate"
    });
    */
  }

  onSelectPrinter(printer: Printer): void{
    this.selectedPrinter = printer;
  }
}
