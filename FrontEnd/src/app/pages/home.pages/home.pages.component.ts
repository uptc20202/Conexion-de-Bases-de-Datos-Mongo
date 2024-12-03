import { Component } from '@angular/core';

@Component({
  selector: 'app-home.pages',
  templateUrl: './home.pages.component.html',
  styleUrls: ['./home.pages.component.scss']
})
export class HomePagesComponent {
  stadeLoginPopup: boolean = false;

  showLoginPopup() {
    this.stadeLoginPopup = true;
  }

  noStadeLoginPopup(){
    this.stadeLoginPopup = false;
  }
}
