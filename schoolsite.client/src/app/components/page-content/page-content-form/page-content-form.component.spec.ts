import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContentFormComponent } from './page-content-form.component';

describe('PageContentFormComponent', () => {
  let component: PageContentFormComponent;
  let fixture: ComponentFixture<PageContentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageContentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageContentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
