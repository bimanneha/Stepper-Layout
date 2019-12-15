import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stepper-UI-Demo';

  isLinear = true;
  myForm: Array<string>

  constructor(
    public formService: FormService,
    private fb: FormBuilder
  ) {
    this.myForm = this.formService.mainForm.value
  }

  keys() : Array<string> {
    return Object.keys(this.myForm);
  }
}
