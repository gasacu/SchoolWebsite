import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryImageTableComponent } from './gallery-image-table.component';

describe('GalleryImageTableComponent', () => {
  let component: GalleryImageTableComponent;
  let fixture: ComponentFixture<GalleryImageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryImageTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryImageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
