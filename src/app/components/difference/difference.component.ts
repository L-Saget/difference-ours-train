import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-difference',
  templateUrl: './difference.component.html',
  styleUrls: ['./difference.component.css']
})

export class DifferenceComponent implements OnInit {
  public difference = "";


  constructor() { }

  ngOnInit() {
    this.difference = this.getDifference();
  }

  public getDifference() {
    return('Une différence drole !');
  }
}
