import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  

  title = 'schoolsite.client';
}
