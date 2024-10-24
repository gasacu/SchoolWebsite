import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContentTableComponent } from './page-content-table.component';

describe('PageContentTableComponent', () => {
  let component: PageContentTableComponent;
  let fixture: ComponentFixture<PageContentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageContentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageContentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
