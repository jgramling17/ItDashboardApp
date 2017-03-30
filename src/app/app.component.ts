import { Component } from '@angular/core';
import { Printer } from './printer';
import {PrinterService} from './services/printer.service';
import {Observable} from 'rxjs/Rx';


const PRINTERS: Printer[]=[];

@Component({
  selector: 'my-app',
  template: `<h1>{{user}}'s {{title}}</h1>
              <input [(ngModel)]="user" placeholder="name">
              <div>
                <h2>Printers</h2>
                <my-printer-detail [printer]="selectedPrinter"></my-printer-detail>
              </div>
              <ul class="printers">
                <li *ngFor="let printer of printers" (click)="onSelectPrinter(printer)">
                  <div>
                    <label>name: </label> {{printer.name}}
                  </div>
                  <div>
                    <label>status: </label> {{printer.status}}
                  </div>
                </li>
              </ul>`,
  providers: [PrinterService]
})
export class AppComponent  { 
  title = 'Dashboard';
  user= 'IT';
  selectedPrinter: Printer;
  printers= PRINTERS;
  //newPRINTERS: Observable<Array<Object[]>>

  constructor(private printerservice: PrinterService) {
    this.printerservice.getPrinters()
    .subscribe(errorPrinters => {
      console.log(errorPrinters);
      for (let i of errorPrinters.printers.inError)
      {
        if (i.name.search("printsrv08") != -1)
        {
          this.printers.push(i);
        }
        console.log(i);
      }
    }
    )

  }
  onSelectPrinter(printer: Printer): void{
    this.selectedPrinter = printer;
  }
}
