import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-difference',
  templateUrl: './add-difference.component.html',
  styleUrls: ['./add-difference.component.css']
})
export class AddDifferenceComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'diff': [null, [Validators.required, Validators.maxLength(2048), Validators.minLength(6)]],
      'autor': [null, Validators.maxLength(128)],
    });
  }

  getErrorMessage() {
    return this.formGroup.diff.hasError('required') ? 'You must enter a difference' :
      this.formGroup.diff.hasError('maxLength') ? 'Too long, raconte pas ta vie andouille' :
      this.formGroup.autor.hasError('maxLength') ? 'Too long' :
      this.formGroup.diff.hasError('minLength') ? 'Too short' :
        '';
  }

  onSubmit(post) {
    console.log(post);
  }

}
