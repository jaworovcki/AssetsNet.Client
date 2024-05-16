import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
import * as ngxToastr from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class PasswordComponent implements OnInit {
  restorePasswordForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    //private router: Router,
    private toastr: ngxToastr.ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.restorePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  sendEmail() {
    this.submitted = true;
    if (this.restorePasswordForm.valid) {
      console.log(this.restorePasswordForm.controls["email"].value);
      this.accountService.resetPassword(this.restorePasswordForm.controls["email"].value).subscribe({
        next: () => {
          this.restorePasswordForm.reset();
        },
        error: (error) => {
          if (error) {
            this.toastr.error(error.error);
            console.log(error);

          } else {
            this.toastr.error("An error occured during sending email");
          }
        },
      })
    }
  }

}
