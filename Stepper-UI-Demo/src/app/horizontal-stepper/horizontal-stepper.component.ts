import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-horizontal-stepper',
  templateUrl: './horizontal-stepper.component.html',
  styleUrls: ['./horizontal-stepper.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HorizontalStepperComponent {

  isLinear = false;

  encryptedPaymentData: any;

  stepperStatus = { 'address': false, 'payment': false, 'review': false, 'done': false};

  constructor(private formService: FormService) { }

  shareData(evt) {
    this.encryptedPaymentData = evt;
  }

  stepperStatusChange(evt) {
    const keyName = Object.keys(evt)[0];
    this.stepperStatus[keyName] = evt[keyName];
    console.log('this.stepperStatus', this.stepperStatus);
  }

}
