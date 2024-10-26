import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../../../../entities/event';
import { EventService } from '../../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  event: Event = {
    id: 0,
    title: ''
  }

  isEditing: boolean = false;

  errorMessage : string = "";

  constructor(
    private eventService: EventService, 
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if(id) {
        // editing event
        this.isEditing = true;

        this.eventService.getEventById(Number(id)).subscribe({
          next: (result) => this.event = result,
          error: (err) => this.errorMessage = `Error Occured (${err.status})`
        })
      }
    });    
  }

  onSubmit() : void {

    if(this.isEditing) {
      this.eventService.editEvent(this.event)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        }
      });

    } else {
      // creating
      this.eventService.createEvent(this.event)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        }
      });
    }
  }

}
