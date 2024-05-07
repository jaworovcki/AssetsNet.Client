import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/account/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { GoogleAuthComponent } from './components/account/google-auth/google-auth.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StocksTableComponent } from './components/stocks-table/stocks-table.component';
import { SocialMediaPostsComponent } from './components/social-media-posts/social-media-posts.component';
import { HttpInterceptorService } from './_interceptors/loader.interceptor';
import { MessagesThreadComponent } from './messages-thread/messages-thread.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { FollowersModalComponent } from './_modals/followers/followers-modal/followers-modal.component';
import { FollowingsModalComponent } from './_modals/followings/followings-modal/followings-modal.component';
import { UpgradeTariffPlanComponent } from './_modals/tariffplan/upgrade-tariff-plan/upgrade-tariff-plan.component';
import { UsersSearchComponent } from './_modals/user/users-search/users-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GoogleAuthComponent,
    LatestNewsComponent,
    NavbarComponent,
    SearchComponent,
    StocksTableComponent,
    SocialMediaPostsComponent,
    MessagesThreadComponent,
    UserProfileComponent,
    FollowersModalComponent,
    FollowingsModalComponent,
    UpgradeTariffPlanComponent,
    UsersSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      countDuplicates: true,
      progressBar: true,
      maxOpened: 3,
    }),
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      // useClass: HttpInterceptorService,
      multi: true // This is required to allow multiple interceptors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
