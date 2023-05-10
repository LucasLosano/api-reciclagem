import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensaFormComponent } from './recompensa-form.component';

describe('RecompensaFormComponent', () => {
  let component: RecompensaFormComponent;
  let fixture: ComponentFixture<RecompensaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecompensaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecompensaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
