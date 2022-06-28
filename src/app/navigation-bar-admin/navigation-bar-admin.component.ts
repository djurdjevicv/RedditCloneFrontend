import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'app-navigation-bar-admin',
  templateUrl: './navigation-bar-admin.component.html',
  styleUrls: ['./navigation-bar-admin.component.scss']
})
export class NavigationBarAdminComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  logOut():void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
