import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  val ={
    email: 'vovapankiw@gmail.com',
    password: '1234'
  }

  constructor() {

  }

  ngOnInit() {

  }

  login(loginForm: NgForm, event) {
    console.log(loginForm);
    console.log(event);
  }

  onEmailChange(change) {
    console.log(change)
  }

}
