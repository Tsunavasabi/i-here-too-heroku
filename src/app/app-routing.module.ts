import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WritingComponent } from './writing/writing.component';
import { DraftComponent } from './draft/draft.component';
import { ListnewsComponent } from './listnews/listnews.component';
import { ReadComponent } from './read/read.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TagModalComponent } from './tag-modal/tag-modal.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'read/:id', component: ReadComponent},
  {path: 'list/:id', component: ListnewsComponent},
  {path: 'write', component: WritingComponent},
  {path: 'draft', component: DraftComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tagmodal', component: TagModalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
