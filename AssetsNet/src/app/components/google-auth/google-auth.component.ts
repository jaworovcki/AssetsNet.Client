import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {

  constructor(private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        // @ts-ignore
        { theme: "filled_blue", size: "medium", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.accountService.loginWithGoogle(response.credential).subscribe(
      (x: any) => {
        this.accountService.setCurrentUser(x);
        console.log(x);
        window.location.href = '/home';
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
