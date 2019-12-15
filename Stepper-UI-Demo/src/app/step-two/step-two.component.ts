import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

  step2: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private formService: FormService
  ) {

    this.step2 = this._formBuilder.group({
      payment: ['', Validators.required]
    });

    this.formService.stepReady(this.step2, 'two')
  }

  ngOnInit() {
  }

}
