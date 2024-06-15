import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup | undefined;
  constructor(public formBuilder:FormBuilder) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname :['', [Validators.required]],
      email :['', [Validators.required,
                   Validators.email,
                   Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],
      password:['',
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]
    })
}

get errorControl(){
  return this.regForm?.controls;
}
}