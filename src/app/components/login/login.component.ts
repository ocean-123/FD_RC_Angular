import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['',],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
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

          // Store the token and role in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          // this.router.navigate(['/register']);

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
}