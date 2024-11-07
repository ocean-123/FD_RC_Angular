import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer: ElementRef | undefined;
  // map: google.maps.Map | undefined;
  // marker: google.maps.Marker | undefined;



  // ngAfterViewInit(): void {
  //   this.initMap();
  // }

  contactForm: FormGroup;
  donationForm: FormGroup;
  activeSection: string = 'home';
  currentSlide: number = 0;
  sliderImages: string[] = [
    '/assets/food-rescue-hands.webp',
    '/assets/image1.jpeg',
    '/assets/aigen.jpeg',
  ];
  latestNews = [
    { title: '2023 Impact Report', content: 'Discover our annual impact report highlighting key achievements in food rescue.', image: '/assets/news/2023-Impact-Report-thumb-1024x683.png' },
    { title: 'August Highlights', content: 'Check out the highlights from our August activities and events.', image: '/assets/news/FAM-August-graphic-1024x683.jpg' },
    { title: 'Food Waste Awareness Op-Ed', content: 'Read our op-ed on the importance of food waste awareness.', image: '/assets/news/fwpw-op-ed-cover.jpg' },
    { title: 'Grosse Point News Feature', content: 'See our feature in Grosse Point News discussing community efforts.', image: '/assets/news/Grosse-Point-News-300x224.jpg' },
    { title: 'School Rescue Program Update', content: 'Learn about our School Rescue program and its impact on local communities.', image: '/assets/news/News-12-School-Rescue-program-300x225.jpg' },
    { title: 'SEEN Magazine Feature', content: 'Read about our initiatives in SEEN magazine.', image: '/assets/news/SEEN-magazine-photo-2-300x225.jpg' },
    { title: 'Strawberry Season Recap', content: 'A recap of our strawberry season and its benefits to local farms.', image: '/assets/news/Strawberries_May2020.jpg' },
    { title: 'Athletic Cover Story', content: 'Explore our cover story in The Athletic about food rescue efforts.', image: '/assets/news/The-Athletic-cover-300x199.jpg' }
  ];
  partners = [
    { name: 'Local Farms', logo: '/assets/partners/civic-initiatives.png' },
    { name: 'City Food Bank', logo: '/assets/partners/lockheed-martin-logo.png' },
    { name: 'Green Earth NGO', logo: '/assets/partners/NYRR-logo.png' },
    { name: 'Ambrosia Brand', logo: '/assets/partners/Ambrosia-Brand-Assets_040524_Ambrosia-Bags_Logo-and-Words_Black.jpg' },
    { name: '1% for the Planet', logo: '/assets/partners/1-percent-for-the-planet-logo.png' },
    { name: 'Refed', logo: '/assets/partners/refed-logo.png' },
    { name: 'Synchrony', logo: '/assets/partners/synchrony-logo.png' },
    { name: 'Tauck', logo: '/assets/partners/tauck-logo.png' },
    { name: 'Translation Services', logo: '/assets/partners/translation-services-logo-1.png' },
    { name: 'Whole Foods', logo: '/assets/partners/whole-foods-logo.png' }
  ];
  blogsAndEvents = [
    { title: 'The Impact of Food Waste', type: 'Blog', description: 'Explore the environmental impact of food waste.', image: '/assets/blogs/DailyTableShopper.jpg' },
    { title: 'Food Rescue Initiatives', type: 'Blog', description: 'Learn about various food rescue initiatives across the country.', image: '/assets/blogs/Food+Rescue+US.jpg' },
    { title: 'Image Insights: A Visual Guide', type: 'Blog', description: 'A collection of impactful images related to food rescue.', image: '/assets/blogs/image1.jpg' },
    { title: 'Community Engagement in Food Rescue', type: 'Event', description: 'Join us to discuss community involvement in food rescue efforts.', image: '/assets/blogs/image13.jpg' },
    { title: 'Innovative Food Solutions', type: 'Blog', description: 'Discover innovative solutions to reduce food waste.', image: '/assets/blogs/image15.jpg' },
    { title: 'Food Recovery Strategies', type: 'Blog', description: 'Effective strategies for recovering food and reducing waste.', image: '/assets/blogs/image18.jpg' },
    { title: 'Waste Not, Want Not', type: 'Event', description: 'Attend our event focused on reducing food waste in our communities.', image: '/assets/blogs/image19.jpg' },
    { title: 'The Future of Food Waste Management', type: 'Blog', description: 'Exploring future trends in food waste management.', image: '/assets/blogs/image22.jpg' },
    { title: 'Creative Ways to Use Leftovers', type: 'Blog', description: 'Learn creative recipes to utilize leftovers effectively.', image: '/assets/blogs/image4.png' }
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    this.donationForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  navigateTo(section: string) {
    this.activeSection = section;
    if (section === 'login') {
      // Implement navigation to login page
      console.log('Navigating to login page');
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form submitted', this.contactForm.value);
      this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
      this.contactForm.reset();
    }
  }

  onDonate() {
    if (this.donationForm.valid) {
      console.log('Donation form submitted', this.donationForm.value);
      // Implement eSewa payment integration here
      this.snackBar.open('Thank you for your donation!', 'Close', { duration: 3000 });
      this.donationForm.reset();
    }
  }

  // Initialize Google Map
  // initMap(): void {
  //   if (!this.mapContainer) return;

  //   const location = { lat: -34.397, lng: 150.644 };
  //   this.map = new google.maps.Map(this.mapContainer.nativeElement, {
  //     zoom: 8,
  //     center: location
  //   });

  //   this.marker = new google.maps.Marker({
  //     position: location,
  //     map: this.map
  //   });

  //   // Add click listener to place new marker
  //   this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
  //     this.placeMarker(event.latLng!);
  //   });
  // }

  // // Add or move marker to clicked position
  // placeMarker(position: google.maps.LatLng) {
  //   if (!this.map || !this.marker) return;

  //   this.marker.setPosition(position);
  //   this.map.panTo(position);
  //   this.snackBar.open(`Marker placed at: ${position.lat()}, ${position.lng()}`, 'Close', { duration: 3000 });
  // }
  startSlider() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length;
    }, 10);
  }





  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}