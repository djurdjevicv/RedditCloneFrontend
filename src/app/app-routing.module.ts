import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { BlockCardComponent } from './block-card/block-card.component';
import { BlockCommunityPageComponent } from './block-community-page/block-community-page.component';
import { BlockModeratorsPageComponent } from './block-moderators-page/block-moderators-page.component';
import { BlockPostPageComponent } from './block-post-page/block-post-page.component';
import { BlockUserPageComponent } from './block-user-page/block-user-page.component';
import { CardOneRulesComponent } from './card-one-rules/card-one-rules.component';
import { CardPostComponent } from './card-post/card-post.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommunityFlairPageComponent } from './community-flair-page/community-flair-page.component';
import { CommunityPageComponent } from './community-page/community-page.component';
import { CommunityRulesComponent } from './community-rules/community-rules.component';
import { DialogAddCommunityComponent } from './dialog-add-community/dialog-add-community.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OnePostWithCommentsComponent } from './one-post-with-comments/one-post-with-comments.component';
import { ReportCommentPageComponent } from './report-comment-page/report-comment-page.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateCommunityPageComponent } from './update-community-page/update-community-page.component';
import { UserAccountDataComponent } from './user-account-data/user-account-data.component';
import { UserPostsPageComponent } from './user-posts-page/user-posts-page.component';
import { UserPostsComponent } from './user-posts/user-posts.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },

  {
    path: 'addPost/:id',
    component: AddPostComponent
  },

  {
    path: 'userAccountData',
    component: UserAccountDataComponent
  },

  {
    path: 'blockCard',
    component: BlockCardComponent
  },

  {
    path: 'rulesCard',
    component: CardOneRulesComponent
  },

  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },

  {
    path: 'communityRules/:id',
    component: CommunityRulesComponent
  },

  {
    path: 'communityFlairs/:id',
    component: CommunityFlairPageComponent
  },

  {
    path: 'onePostWithComments/:id',
    component: OnePostWithCommentsComponent
  },


  {
    path: 'blockModerators',
    component: BlockModeratorsPageComponent
  },

  {
    path: 'communityPage/:id',
    component: CommunityPageComponent
  },

  {
    path: 'blockCommunity',
    component: BlockCommunityPageComponent
  },

  {
    path: 'blockUser',
    component: BlockUserPageComponent
  },

  {
    path: 'blockPost',
    component: BlockPostPageComponent
  },

  {
    path: 'commentCard',
    component: CommentCardComponent
  },

  {
    path:'addCommunity',
    component: DialogAddCommunityComponent
  },

  {
    path: 'reportComment',
    component: ReportCommentPageComponent
  },

  {
    path: 'signUp',
    component: SignupComponent
  },

  {
    path: 'moderatorCommunity',
    component: UpdateCommunityPageComponent
  },

  {
    path: 'logIn',
    component: LoginComponent
  },

  {
    path: 'usersPosts',
    component: UserPostsPageComponent
  },

  {
    path: '**',
    component: HomeComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
