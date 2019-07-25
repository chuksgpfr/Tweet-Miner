import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private readonly baseUrl = "https://localhost:44349/api/home/"


  registerUsers(body){
    return this.http.post(this.baseUrl+"register", body);
  }

  loginUser(body){
    return this.http.post(this.baseUrl+"login", body);
  }
}
