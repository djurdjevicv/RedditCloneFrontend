import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../model/enums/roles';
import { Flair } from '../model/flair';
import { Post } from '../model/post';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { FlairService } from '../services/flair/flair.service';
import { PostService } from '../services/post/post.service';
import { UserService } from '../services/user/user.service';

class ImageSnippet{
  constructor(public src: string, public file:File){}
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})

@Injectable({providedIn : "root"})
export class AddPostComponent implements OnInit {

  public communityId:number;

  public flairs: Flair[];

  selectFlairId: number = 0;

  selectedFile: ImageSnippet;

  newPost:Post = {
    postId: 0,
    title: '',
    text: '',
    creationDate: '',
    imagePath: '',
    community: 0,
    user: 0,
    flair: 0
  }

  logUser:User;

  currentUser:User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    avatar: '',
    registrationDate: '',
    description: '',
    displayName: '',
    roles: Roles.USER
  }

  errorMessage: any;

  postForm:FormGroup;

  constructor(private routers : Router, private router: ActivatedRoute, public dialog : MatDialog, private postService: PostService
              ,private flairService:FlairService, private authService: AuthenticationService, private userService:UserService
              , private fb: FormBuilder) {
              this.communityId = this.router.snapshot.params['id'];
              this.getCommunityFlairs();
              this.logUser = authService.getCurrentUser();
              this.getCurrentUser();
  }

  ngOnInit(): void {

    this.postForm = this.fb.group({
      title: ['', Validators.required ],
      text: new FormControl('', [Validators.required]),
      flair: ['', [Validators.required]]
    });

  }

  getCurrentUser(){
    this.userService.getByUsername(this.logUser.username).subscribe({
      next: data => this.currentUser = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  createPost():void{
    this.newPost.community = this.communityId;
    this.newPost.user = this.currentUser.userId;
    this.newPost.flair = this.selectFlairId;

    if(this.selectedFile !== undefined){
      this.newPost.imagePath = this.selectedFile.src;
    }

    if(this.postForm.valid){
      this.postService.save(this.newPost).subscribe({
        next: data => {
            console.log("Success add post"),
            this.goToCommunityPage()
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        },
      })

    }else{
      confirm("ERROR")
    }


  }

  getCommunityFlairs():void{
    this.flairService.getFlairByCommunity(this.communityId).subscribe({
      next: data => this.flairs = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  goToCommunityPage(){
    this.routers.navigate(['/communityPage/' + this.communityId], { state: { id:  this.communityId} });
  }

  selectChangeHandler (event: any) {
    this.selectFlairId = event.target.value;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      console.log(this.selectedFile)

    });

    reader.readAsDataURL(file);
  }



}
