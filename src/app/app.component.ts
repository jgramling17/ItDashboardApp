import { Component } from '@angular/core';
import { Printer } from './printer';

const PRINTERS: Printer[] = [
  { id: 11, name: 'library' },
  { id: 12, name: 'rodman' },
  { id: 13, name: 'dolan' },
  { id: 14, name: 'murphy' },
  { id: 15, name: 'area51' },
  { id: 16, name: 'atrium' },
  { id: 17, name: 'sutowski' }
]

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
                    <label>id: </label> {{printer.id}}
                  </div>
                  <div>
                    <label>name: </label> {{printer.name}}
                  </div>
                </li>
              </ul>`,
})
export class AppComponent  { 
  title = 'Dashboard';
  user= 'IT';
  selectedPrinter: Printer;
  printers= PRINTERS;

  onSelectPrinter(printer: Printer): void{
    this.selectedPrinter = printer;
  }
}
