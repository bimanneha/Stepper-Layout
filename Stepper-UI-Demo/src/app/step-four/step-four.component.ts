import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {

  step4: FormGroup;

  constructor(private _formBuilder: FormBuilder, private formService: FormService) {

    this.step4 = this._formBuilder.group({
      done: ['', Validators.required]
    });

    this.formService.stepReady(this.step4, 'four')
  }

  ngOnInit() {
  }

}
