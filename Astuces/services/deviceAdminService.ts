import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {Device} from '../model/Devices';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DeviceAdminService {

  constructor(private http: HttpClient) { }

  getMapAssets(): Observable<any> {
    return this.http.get(environment.endpoints.devices + '/map');
  }

  getMapAssetsAll(): Observable<any> {
    return this.http.get(environment.endpoints.devices + '/map/all');
  }

  getAllLastMapAssets(): Observable<any> {
    return this.http.get(environment.endpoints.devices + '/map/all-last');
  }

  getMapAssetsTestAll(): Observable<any> {
    return this.http.get(environment.endpoints.devices + '/map_test/all');
  }

  getAllMapByDeviceId(id: string) {
    return this.http.get<Device>(environment.endpoints.devices + '/map/all/' + id.toString());
  }

  getDeviceList(): Observable<Device[]> {
    return this.http.get<Device[]>(environment.endpoints.devices);
  }

  getDeviceById(id: number) {
    return this.http.get<Device>(environment.endpoints.devices + '/' + id.toString());
  }

  getDeviceGroupById(id: number) {
    return this.http.get<Device>(environment.endpoints.devices + '-group/' + id.toString());
  }

  updateDevice(id: number, device: Device) {
    return this.http.put(environment.endpoints.devices + '/' + id.toString(), device);
  }

  deleteAssociationByDeviceId(id: number) {
    return this.http.delete(environment.endpoints.devices + '-associate/' + id.toString());
  }

  deleteDevice(id: number) {
    return this.http.delete(environment.endpoints.devices + '/' + id.toString());
  }

  AssociateGroupToDeviceByDeviceId(id: number, groupsIdList: number[]) {
    return this.http.post(environment.endpoints.devices + '-associate-groups-to-deviceId/' + id.toString(),
      JSON.stringify(groupsIdList, function(dev, value) {
      if (value === '') {
        return undefined;
      }
      return value;
    }), httpOptions);
  }

  createDevice(device: Device) {
    return this.http.post(environment.endpoints.devices, JSON.stringify(device, function(device, value) {
      if (value === '') {
        return undefined;
      }
      return value;
    }), httpOptions);
  }
}

