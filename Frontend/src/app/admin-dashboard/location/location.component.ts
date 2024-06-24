import { Component } from '@angular/core';
import { LocationService } from '../../services/location.service';
declare const L:any;

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  map: any;
  userMarkers: any = {};

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    console.log('Leaflet:', L); // Check if L is defined
    this.initMap();
    this.fetchUserLocations();
  }

  initMap(): void {
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  fetchUserLocations(): void {
    this.locationService.fetchUserLocations().subscribe(
      (locations: any[]) => this.updateUserMarkers(locations),
      error => console.error('Error fetching user locations', error)
    );
  }

  updateUserMarkers(locations: any[]): void {
    // Remove existing markers
    Object.keys(this.userMarkers).forEach(userId => {
      this.map.removeLayer(this.userMarkers[userId]);
    });
    this.userMarkers = {};

    locations.forEach(location => {
      const { latitude, longitude, first_name,last_name, user_id } = location;
      const marker = L.marker([latitude, longitude]).addTo(this.map);
      marker.bindPopup(`<b>${first_name} ${last_name}</b>`).openPopup();
      this.userMarkers[user_id] = marker;
    });
  }
}
