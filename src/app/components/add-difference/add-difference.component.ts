import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Difference, DifferencesService} from '../../services/differences.service';

@Component({
  selector: 'app-add-difference',
  templateUrl: './add-difference.component.html',
  styleUrls: ['./add-difference.component.css']
})
export class AddDifferenceComponent implements OnInit {
  newDifference: Difference;

  constructor(private api: DifferencesService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, public router: Router) { }

  diffForm = this.formBuilder.group({
    diff: new FormControl(null, [Validators.required, Validators.maxLength(2048), Validators.minLength(6)]),
    autor: new FormControl(null, [Validators.maxLength(128)]),
  });


  ngOnInit() {
    const newDifference = new Difference();
    this.newDifference = newDifference;
  }

  getErrorMessage() {
    return this.diffForm.controls.diff.hasError('required') ? 'You must enter a difference' :
      this.diffForm.controls.diff.hasError('maxLength') ? 'Too long, raconte pas ta vie andouille' :
        this.diffForm.controls.autor.hasError('maxLength') ? 'Too long' :
        this.diffForm.controls.diff.hasError('minLength') ? 'Too short' :
        '';
  }

  onSubmit() {
    console.log(this.diffForm.value);
    this.newDifference.diff = this.diffForm.value.diff;
    this.newDifference.autor = this.diffForm.value.autor;


    this.api.createDiff(this.newDifference).subscribe( x => {
      const message = 'Vous avez bien créé la différence : ' + this.diffForm.value.diff + ' numero ' + x;
      this.snackBar.open(message, 'Ok', {
        duration: 2000,
      });
      this.router.navigateByUrl('difference')
        .then(() => {
          window.location.reload();
        });
    });
  }

}
