import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class LoggiService{
http: HttpClient = inject(HttpClient);
  LogError(data:{statuscode:number , errorMessage:string,datetime:Date})
  {
     this.http.post('https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/log.json',data).subscribe();
  }
  featchError()
  {
      this.http.get('https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/log.json').subscribe((data) => {
        console.log(data);

      })
  }
}
