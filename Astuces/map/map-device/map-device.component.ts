import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-polylinedecorator';
import './../L.Control.Layers.Tree.js';
import {HttpClient} from '@angular/common/http';
import {DeviceAdminService} from '../../services/deviceAdminService';
import * as geojson from 'geojson';
import {Layer} from 'leaflet';

require('./../L.Control.Layers.Tree.js');

@Component({
  selector: 'app-map-device',
  templateUrl: './map-device.component.html',
  styleUrls: ['./map-device.component.css']
})
export class MapDeviceComponent implements OnInit {

  map: any;
  lat: any;
  lon: any;
  name: any;
  data: any;
  polylinePoints = [];
  device_id = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: DeviceAdminService,
  ) { }

  ngOnInit() {
    this.device_id = this.route.snapshot.paramMap.get('id').toString();
    this.api.getAllMapByDeviceId(this.device_id).subscribe(assets => {
      this.data = assets;
      this.data.sort((a, b) => a.time - b.time);
      this.polylinePoints = [];
      this.startTagTracking();

    });
  }

  startTagTracking() {

    const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors',
    });

    const geojsonMarkerOptions = {
      radius: 7,
      fillColor: '#3388ff',
      color: '#001cff',
      weight: 3,
      opacity: 0.8,
      fillOpacity:  1
    };

    const geojsonMarkerOptionsEnd = {
      radius: 10,
      fillColor: '#001cff',
      color: '#ff1900',
      weight: 5,
      opacity: 1,
      fillOpacity:  1
    };

    const geojsonMarkerOptionsStart = {
      radius: 10,
      fillColor: '#001cff',
      color: '#21ff00',
      weight: 3,
      opacity: 5,
      fillOpacity:  1
    };


    const toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>' +
        ' &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    });

    const baseTree = {
      label: 'Map Layers',
      children: [
        { label: 'OpenStreetMap', layer: osm },
        { label: 'Toner', layer: toner }
      ]
    };
    this.map = L.map('map', {layers: [osm]});

    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 2,
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false
    });

    this.data.sort((a, b) => a.time - b.time);
    // console.log(this.data.length);
    // console.log(this.data);
    const dataEnd = this.data.length;

    for (let i = 0; i < dataEnd; i++) {
      let long_t = parseFloat(this.data[i].lon);
      long_t = parseFloat(long_t.toFixed(10));
      let lati_t = parseFloat(this.data[i].lat);
      lati_t = parseFloat(lati_t.toFixed(10));
      const name = this.data[i].device;
      const id = this.data[i].device_id;

      this.polylinePoints.push([lati_t, long_t]);

      markers.addLayer(L.geoJSON(<geojson.Feature>
        {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [long_t, lati_t]
        },
        properties: {
          name: name,
          time : convert(this.data[i].time).toString(),
          id: id,
        },
      }, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
          if (i === 0) {
            return L.circleMarker(latlng, geojsonMarkerOptionsStart);
          } else {
            if (i === dataEnd - 1) {
              return L.circleMarker(latlng, geojsonMarkerOptionsEnd);
            } else {
              return L.circleMarker(latlng, geojsonMarkerOptions);
            }
          }
        }
      }));
    }


    // removes duplicate
    const lines = {};
    const myData = this.polylinePoints;
    lines.line = Array.from(new Set(myData.map(JSON.stringify))).map(JSON.parse);

    const polyline = L.polyline(lines.line).addTo(this.map);

    L.polylineDecorator(polyline, {
      patterns: [
        {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 20, pathOptions: {fillOpacity: 0.8, weight: 0}})}
      ]
    }).addTo(this.map);

    // wifi
    function onEachFeature(feature, layer) {
      if (feature.properties) {
        const link = 'http://localhost:4200/map/id/' + feature.properties.id;
        layer.bindPopup(feature.properties.name + ' '
          + feature.properties.time + '</br> <a href=' + link + '> Device </a>'); // TODO Id du trackeur
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
    if (markers instanceof Layer) {
      this.map.addLayer(markers);
    }
    this.map.fitBounds(markers.getBounds());
  }
}
