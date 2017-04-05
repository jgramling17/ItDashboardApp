export class CalendarAuthService {
    static clientID = '386660134986-n5l4lur2aroupk20fedhph66vibc50q9.apps.googleusercontent.com'
    static scope = 'https://www.googleapis.com/auth/calendar.readonly'

    //public gapi: any;
    public userName: String;
    public isAuthenticated: Boolean = false;

    constructor() {
        this.authenticate();
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            console.log('made it this far');
        var authorisationRequestData =
			{
				client_id: CalendarAuthService.clientID, 
                immediate: false,
				scope: CalendarAuthService.scope 
			} 
       gapi.auth.authorize(authorisationRequestData, (token) => {
           if (token && !token.error) 
           {
               console.log('authenticated yo');
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
    
}