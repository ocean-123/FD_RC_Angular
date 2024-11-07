import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // @Input() userId: string;
  // user: User | null = null;

  // constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  // ngOnInit() {
  //   this.loadUserProfile();
  // }

  // loadUserProfile() {
  //   if (this.userId) {
  //     this.userService.getUserById(this.userId).subscribe(
  //       (user: User) => {
  //         this.user = user;
  //       },
  //       (error) => {
  //         this.snackBar.open('Error loading user profile', 'Close', { duration: 3000 });
  //         console.error('Error loading user profile:', error);
  //       }
  //     );
  //   } else {
  //     this.snackBar.open('User ID not found', 'Close', { duration: 3000 });
  //   }
  // }

  // editProfile() {
  //   // Implement edit profile functionality
  //   this.snackBar.open('Edit profile functionality to be implemented', 'Close', { duration: 3000 });
  // }
}