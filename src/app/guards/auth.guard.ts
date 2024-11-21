import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService)
  const router = inject(Router)

  if (userService.getUsername()) {
    return true
  } else {
    router.navigate(['']
      , {
       // queryParams: {message: "Vous devez être connecté pour accéder à cette page !"},
        //permet de passer des infos hors url
        //en faire un service
        //state: {message: "Vous devez être connecté pour accéder à cette page !"}
      })
    return false
  }

};
