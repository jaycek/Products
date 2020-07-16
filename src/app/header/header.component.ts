import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _auth:AuthService,private _router:Router){}

  logoutUser(){
      
    this._router.navigate(['/login']);
  }

  title:String="Product Management";
  ngOnInit(): void {
  }

}
