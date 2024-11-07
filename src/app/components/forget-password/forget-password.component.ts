import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service'; // Adjust to your actual service
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  emailResetForm!: FormGroup;
  passwordResetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // You might have a service to handle the API calls
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.emailResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordResetForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator to check if newPassword and confirmNewPassword match
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    if (newPassword !== confirmNewPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Handle reset by email
  onEmailReset(): void {
    if (this.emailResetForm.valid) {
      const email = this.emailResetForm.get('email')?.value;
      this.authService.sendPasswordResetEmail(email).subscribe(
        (response: any) => {
          this.snackBar.open('A reset link has been sent to your email.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.snackBar.open('Error sending reset link. Please try again.', 'Close', { duration: 3000 });
        }
      );
    }
  }

  // Handle reset with current password
  onPasswordReset(): void {
    if (this.passwordResetForm.valid) {
      const currentPassword = this.passwordResetForm.get('currentPassword')?.value;
      const newPassword = this.passwordResetForm.get('newPassword')?.value;

      this.authService.changePassword(currentPassword, newPassword).subscribe(
        (response: any) => {
          this.snackBar.open('Password has been changed successfully.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.snackBar.open('Error changing password. Please try again.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}