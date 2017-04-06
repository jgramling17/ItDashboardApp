export class CalendarAuthService {
    static clientID = '386660134986-n5l4lur2aroupk20fedhph66vibc50q9.apps.googleusercontent.com'
    static scope = 'https://www.googleapis.com/auth/calendar.readonly'
    static APIKey = 'AIzaSyCBN28Xf182sjJ6yYBgBm9XGDL6H1A1v24'

    public userName: String;
    public isAuthenticated: Boolean = false;

    constructor() {
        console.log('initializing calendar authentication service;');
        this.runLifeCycle();
    }

    runLifeCycle(){
        return this.authenticate()
		 .then(() => this.getEvents())
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
               console.log(token);
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

    getEvents(){
            var currentDate = new Date();
            var maxDate = new Date()
            maxDate.setHours(currentDate.getHours() + 12);
            var currentDateISO = currentDate.toISOString();
            var maxDateISO = maxDate.toISOString();
            console.log(currentDateISO);
            console.log(maxDateISO);
            return new Promise((resolve, reject) => {
                console.log('initialize Google Calendar API');
                gapi.client.load('calendar', 'v3', function callApi(){
                     var request = gapi.client.calendar.events.list({
                        calendarId: 'primary',
                        singleEvents: true,
                        timeMax: maxDateISO,
                        timeMin: currentDateISO
	            });
                request.execute((resp) => {
	        	var appointments = [];
                console.log(resp);
            })
                });
               
        })
        
    }
    
}