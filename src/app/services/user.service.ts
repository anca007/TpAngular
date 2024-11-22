import {Injectable} from '@angular/core';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public username: string = ""

  constructor() {
  }

  public login(username: string) {
    this.username = username
    this.saveUser(username)
  }

  public saveUser(username: string) {
    localStorage.setItem('user', this.username)
  }

  public logout() {
    localStorage.removeItem('user')
  }

  public getUsername() {
    if(this.getUser()){
      this.username =  localStorage.getItem('user')!
    }
    return this.username
  }

  public getUser() {
    return localStorage.getItem('user') != null
  }



}
