import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    console.log('Hiii');

  }

  ngOnInit(): void {
    this.InitRegisterForm();
  }

  /**Initializing Registeration Form */
  InitRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.compose([
            Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
          ])
        ]
      ],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@()_$!%*>+<:.;,"'#^{}[/|=?&\-\]\\])[A-Za-z\d@()_$!%"[<>#:*?/{}+=^"'.;,|&\-\\\]]{8,}$/),
          Validators.minLength(8),
        ])
      ],
      cPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ]),
      ],
      phone: ['', [Validators.required]],
      username: ['', [Validators.required]],
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword,
    }
    )
  }
  get cRegister() {
    return this.registerForm.controls;
  }

  registerSubmit() {
    this.submitted = true;
    const payload = {
      'email': this.registerForm.value.email,
      'password': this.registerForm.value.password,
      'username': this.registerForm.value.username,
      'phone': this.registerForm.value.phone,
    };
    if (this.registerForm.invalid) {
      return;
    } else {
      this.authService.checkExistingEmail({ email: payload.email }).subscribe((resp: any) => {
        if (resp.success == true) {
          this.registerUser(payload);
          this.toastr.success(resp.message);
        } else {
          this.toastr.error(resp.message);
        }
      });
    }
  }
  registerUser(data?) {
    this.authService.register(data).subscribe((resp: any) => {
      if (resp.success == true) {
        this.submitted = false;
        this.registerForm.reset();
        this.toastr.success(resp.message);
        this.router.navigate(['/auth/login']);
      } else {
        this.toastr.error(resp.message);
      }
    });
  }

}
