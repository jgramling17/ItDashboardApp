import 'rxjs/add/operator/map';
import { Appointment } from '../appointment';

const appointments: Appointment[]=[];

export class CalendarAuthService {
    static clientID = '386660134986-n5l4lur2aroupk20fedhph66vibc50q9.apps.googleusercontent.com'
    static scope = 'https://www.googleapis.com/auth/calendar.readonly'
    static APIKey = 'AIzaSyCBN28Xf182sjJ6yYBgBm9XGDL6H1A1v24'

    public userName: String;
    public isAuthenticated: Boolean = false;

    constructor() {
        console.log('initializing calendar authentication service;');
    }

    runLifeCycle(){
        return this.authenticate()
		 .then(() => this.initAppointments())
    }

    authenticate() {
        return new Promise((resolve, reject) => {
        gapi.client.setApiKey(CalendarAuthService.APIKey);
        var authorisationRequestData =
			{
				client_id: CalendarAuthService.clientID, 
                immediate: false,
				scope: CalendarAuthService.scope 
			} 
       gapi.auth.authorize(authorisationRequestData, (token) => {
           if (token && !token.error) 
           {
               console.log('authenticated');
                this.isAuthenticated = true;
                resolve();
           }
           else
           {
               console.log('didnt work');
               this.isAuthenticated = false;
               reject();
           }
        })
        });
    }

    initAppointments(){          
            var currentDate = new Date();
            var maxDate = new Date()
            maxDate.setHours(currentDate.getHours() + 12);
            var currentDateISO = currentDate.toISOString();
            var maxDateISO = maxDate.toISOString();
            return new Promise((resolve, reject) => {
                console.log('initialize Google Calendar API');
                gapi.client.load('calendar', 'v3', function callApi(){
                    //Not an acutal error need to comment this out on start for somereason
                     var request = gapi.client.calendar.events.list({
                        calendarId: 'primary',
                        singleEvents: true,
                        timeMax: maxDateISO,
                        timeMin: currentDateISO
	            });
                request.execute((resp) => {
                    //console.log(resp);
                    for (let i of resp.items) {
                        appointments.push(i);
                        i.startTime = i.start.dateTime;
                        i.endTime = i.end.dateTime;
                        if (i.start.date){
                            i.startTime = "All Day";
                        }
                    }
                    resolve();
            })
                });
               
        })
    }


    getAppointments(){
        this.runLifeCycle();
        return appointments;
        }
    }
    