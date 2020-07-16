import { Component, OnInit } from '@angular/core';
import {AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { FormBuilder,Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  registeredUser = {email:"", password:""};
  constructor(private _auth:AuthService,private _router:Router,private fb:FormBuilder) { }

  registerForm = this.fb.group(

    { email :['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),Validators.required]],
    password:['',[Validators.minLength(6),Validators.required]]
    }

  )

  registerUser(){
    this._auth.registerUser(this.registeredUser)
    .subscribe(
      res=>{
        localStorage.setItem('token',res['token']);
        this._router.navigate(['/']);
      },
      err=>{
        console.log(err);
        //handle server side errors
        if(err instanceof HttpErrorResponse){
          const validationError = err.error;
           if(err.status === 422){
            this.registerForm.get('email').setErrors({ serverError: validationError}); 
          }
        }


      }
    )
  //  console.log(this.registeredUser);
  }
  ngOnInit(): void {
  }

}
