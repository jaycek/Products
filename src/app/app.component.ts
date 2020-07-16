import { Component, HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Products';

  @HostListener("window:beforeunload",["$event"])
    clearLocalStorage(event){
      //to clear token 
      localStorage.removeItem('token');
    }
}
