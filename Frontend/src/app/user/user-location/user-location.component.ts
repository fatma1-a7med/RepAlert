import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { SalesService } from '../../services/user_services/user-services.service';
import { LocationService } from '../../services/location.service';
declare const L:any;

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit {
  map: any;
  marker: any;
  constructor(private http: HttpClient,private userService:SalesService,private locationService:LocationService){ }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('Location is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.initMap(coords.latitude, coords.longitude);
    });

    this.watchPosition();
  }

  initMap(latitude: number, longitude: number): void {
    this.map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.marker = L.marker([latitude, longitude]).addTo(this.map);
    this.marker.bindPopup("You are here").openPopup();
  }

  watchPosition(): void {
    navigator.geolocation.watchPosition((position) => {
      const coords = position.coords;
      console.log(`lat: ${coords.latitude}, lon: ${coords.longitude}`);

      this.marker.setLatLng([coords.latitude, coords.longitude]);
      this.map.setView([coords.latitude, coords.longitude]);

      this.userService.getCurrentUserId().subscribe(
        (response) => {
          const userId = response.user_id;
          console.log(`Removing old location and saving new location for user ${userId}`);

          this.locationService.saveLocation(userId, coords.latitude, coords.longitude)
            .subscribe(
              () => {
                console.log('Location saved successfully');
              },
              (error) => {
                console.error('Error saving location:', error);
              }
            );
        },
        (error) => {
          console.error('Error fetching user ID:', error);
        }
      );
    }, (error) => {
      console.log(error);
    }, {
      enableHighAccuracy: true,
      timeout: 900000,
      maximumAge: 0
    });
  }

  }

