import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Karma } from '../model/karma';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { ReactionCommentService } from '../services/reactionComment/reactionComment.service';
import { ReactionPostService } from '../services/reactionPost/reactionPost.service';
import { UserService } from '../services/user/user.service';
import { UserPostsComponent } from '../user-posts/user-posts.component';

class ImageSnippet{
  constructor(public src: string, public file:File){}
}

@Component({
  selector: 'app-user-account-data',
  templateUrl: './user-account-data.component.html',
  styleUrls: ['./user-account-data.component.scss']
})
export class UserAccountDataComponent implements OnInit {

  public logUser: User;

  public token:string;

  btnValue = "CHANGE";

  isReadOnly = true;

  selectedFile: ImageSnippet;

  userForm: FormGroup;

  public user: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    avatar: '',
    registrationDate: '',
    description: '',
    displayName: '',
    roles: 0
  };
  errorMessage: any;

  postKarma:Karma = {
    karma: 0
  }

  commentKarma:Karma = {
    karma: 0
  }


  constructor(private authService: AuthenticationService, private userService: UserService,
              private reactionPostService: ReactionPostService, private reactionCommentService: ReactionCommentService,
              private fb: FormBuilder) {

    this.logUser = authService.getCurrentUser();
    this.getUserData();
    this.getUserPostKarma();
    this.getUserCommentKarma();


  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });

  }

  getUserData(){
    this.userService.getByUsername(this.logUser.username).subscribe(res => {
      this.user = res;
    })
  }

  getUserPostKarma(){
    this.reactionPostService.getKarmaPostByUser(this.logUser.username).subscribe(res => {
      this.postKarma = res;
    })
  }

  getUserCommentKarma(){
    this.reactionCommentService.getKarmaCommentByUser(this.logUser.username).subscribe(res => {
      this.commentKarma = res;
    })
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }


  submit(userId:number):void{

    if(this.selectedFile !== undefined){
      this.user.avatar = this.selectedFile.src;
    }


    if(this.btnValue === "CHANGE"){
      this.isReadOnly = false;
      this.btnValue = "SUBMIT"
    }else if(this.btnValue === "SUBMIT"){

      this.isReadOnly = true;
      this.btnValue = "CHANGE";

    this.userService.changeData(this.user).subscribe({
      next: data => {
          console.log("Successful change data");
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  });

    }






  }







}
