import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemoserviceService } from 'src/app/service/demoservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/service/AuthS/authenticate.service';



interface FoodListing {
  id: number;
  name: string;
  quantity: number;
  expirationDate: Date;
  status: 'Available' | 'Requested' | 'In Transit' | 'Delivered';
  location?: [number, number];
}
interface User {
  id: number;
  name: string;
  email: string;
  role: 'DONOR' | 'RECEIVER' | 'DELIVERY_PERSON' | 'ADMIN';
  location?: [number, number];
  rating?: number;
  blocked?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('map', { static: false })
  mapElement!: ElementRef<HTMLElement>;
  @ViewChild('deliveryMap', { static: false })
  deliveryMapElement!: ElementRef<HTMLElement>;
  @ViewChild('chartCanvas', { static: false })
  chartCanvas!: ElementRef<HTMLCanvasElement>;


  logOut() {

    localStorage.removeItem('token');
    this.authenticate.setAuthenticated(false);
    // Navigate to the login page
    this.router.navigate(['/login']);
    // throw new Error('Method not implemented.');
  }


  userRole: 'DONOR' | 'RECEIVER' | 'DELIVERY_PERSON' | 'ADMIN' = 'ADMIN';
  userName: string = 'John Doe';
  activeView: string = 'dashboard';
  cardTitle: string = '';
  cardValue: string = '';
  notifications: string[] = [];
  recentActivity: string[] = [];
  foodListings: FoodListing[] = [];
  deliveryPersons: User[] = [];
  userFeedback: any[] = [];
  deliveryRequests: any[] = [];
  users: User[] = [];
  newFood: Partial<FoodListing> = {};
  totalReceivers: number = 0;
  totalDonors: number = 0;
  totalDeliveryPersons: number = 0;
  totalFoodRescued: number = 0;

