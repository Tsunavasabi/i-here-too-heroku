import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { WritingComponent } from './writing/writing.component';
import { DraftComponent } from './draft/draft.component';
import { ReadComponent } from './read/read.component';
import { ListnewsComponent } from './listnews/listnews.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagModalComponent } from './tag-modal/tag-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    WritingComponent,
    DraftComponent,
    ReadComponent,
    ListnewsComponent,
    DashboardComponent,
    FooterComponent,
    SlideshowComponent,
    SignupComponent,
    TagModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FacebookModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ TagModalComponent ]
})
export class AppModule { }
