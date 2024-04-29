import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersModalComponent } from './followers-modal.component';

describe('FollowersModalComponent', () => {
  let component: FollowersModalComponent;
  let fixture: ComponentFixture<FollowersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