  postFoodForm: FormGroup;
  private userRoleSubscription: Subscription = new Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: DemoserviceService,
    private formBuilder: FormBuilder,
    private router: Router, private authenticate: AuthenticateService

  ) {
    this.postFoodForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      expirationDate: ['', Validators.required]
    });
  }

  ngOnInit() {


    this.userRoleSubscription = this.userService.userRole$.subscribe(role => {
      this.userRole = role;
      this.setDashboardData();
    });


    this.setDashboardData();
    this.loadFoodListings();
    this.loadDeliveryPersons();
    this.loadUserFeedback();
    this.loadDeliveryRequests();
    this.loadUsers();
    this.loadStatistics();
  }


  ngOnDestroy() {
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if (this.mapElement && this.mapElement.nativeElement) {
      this.initMap(this.mapElement.nativeElement);
    }
    if (this.deliveryMapElement && this.deliveryMapElement.nativeElement) {
      this.initMap(this.deliveryMapElement.nativeElement);
    }
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      this.initChart();
    }
  }

  setActiveView(view: string) {
    this.activeView = view;
  }

  setDashboardData() {
    switch (this.userRole) {
      case 'RECEIVER':
        this.cardTitle = 'Available Food';
        this.cardValue = '100 kg';
        this.notifications = ['New food listing available', 'Your food request was accepted'];
        this.recentActivity = ['Requested 5kg of apples', 'Received 3kg of bread'];
        break;
      case 'DONOR':
        this.cardTitle = 'Total Donations';
        this.cardValue = '50 kg';
        this.notifications = ['Your recent donation was picked up', 'New request for your listing'];
        this.recentActivity = ['Posted 10kg of vegetables', 'Hired a delivery person'];
        break;
      case 'DELIVERY_PERSON':
        this.cardTitle = 'Deliveries Today';
        this.cardValue = '5';
        this.notifications = ['New delivery assigned', 'Delivery #1234 status updated'];
        this.recentActivity = ['Completed delivery to Food Bank', 'Accepted new delivery request'];
        break;
      case 'ADMIN':
        this.cardTitle = 'Total Users';
        this.cardValue = '500';
        this.notifications = ['New user registered', 'Report generated'];
        this.recentActivity = ['Blocked suspicious user', 'Generated monthly report'];
        break;
    }
  }

  loadFoodListings() {
    this.foodListings = [
      { id: 1, name: 'Apples', quantity: 10, expirationDate: new Date('2023-06-30'), status: 'Available', location: [51.505, -0.09] },
      { id: 2, name: 'Bread', quantity: 5, expirationDate: new Date('2023-06-25'), status: 'Available', location: [51.51, -0.1] },
      { id: 3, name: 'Milk', quantity: 2, expirationDate: new Date('2023-06-28'), status: 'Available', location: [51.515, -0.09] },
    ];
  }

  loadDeliveryPersons() {
    this.deliveryPersons = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'DELIVERY_PERSON', rating: 4.5 },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'DELIVERY_PERSON', rating: 4.8 },
    ];
  }

  loadUserFeedback() {
    this.userFeedback = [
      { user: 'Food Bank A', rating: 5, comment: 'Great quality food, thank you!' },
      { user: 'Shelter B', rating: 4, comment: 'Timely delivery, much appreciated.' },
    ];
  }

  loadDeliveryRequests() {
    this.deliveryRequests = [
      { id: 1, from: 'Supermarket X', to: 'Food Bank Y', status: 'Pending' },
      { id: 2, from: 'Restaurant Z', to: 'Shelter W', status: 'Pending' },
    ];
  }

  loadUsers() {
    this.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'DONOR' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'RECEIVER' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'DELIVERY_PERSON' },
    ];
  }

  loadStatistics() {
    this.totalReceivers = 100;
    this.totalDonors = 50;
    this.totalDeliveryPersons = 25;
    this.totalFoodRescued = 1000;
  }

  initMap(element: HTMLElement) {
    const map = L.map(element).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    this.foodListings.forEach(listing => {
      L.marker(listing.location as L.LatLngExpression)
        .addTo(map)
        .bindPopup(`${listing.name}: ${listing.quantity}kg`)
        .openPopup();
    });
  }

  initChart() {
    // Implement chart initialization using a library like Chart.js
  }

  requestFood(food: FoodListing) {
    this.snackBar.open(`Requested ${food.quantity}kg of ${food.name}`, 'Close', { duration: 3000 });
  }

  toggleLocationSharing(event: any) {
    if (event.checked) {
      this.snackBar.open('Location sharing enabled', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Location sharing disabled', 'Close', { duration: 3000 });
    }
  }
  postFood() {
    if (this.postFoodForm.valid) {
      const newFood: Partial<FoodListing> = this.postFoodForm.value;
      this.snackBar.open(`Posted ${newFood.quantity}kg of ${newFood.name}`, 'Close', { duration: 3000 });
      this.postFoodForm.reset();
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  hireDeliveryPerson(person: User) {
    this.snackBar.open(`Hired ${person.name} for delivery`, 'Close', { duration: 3000 });
  }

  acceptDelivery(request: any) {
    this.snackBar.open(`Accepted delivery from ${request.from} to ${request.to}`, 'Close', { duration: 3000 });
  }

  editUser(user: User) {
    // Implement edit user dialog
  }

  deleteUser(user: User) {
    // Implement delete user confirmation dialog
  }

  toggleUserBlock(user: User) {
    user.blocked = !user.blocked;
    this.snackBar.open(`User ${user.name} ${user.blocked ? 'blocked' : 'unblocked'}`, 'Close', { duration: 3000 });
  }

  addUser() {
    // Implement add user dialog
  }

  generateDetailedReport() {
    this.snackBar.open('Generating detailed report...', 'Close', { duration: 3000 });
  }


  changeUserRole(role: 'DONOR' | 'RECEIVER' | 'DELIVERY_PERSON' | 'ADMIN') {
    this.userService.setUserRole(role);
  }
}