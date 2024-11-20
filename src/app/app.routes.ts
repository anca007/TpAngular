import {Routes} from '@angular/router';
import {SummaryComponent} from "./components/summary/summary.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'summary', component: SummaryComponent, canActivate : [authGuard]},
  {path: 'profile/:username', component: ProfileComponent, canActivate : [authGuard]},
];
