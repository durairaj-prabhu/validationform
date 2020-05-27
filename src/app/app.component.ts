import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day';
  myForm: FormGroup;
  countries = {
    IND: {
      code: "IN",
      name: "India",
      states: {
        TN: {
          code: "TN",
          name: "Tamil Nadu",
          cities: [{
            code: "CHN",
            name: "Chennai"
          }, {
            code: "MDU",
            name: "Madurai"
          }]
        },
        KL: {
          code: "KL",
          name: "Kerala",
          cities: [{
            code: "APY",
            name: "Alappuzha"
          }, {
            code: "KCH",
            name: "Kochin"
          }]
        }
      }
    },
    DB: {
      code: "AU",
      name: "Australia",
      states: {
        QLD: {
          code: "QLD",
          name: "Queensland",
          cities: [{
            code: "BB",
            name: "Brisbane"
          }]
        },
        NSW: {
          code: "NSW",
          name: "New South Wales",
          cities: [{
            code: "SYD",
            name: "Sydney"
          }]
        }
      }
    }
  }
  // countryList=[];
  stateList = [];
  cityList = [];
  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', Validators.required),
      cnfrm_pass: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      marital_status: new FormControl('', Validators.required),
      favFood: new FormControl('', Validators.required),
      favcolor: new FormControl('', Validators.required)
    })
    this.myForm.get('country').valueChanges.subscribe((data) => {
      // console.log(data);
      this.stateList = Object.keys(this.countries[data].states).map((item) => {
        return this.countries[data].states[item];
      });
    })
    this.myForm.get('state').valueChanges.subscribe((data) => {
      // console.log(this.stateList,data);
      // console.log(this.countries[this.myForm.get('country').value]);
      this.cityList = this.countries[this.myForm.get('country').value]["states"][data]["cities"];
      // console.log(this.cityList);
    })
  };
  countryList = Object.keys(this.countries);

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      alert("Your form has been submitted successfully");
    }
    else {
      alert("Error");
    }
  }
}
