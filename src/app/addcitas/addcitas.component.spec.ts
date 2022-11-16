import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcitasComponent } from './addcitas.component';

describe('AddcitasComponent', () => {
  let component: AddcitasComponent;
  let fixture: ComponentFixture<AddcitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
