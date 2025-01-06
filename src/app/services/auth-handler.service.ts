import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegister } from '../types/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  constructor(private http:HttpClient) { }

   headers = new HttpHeaders({
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
  });

  

  Register(userReg:UserRegister):Observable<any>{
    console.log(userReg)
    return this.http.post("/api/auth/register",userReg,{headers:this.headers})
  }

  Login(userReg:UserRegister):Observable<any>{
    return this.http.post("/api/auth/login",userReg,{headers:this.headers});
  }

  ASD():Observable<any>{
    let token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Add Bearer token here
      'Content-Type': 'application/json', // Optional
      'Accept': 'application/json' // Optional
    });
    return this.http.post("/api/auth/asd","Hehher",{headers:headers})
  }

}
