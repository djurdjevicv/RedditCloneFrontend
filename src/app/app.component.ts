import { Component } from '@angular/core';
import { Router} from '@angular/router';

import { FormControl, FormGroup, Validators } from "@angular/forms";
styleUrls: ['./modal-form.component.css']


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RedditCloneFrontend';

  constructor(private router:Router){}

}


export class ModalFormComponent {
  validatingForm: FormGroup;

  constructor() {
    this.validatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });
  }

  get signupFormModalName() {
    return this.validatingForm.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }



}

