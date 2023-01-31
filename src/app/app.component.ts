import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FwSystem';
  basic=""
  header={'Authorization':"basic " + btoa("front:PrSytImJiuOyVLb9XZsMtNJEGxTWvP"),'Content-Type':'application/json'}
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        document.getElementsByClassName('load')[0]?.classList.remove('d-none');
      }

      if (event instanceof NavigationEnd) {
        setInterval(function () {
          document.getElementsByClassName('load')[0]?.classList.add('d-none');
        }, 3000);
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }
  setToken(user_token:any){
  this.header.Authorization = "Basic "+  btoa("user:"+user_token)
  }
  resetToken(){
  this.header.Authorization = "basic " + btoa("front:PrSytImJiuOyVLb9XZsMtNJEGxTWvP")
  }
}
