import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashService {


  private readonly baseUrl = "https://localhost:44349/api/dashboard/"

  constructor(private http: HttpClient) { }

  index(){
    //var header = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('piadatoken')});
    return this.http.get(this.baseUrl+"index")
  }
  editapidetails(body){
    return this.http.post(this.baseUrl+"updateapidetails",body);
  }
  getapidetails(){
    return this.http.get(this.baseUrl+"getapidetails");
  }
  pulltweet(body){
    return this.http.post(this.baseUrl+"pulltweets", body);
  }
  downloadfile(filename:string) : Observable<Blob>{
    //let options = new RequestOptions({responseType: ResponseContentType.Blob})
    return this.http.get(this.baseUrl+"Download?fileName="+filename, {responseType: 'blob'});
  }
  gettrends(body){
    return this.http.post(this.baseUrl+"GetCountryTrend",body);
  }
  getvisual(fileName){
    return this.http.get(this.baseUrl+"visualize?filename="+fileName);
  }
  // createcsv(){
  //   return this.http.get(this.baseUrl+"createcsv");
  // }
}
