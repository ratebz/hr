import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {} from '@types/googlemaps';

declare var google: any

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

	@ViewChild("map") mapElement;
	map: any;
	lat: any;
	lng: any;

  	constructor(private geolocation: Geolocation) {
    
  	}

  	ngOnInit(){
  		this.initMap();
  	}

  	initMap(){

  		this.geolocation.getCurrentPosition().then((resp) => {
  			
  			this.lat = resp.coords.latitude;
  			this.lng = resp.coords.longitude;

  			//31.954020, 35.897914

  			let coords = new google.maps.LatLng(this.lat, this.lng);
	  		let mapOptions: google.maps.MapOptions = {
	  			center : coords,
	  			zoom : 18,
	  			mapTypeId: google.maps.MapTypeId.ROADMAP
	  		} 

	  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

	  		google.maps.Marker = new google.maps.Marker({
	  			map: this.map,
	  			position: coords
	  		});
		}).catch((error) => {
		  console.log('Error getting location', error);
		});


  		
  	}

}
