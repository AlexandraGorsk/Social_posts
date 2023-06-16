import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostService } from './services/post.service';
import { EMPTY, of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const fakePostService = jasmine.createSpyObj(['getPosts']);
  const fakeMatDialog = jasmine.createSpyObj(['open']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: MatDialog,
          useValue: fakeMatDialog,
        },
        { provide: PostService, useValue: fakePostService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fakePostService.getPosts.and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should toggle commentIsOpen prop', () => {
    const fakeComment = {
      text: 'string',
      likes: 1,
      liked: false,
      time: 'string',
      comments: [],
      commentsIsOpen: false,
    };
    component.onCommentClick(fakeComment);
    expect(fakeComment.commentsIsOpen).toBe(true);
  });

  it('should open dialog', () => {
    fakeMatDialog.open.and.returnValue({ afterClosed: () => EMPTY });
    component.openDialog();
    expect(fakeMatDialog.open).toHaveBeenCalled();
  });

  it('should rate post', () => {
    const fakePost = {
      text: 'string',
      likes: 1,
      liked: true,
      time: 'string',
      comments: [],
    };
    component.onLike(fakePost);
    expect(fakePost.liked).toBe(false);
  });
});
