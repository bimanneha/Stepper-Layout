import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormService } from '../../services/form.service';
import { HttpClient } from '@angular/common/http';

declare const AdyenCheckout;

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements AfterViewInit {

  step2: FormGroup;

  @Input()
  encryptedPaymentData: any;

  @Output()
  dataReceived = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder,
    private formService: FormService,
    private http: HttpClient
  ) {

    this.step2 = this._formBuilder.group({
      payment: ['', Validators.required]
    });

    this.formService.stepReady(this.step2, 'two');
  }

  ngAfterViewInit() {
    const paymentMethodsResponse = {
      'groups': [
        {
          'name': 'Credit Card',
          'types': [
            'amex',
            'visa'
          ]
        }
      ],
      'paymentMethods': [
        {
          'brands': [
            'amex',
            'visa'
          ],
          'details': [
            {
              'key': 'number',
              'type': 'text'
            },
            {
              'key': 'expiryMonth',
              'type': 'text'
            },
            {
              'key': 'expiryYear',
              'type': 'text'
            },
            {
              'key': 'cvc',
              'type': 'text'
            },
            {
              'key': 'holderName',
              'optional': true,
              'type': 'text'
            }
          ],
          'name': 'Credit Card',
          'type': 'scheme'
        }
      ]
    };

    const configuration = {
      locale: 'en-US',
      environment: 'test',
      originKey: "pub.v2.7814286629520534.aHR0cDovL2xvY2FsaG9zdDo0MjAw.5U9SRHqYkn3vrGQ_nvwc5gXI17zds3BvzQQXtNOATVk",
      paymentMethodsResponse: paymentMethodsResponse
    };
    const checkout = new AdyenCheckout(configuration);

    const dropin = checkout
      .create('dropin', {
        paymentMethodsConfiguration: {
          card: { // Example optional configuration for Cards
            hasHolderName: true,
            holderNameRequired: true,
            openFirstPaymentMethod: true,
            enableStoreDetails: true,
            hideCVC: false, // Change this to true to hide the CVC field for stored cards
            name: 'Credit Card'
          }
        },
        onSubmit: (state, dropin) => {
          this.makePayment(state.data)
          // Your function calling your server to make the /payments request
            .subscribe(action => {
              dropin.handleAction(action);
              // Drop-in handles the action object from the /payments response
            });
        },
        onAdditionalDetails: (state, dropin) => {
          this.makeDetailsCall(state.data)
          // Your function calling your server to make a /payments/details request
            .subscribe(action => {
              dropin.handleAction(action);
              // Drop-in handles the action object from the /payments/details response
            });
        }
      })
      .mount('#dropin');

  }

  makePayment(data) {
    this.encryptedPaymentData = data.paymentMethod;
    this.dataReceived.emit(this.encryptedPaymentData);
    // Dummy API call to Imgur API
    return this.http.get('api/hot/viral/day/0');
  }

  makeDetailsCall(data) {
    console.log('data', data);

    // Dummy API call to Imgur API
    return this.http.get('api/hot/viral/day/0');
  }

}
