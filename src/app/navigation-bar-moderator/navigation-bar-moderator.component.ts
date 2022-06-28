import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'app-navigation-bar-moderator',
  templateUrl: './navigation-bar-moderator.component.html',
  styleUrls: ['./navigation-bar-moderator.component.scss']
})
export class NavigationBarModeratorComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut():void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
