import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent {

  step1: FormGroup;

  constructor(private _formBuilder: FormBuilder, private formService: FormService) {

    this.step1 = this._formBuilder.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      cityName: ''
    });

    this.formService.stepReady(this.step1, 'one')
  }

  change(cityName){
    this.step1.patchValue({ cityName: cityName});
  }

}
