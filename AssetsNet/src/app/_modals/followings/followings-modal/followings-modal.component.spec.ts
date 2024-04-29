import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingsModalComponent } from './followings-modal.component';

describe('FollowingsModalComponent', () => {
  let component: FollowingsModalComponent;
  let fixture: ComponentFixture<FollowingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowingsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
