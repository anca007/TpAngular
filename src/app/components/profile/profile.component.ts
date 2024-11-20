import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public username : String | null = null

  constructor(private route : ActivatedRoute) {
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get("username")
  }


}
