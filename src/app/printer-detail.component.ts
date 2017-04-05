import {Component, Input} from '@angular/core';
import { Printer } from './printer';


@Component({
    selector: 'my-printer-detail',
    template: `<div *ngIf="printer">
                  <h2>{{printer.shortName}} details</h2>
                  <div><label>name: </label>{{printer.name}}</div>
                  <div><label>status: </label>{{printer.status}}</div>
                </div>`,
            })

export class PrinterDetailComponent{
    @Input()
    printer: Printer;
}