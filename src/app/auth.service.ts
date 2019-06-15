import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
