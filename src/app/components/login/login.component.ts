import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/service/loginService/login.service';
import { AuthenticateService } from 'src/app/service/AuthS/authenticate.service';
import { DemoserviceService } from 'src/app/service/demoservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private authenticate: AuthenticateService;
  private demoService: DemoserviceService;


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
    authenticate: AuthenticateService,
    demoService: DemoserviceService
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.authenticate = authenticate;
    this.demoService = demoService;
  }

  ngOnInit() {
    // If you need to perform any initialization logic, you can do it here
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.loginService.loginUser(userData).subscribe(
        (response: any) => {
          const token = response.token;
          const role = response.role;
          const id = response.id;

          // Store the token and role in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('id', id)

          this.authenticate.setAuthenticated(true);
          this.demoService.setUserRole(role);
          console.log(token);


          this.router.navigate(['/dashboard'],);

        },
        (error: any) => {
          console.error('Login failed:', error);
          this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }

  loginWithGoogle() {
    // Implement Google login logic here
    console.log('Login with Google clicked');
    this.snackBar.open('Google login not implemented yet', 'Close', { duration: 3000 });
  }
}