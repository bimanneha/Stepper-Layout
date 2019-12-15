import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FormService {

  private stepOneSource: Subject<FormGroup> = new Subject();
  stepOne: Observable<FormGroup> = this.stepOneSource.asObservable();

  private stepTwoSource: Subject<FormGroup> = new Subject();
  stepTwo: Observable<FormGroup> = this.stepTwoSource.asObservable();

  private stepThreeSource: Subject<FormGroup> = new Subject();
  stepThree: Observable<FormGroup> = this.stepThreeSource.asObservable();

  mainForm: FormGroup = this._formBuilder.group({
    line1: '',
    line2: '',
    cityName: '',
    address: ''
  });

  constructor(private _formBuilder: FormBuilder) {

    this.stepOne.subscribe(form =>
      form.valueChanges.subscribe(val => {
        this.mainForm.value.line1 = val.line1;
        this.mainForm.value.line2 = val.line2;
        this.mainForm.value.cityName = val.cityName;
      })
    );

    this.stepTwo.subscribe(form =>
      form.valueChanges.subscribe(val => {
        // console.log(val)
        this.mainForm.value.payment = val.payment;
      })
    );

    this.stepThree.subscribe(form =>
      form.valueChanges.subscribe(val => {
        // console.log(val)
        this.mainForm.value.review = val.review;
      })
    );
  }

  stepReady(form: FormGroup, part) {
    switch (part) {
      case 'one': { this.stepOneSource.next(form) }
      case 'two': { this.stepTwoSource.next(form) }
      case 'three': { this.stepThreeSource.next(form) }
    }
  }
}
