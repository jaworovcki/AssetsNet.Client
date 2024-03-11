import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      password : ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValues('password')]]
    });
  }

  matchPasswordValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          console.log(error);
        },
      })
    }
  }

}
