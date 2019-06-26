import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  name: string ;
  profile_picture: string ;

  constructor(private http: HttpClient) { }

  private url = "http://localhost:5000/profile";

  public getProfile(){
    let url =this.url+"?id="+this.getUser();
    return this.http.get<any>(url).toPromise();
  }

  public saveProfile(result){
    result =  JSON.parse(result);
    this.name = result.name;
    this.profile_picture = result.buddyicon;
  }

  public getName(){
    return this.name ;
  }

  public getImage(){
    return this.profile_picture;
  }

  public isAuthenticated(): boolean {
    let user = sessionStorage.getItem("user");
    if (user == undefined)
      return false;
    else
      return true;
  }

  public login(user) {
    sessionStorage.setItem("user",user);
  }

  public getUser(){
   return sessionStorage.getItem("user");
  }

  public logout() {
    sessionStorage.removeItem("user");
  }
}
