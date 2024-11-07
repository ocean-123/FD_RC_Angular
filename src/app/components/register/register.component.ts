import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/registerService/register.service';
import { RoleSelectionDialogComponent } from '../role-selection-dialog.component';

export enum Roles {
  RECEIVER = 'RECEIVER',
  DONOR = 'DONOR',
  DELIVERY_PERSON = 'DELIVERY_PERSON'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedRole: Roles | null = null;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isDialogOpen: boolean = false;

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('registerFormElement') registerFormElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private registerService: RegisterService,
    private router: Router,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required,]),
      lastName: new FormControl('', [Validators.required,]),
      phoneNumber: new FormControl('', [Validators.required,]),
      address: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.openRoleSelectionDialog();
  }

  ngAfterViewInit() {
    if (this.selectedRole && this.usernameInput) {
      setTimeout(() => {
        this.usernameInput.nativeElement.focus();
      }, 0);
    }
  }

  openRoleSelectionDialog() {
    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(RoleSelectionDialogComponent, {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;

      if (result) {
        this.selectedRole = result;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  triggerImageInput() {
    document.getElementById('imageInput')?.click();
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.registerForm.valid && this.selectedRole) {
      // Use the selected image if available, or set a default image URL
      const imageUrl = 'https://example.com/default-image.jpg'; // Replace with actual default URL

      // Prepare the data to be sent, including the role and profile image URL
      const formData = {
        ...this.registerForm.value,  // Spread form values
        role: this.selectedRole,     // Append the selected role
        profileImageUrl: imageUrl    // Use the image preview or default image URL
      };

      // Send the form data to the backend for registration
      this.registerService.registerUser(formData).subscribe(
        (response: any) => {
          this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Registration failed:', error);
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Please fill out the form correctly and select a role and image', 'Close', { duration: 3000 });
    }
  }
}  