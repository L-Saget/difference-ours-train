import { Injectable } from '@angular/core';
import {Device} from '../model/Devices';
import {Observable, Subject} from 'rxjs';
import {Group} from '../model/Groups';
import {User} from '../model/User';
import {UsersGroup} from '../model/UsersGroups';

@Injectable()
export class StoreService {
  private device: Subject<Device>;
  private deviceList: Subject<Device[]>;
  private group: Subject<Group>;
  private groupList: Subject<Group[]>;
  private user: Subject<User>;
  private userList: Subject<User[]>;
  private usersGroup: Subject<UsersGroup>;
  private usersGroupList: Subject<UsersGroup[]>;

  constructor() {
    this.device = new Subject<Device>();
    this.deviceList = new Subject<Device[]>();
    this.group = new Subject<Group>();
    this.groupList = new Subject<Group[]>();
    this.user = new Subject<User>();
    this.userList = new Subject<User[]>();
    this.usersGroup = new Subject<UsersGroup>();
    this.usersGroupList = new Subject<UsersGroup[]>();
  }

  // DEVICE
  public getDevice(): Observable<Device> {
    return this.device.asObservable();
  }

  public setDevice(newDevice: Device): void {
    this.device.next(newDevice);
  }

  // DEVICE LIST
  public getDeviceList(): Observable<Device[]> {
    return this.deviceList.asObservable();
  }

  public setDeviceList(newDeviceList: Device[]): void {
    this.deviceList.next(newDeviceList);
  }

  // GROUP
  public getGroup(): Observable<Group> {
    return this.group.asObservable();
  }

  public setGroup(newGroup: Group): void {
    this.group.next(newGroup);
  }

  // GROUP LIST
  public getGroupList(): Observable<Group[]> {
    return this.groupList.asObservable();
  }

  public setGroupList(newGroupList: Group[]): void {
    this.groupList.next(newGroupList);
  }

  // USER
  public getUser(): Observable<User> {
    return this.user.asObservable();
  }

  public setUser(newUser: User): void {
    this.user.next(newUser);
  }

  // USER LIST
  public getUserList(): Observable<User[]> {
    return this.userList.asObservable();
  }

  public setUserList(newUserList: User[]): void {
    this.userList.next(newUserList);
  }

  // USERSGROUP
  public getUsersGroup(): Observable<UsersGroup> {
    return this.usersGroup.asObservable();
  }

  public setUsersGroup(newUsersGroup: UsersGroup): void {
    this.usersGroup.next(newUsersGroup);
  }

  // USERSGROUP LIST
  public getUsersGroupList(): Observable<UsersGroup[]> {
    return this.usersGroupList.asObservable();
  }

  public setUsersGroupList(newUsersGroupList: UsersGroup[]): void {
    this.usersGroupList.next(newUsersGroupList);
  }

}
