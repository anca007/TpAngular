import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public username: String = "";

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.username = this.userService.getUsername();
  }

  public logout() {
    this.userService.logout()
    this.router.navigate([''])
  }

}
