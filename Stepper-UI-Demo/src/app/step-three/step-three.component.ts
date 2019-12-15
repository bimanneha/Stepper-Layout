import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {

  step3: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private formService: FormService) {
    this.step3 = this._formBuilder.group({
      review: ['', Validators.required]
    });

    this.formService.stepReady(this.step3, 'three')
  }

  ngOnInit() {
  }

}
