import { Component, OnInit } from '@angular/core';
import {Difference, DifferencesService} from '../../services/differences.service';

@Component({
  selector: 'app-difference',
  templateUrl: './difference.component.html',
  styleUrls: ['./difference.component.css']
})

export class DifferenceComponent implements OnInit {
  newDifference: Difference;

  constructor(private api: DifferencesService) { }

  ngOnInit() {
     this.api.getRandomDiff().subscribe( x => {
       console.log(x);
       console.log(x.diff);
       this.newDifference = x;
       // this.newDifference.autor = x.autor;
       // this.newDifference.diff = x.diff;
     });
  }
}
