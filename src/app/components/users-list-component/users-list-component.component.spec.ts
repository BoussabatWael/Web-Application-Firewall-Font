import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponentComponent } from './users-list-component.component';

describe('UsersListComponentComponent', () => {
  let component: UsersListComponentComponent;
  let fixture: ComponentFixture<UsersListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
