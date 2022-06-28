import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavigationBarUserComponent } from './navigation-bar-user/navigation-bar-user.component';
import { NavigationBarAdminComponent } from './navigation-bar-admin/navigation-bar-admin.component';
import { NavigationBarModeratorComponent } from './navigation-bar-moderator/navigation-bar-moderator.component';
import { AddPostComponent } from './add-post/add-post.component';
import { UserAccountDataComponent } from './user-account-data/user-account-data.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockCardComponent } from './block-card/block-card.component';
import { DialogAddCommunityComponent } from './dialog-add-community/dialog-add-community.component';
import { CommunityRulesComponent } from './community-rules/community-rules.component';
import { DialogAddCommunityRulesComponent } from './dialog-add-community-rules/dialog-add-community-rules.component';
import { CardOneRulesComponent } from './card-one-rules/card-one-rules.component';
import { CardPostComponent } from './card-post/card-post.component';
import { CommunityPageComponent } from './community-page/community-page.component';
import { SortPostsComponent } from './sort-posts/sort-posts.component';
import { BlockModeratorsPageComponent } from './block-moderators-page/block-moderators-page.component';
import { BlockCommunityPageComponent } from './block-community-page/block-community-page.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { BlockUserPageComponent } from './block-user-page/block-user-page.component';
import { BlockPostCardComponent } from './block-post-card/block-post-card.component';
import { BlockPostPageComponent } from './block-post-page/block-post-page.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ReportCommentCardComponent } from './report-comment-card/report-comment-card.component';
import { ReportCommentPageComponent } from './report-comment-page/report-comment-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BlockCardModeratorsComponent } from './block-card-moderators/block-card-moderators.component';
import { CardPostCommunityComponent } from './card-post-community/card-post-community.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { AllCommunityComponent } from './all-community/all-community.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { SinglePostUpdateComponent } from './single-post-update/single-post-update.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UserPostsPageComponent } from './user-posts-page/user-posts-page.component';
import { CardFlairComponent } from './card-flair/card-flair.component';
import { CommunityFlairPageComponent } from './community-flair-page/community-flair-page.component';
import { OnePostWithCommentsComponent } from './one-post-with-comments/one-post-with-comments.component';
import { BlockCommunityCardComponent } from './block-community-card/block-community-card.component';
import { ListOfCommentsComponent } from './list-of-comments/list-of-comments.component';
import { UnblockUserCardComponent } from './unblock-user-card/unblock-user-card.component';
import { UpdateCommunityCardComponent } from './update-community-card/update-community-card.component';
import { UpdateCommunityPageComponent } from './update-community-page/update-community-page.component';
import { DialogAddSuspendReasonComponent } from './dialog-add-suspend-reason/dialog-add-suspend-reason.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigationBarComponent,
    NavigationBarUserComponent,
    NavigationBarAdminComponent,
    NavigationBarModeratorComponent,
    AddPostComponent,
    UserAccountDataComponent,
    BlockCardComponent,
    DialogAddCommunityComponent,
    CommunityRulesComponent,
    DialogAddCommunityRulesComponent,
    CardOneRulesComponent,
    CardPostComponent,
    CommunityPageComponent,
    SortPostsComponent,
    BlockModeratorsPageComponent,
    BlockCommunityPageComponent,
    HomeComponent,
    NavComponent,
    BlockUserPageComponent,
    BlockPostCardComponent,
    BlockPostPageComponent,
    CommentCardComponent,
    ReportCommentCardComponent,
    ReportCommentPageComponent,
    BlockCardModeratorsComponent,
    CardPostCommunityComponent,
    SinglePostComponent,
    AllCommunityComponent,
    ChangePasswordComponent,
    UserPostsComponent,
    SinglePostUpdateComponent,
    UserPostsPageComponent,
    CardFlairComponent,
    CommunityFlairPageComponent,
    OnePostWithCommentsComponent,
    BlockCommunityCardComponent,
    ListOfCommentsComponent,
    UnblockUserCardComponent,
    UpdateCommunityCardComponent,
    UpdateCommunityPageComponent,
    DialogAddSuspendReasonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [CommunityPageComponent, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
              { provide: MAT_DIALOG_DATA, useValue: {} }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
