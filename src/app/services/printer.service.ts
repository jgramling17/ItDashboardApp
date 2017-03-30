//DOESNT FUCKING WORK

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PrinterService {
    constructor(private http: Http){
        console.log('PrinterService Initialized')
    }

    getPrinters(){
        return this.http.get('http://143.105.48.170:9191/api/health?Authorization=Yc1bSgZxixdFAYwQa89rIKt1b0ti7k3v')
            .map(res => res.json());
            
    }
}