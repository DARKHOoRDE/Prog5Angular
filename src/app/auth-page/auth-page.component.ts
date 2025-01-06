import { Component } from '@angular/core';
import { AuthHandlerService } from '../services/auth-handler.service';
import { UserRegister } from '../types/UserRegister';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {

  loginErrorMess:string="";

  isLoginForm: boolean = true;
  ToggleForm(type:string) {
    this.isLoginForm = type == "log" ? true:false;
  }

  constructor(private authServ:AuthHandlerService,
              private router:Router
  ){}

  userReg:UserRegister={
    password:"",
    username:""
  }

  LoginSubmit(){
    this.authServ.Login(this.userReg).subscribe(
      resp=>{
        console.log(resp)
        if(resp){
          localStorage.setItem("token",resp.token)
          this.router.navigate(["editor"]);
        }
      }
    );
  }

  RegisterSubmit(){
    this.authServ.Register(this.userReg).subscribe(
      resp=>{
        if(resp){
          this.isLoginForm = true;
          this.loginErrorMess=resp
        }
      }
    );
  }


}
