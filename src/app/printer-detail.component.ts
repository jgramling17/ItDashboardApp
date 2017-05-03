import {Component, Input} from '@angular/core';
import { Printer } from './printer';


@Component({
    selector: 'my-printer-detail',
    template: `<div *ngIf="printer">
                  <h5>{{printer.shortName}} details</h5>
                  <div><h4><label>name: </label>{{printer.name}}</h4></div>
                  <div><h4><label>status: </label>{{printer.status}}</h4></div>
                </div>`,
            })

export class PrinterDetailComponent{
    @Input()
    printer: Printer;
}