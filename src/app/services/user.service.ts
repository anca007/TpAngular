import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public username: String = ""

  constructor() {
  }

  public login(username: String) {
    this.username = username
  }

  public getUsername(){
    return this.username
  }


}
