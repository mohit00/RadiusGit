

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub:any) {
        console.log(sub)
         return this.http.post('http://192.168.40.189:3000/subscription', sub);
    }

    send() {
        return this.http.post('/api/newsletter', null);
    }

}


