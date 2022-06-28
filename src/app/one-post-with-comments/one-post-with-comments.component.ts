import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Comment } from '../model/comment';
import { Post } from '../model/post';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication-service.service';
import { CommentService } from '../services/comments/comment.service';
import { JwtUtilsService } from '../services/jwt-utils.service';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-one-post-with-comments',
  templateUrl: './one-post-with-comments.component.html',
  styleUrls: ['./one-post-with-comments.component.scss']
})
export class OnePostWithCommentsComponent implements OnInit {


  onePost:Post = {
    postId: 0,
    title: '',
    text: '',
    creationDate: '',
    imagePath: '',
    community: 0,
    user: 0,
    flair: 0
  };

  postId: number;

  ucitaneObjave = false;

  constructor(private postService:PostService, private router: ActivatedRoute) {
      this.postId = this.router.snapshot.params['id'];
      this.getPost();


  }

  ngOnInit(): void {

  }

  private getPost(): void {

    this.postService.get(this.postId).subscribe(res => {
      this.onePost = res,
      this.ucitaneObjave = true;
    })

  }


}
