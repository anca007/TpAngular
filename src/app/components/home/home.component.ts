import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public message: String = ""

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router :Router
  ) {
    //la navigation se récupère dans le constructeur et non dans le ngOnInit,
    // ar dans le ngOnInit la navigation est déjà terminé
    const navigation = this.router.getCurrentNavigation();
    this.message = navigation?.extras.state?.['message'] || '';
  }

  ngOnInit(){
    //this.message = this.route.snapshot.queryParamMap.get('message') ?? ""
  }

  public login() {
    this.userService.login("Michel")
  }
}
