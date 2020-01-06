import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-polylinedecorator';
import './L.Control.Layers.Tree.js';
import {HttpClient} from '@angular/common/http';
import {DeviceAdminService} from '../services/deviceAdminService';
import * as geojson from 'geojson';

require('./L.Control.Layers.Tree.js');
// tslint:disable:max-line-length

@Component({
  selector: 'app-map-test',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map: any;
  lat: any;
  lon: any;
  name: any;
  all_last_data: any;
  polylinePoints = [];
  polylinePoints_t = [];

  constructor(private http: HttpClient, private api: DeviceAdminService) {
  }

  ngOnInit() {
    this.api.getAllLastMapAssets().subscribe(all_last_assets => {
      this.all_last_data = all_last_assets;
      // this.api.getMapAssetsAll().subscribe(last_assets => {
      //   console.log("last_assets");
        // console.table(last_assets);
        // this.last_data = last_assets;
        // this.api.getMapAssetsTestAll().subscribe(assets2 => {
          // this.data_test = assets2;
          this.startTagTracking();
        // });
      // });
    });

  }

  // onSelectDevice() {
  //   console.log('id');
  //   const id = 'aaa'
  //   this.router.navigate(['/map/id/' + id.toString()]);
  // }


  startTagTracking() {

    const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
      // maxZoom: 15,
      // minZoom: 2,
    });

    const geojsonMarkerOptions_last = {
      radius: 10,
      fillColor: '#3388ff',
      color: '#001cff',
      weight: 3,
      opacity: 0.8,
      fillOpacity: 0.8
    };


    const toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      // ext: 'png'
    });

    const baseTree = {
      label: 'Map Layers',
      children: [
            { label: 'OpenStreetMap', layer: osm },
            { label: 'Toner', layer: toner }
      ]
    };
    this.map = L.map('map', {layers: [osm]});

    const markers_all_last = L.markerClusterGroup({
      disableClusteringAtZoom: 17,
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false
    });

    const markers3 = L.markerClusterGroup({
      disableClusteringAtZoom: 5,
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false
    });

    for (let i = 0; i < this.all_last_data.length; i++) {

      let long = parseFloat(this.all_last_data[i].lon);
      long = parseFloat(long.toFixed(10));
      let lati = parseFloat(this.all_last_data[i].lat);
      lati = parseFloat(lati.toFixed(10));
      const name = this.all_last_data[i].device;
      const id = this.all_last_data[i].device_id;

      markers_all_last.addLayer(L.geoJSON(<geojson.Feature>
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [long, lati]
          },
          'properties': {
            name: name,
            time: convert(this.all_last_data[i].time).toString(),
            id: id,
          },
        }
        , {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions_last);
          }
        }));
    }

    const polyline = L.polyline(this.polylinePoints).addTo(this.map);
    const polyline_t = L.polyline(this.polylinePoints_t).addTo(this.map);

// maquette map avec gradients de couleur ? polyllne ou point. (Ou les deux?)

   L.polylineDecorator(polyline, {
      patterns: [
        {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 20, pathOptions: {fillOpacity: 0.8, weight: 0}})}
      ]
    }).addTo(this.map);

   L.polylineDecorator(polyline_t, {
      patterns: [
        {offset: 25, repeat: 100, symbol: L.Symbol.arrowHead({pixelSize: 20, pathOptions: {fillOpacity: 0.8, weight: 0}})}
      ]
    }).addTo(this.map);

    // let polyline2 = L.polyline(polylinePoints2).addTo(this.map);
    // L.polylineDecorator(polyline2, {
    //   patterns: [
    //     {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 20, pathOptions: {fillOpacity: 0.8, weight: 0}})}
    //   ]
    // }).addTo(this.map);

    // wifi
    function onEachFeature(feature, layer) {
      if (feature.properties) {
        const link = 'http://localhost:4200/map/id/' + feature.properties.id;
        layer.bindPopup(feature.properties.name + ' ' + feature.properties.time + '</br> <a href=' + link + '> Device </a>'); // TODO Id du trackeur
      }
    }

    function convert(time) {

      // Convert timestamp to milliseconds
      const date = new Date(time * 1000);

      // Year
      const year = date.getFullYear();

      // Month
      let month: string = (date.getMonth() + 1).toString();
      if (parseInt(String(month), 10) < 10) {
        month = '0' + month;
      }
       // var month = months_arr[date.getMonth()];

      // Day
      let day: string = date.getDate().toString();
      if (parseInt(String(day), 10) < 10) {
        day = '0' + day;
      }
      // Hours
      let hours: string = date.getHours().toString();
      if (parseInt(String(hours), 10) < 10) {
        hours = '0' + hours;
      }

      // Minutes
      const minutes = '0' + date.getMinutes();

      // Seconds
      const seconds = '0' + date.getSeconds();

      // Display date time in MM-dd-yyyy h:m:s format
      return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    // @ts-ignore
    L.control.layers.tree(baseTree).addTo(this.map);

    this.map.invalidateSize();

    this.map.addLayer(markers3);
    this.map.addLayer(markers_all_last);

    this.map.fitBounds(markers_all_last.getBounds());
  }
}
