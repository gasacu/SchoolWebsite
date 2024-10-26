import { Component } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';
import { Event } from '../../../../entities/event';

@Component({
  selector: 'event-table',
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.css'
})
export class EventTableComponent {

  events: Event[] = [];

  constructor(private eventService: EventService, private router: Router){}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      console.log(data);
    });
  }

  deleteEvent(id: number) : void {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id != id);
      },
      error: (err) => {
        console.error('Error for deleting event', err);
      }
    });
  }

  editEvent(id: number) : void {
    this.router.navigate(['/edit', id]);
  }

}
