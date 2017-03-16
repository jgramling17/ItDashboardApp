import {Component, Input} from '@angular/core';
import { Printer } from './printer';


@Component({
    selector: 'my-printer-detail',
    template: `<div *ngIf="printer">
                  <h2>{{printer.name}} details</h2>
                  <div><label>id: </label>{{printer.id}}</div>
                  <div><label>name: </label>{{printer.name}}</div>
                </div>`,
            })

export class PrinterDetailComponent{
    @Input()
    printer: Printer;
}