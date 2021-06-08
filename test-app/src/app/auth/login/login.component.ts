import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  userForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.InitUserForm();
  }

  /**Initializing User Form */
  InitUserForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.compose([
          Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
        ])]],
      password: ['', [Validators.required]],
    })
  }
  get clogin() {
    return this.userForm.controls;
  }

  /** Submiting user form values*/
  userSubmit() {
    this.submitted = true;
    const payload = {
      'email': this.userForm.value.email,
      'password': this.userForm.value.password,
    };
    console.log(payload);

    if (this.userForm.invalid) {
      return;
    } else {
      this.authService.login(payload).subscribe((resp: any) => {
        if (resp.success === true) {
          console.log(resp);
          this.submitted = false;
          this.userForm.reset();
          localStorage.setItem('authToken', resp.data.token);
          this.router.navigate(['/dashboard/profile']);
        }
      });
    }
  }

}
