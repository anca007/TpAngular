import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public error: string[] = []
  public login: string = ""
  public password: string = ""

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //la navigation se récupère dans le constructeur et non dans le ngOnInit,
    // ar dans le ngOnInit la navigation est déjà terminé
    this.error = []
    const navigation = this.router.getCurrentNavigation();
    this.error.push(navigation?.extras.state?.['message'] || '');
    //a voir pour reset l'état
  }

  ngOnInit() {
    //this.message = this.route.snapshot.queryParamMap.get('message') ?? ""
  }

  public loginUser() {
    this.error = [];
    if (this.login.length < 3) {
      this.error.push("Le login doit faire au moins 3 caractères");
    }
    if (this.password.length < 6) {
      this.error.push("Le mot de passe doit faire au moins 6 caractères");
    }
    if (this.error.length == 0) {
      this.userService.login(this.login);
      this.router.navigate(['summary'])
    }
  }
}
