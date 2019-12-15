import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-horizontal-stepper',
  templateUrl: './horizontal-stepper.component.html',
  styleUrls: ['./horizontal-stepper.component.css']
})
export class HorizontalStepperComponent implements OnInit {

  isLinear = true;

  constructor(private formService: FormService) { }

  ngOnInit() {
  }

}
