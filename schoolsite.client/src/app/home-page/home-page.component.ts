import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  books: Book[] = [
    {id: 1, title: "Book one", author: "Author one"},
    {id: 2, title: "Book two", author: "Author two"},
    {id: 3, title: "Book three", author: "Author three"}
  ]

}


export interface Book {
  id : number,
  title : string;
  author: string;
}