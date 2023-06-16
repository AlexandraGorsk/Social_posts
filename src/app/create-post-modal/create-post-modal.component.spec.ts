import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreatePostModalComponent } from './create-post-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreatePostModalComponent', () => {
  let component: CreatePostModalComponent;
  let fixture: ComponentFixture<CreatePostModalComponent>;

  const fakeMatDialogRef = jasmine.createSpyObj(['close']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: fakeMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fakeMatDialogRef.close.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close Dialog', () => {
    component.onClose();
    expect(fakeMatDialogRef.close).toHaveBeenCalled();
  });

  it('should check error on empty input', () => {
    spyOn(component.newPost, 'reset');

    component.newPost.setValue('');
    component.onPostButton();

    expect(component.newPost.getError('emptyField')).toBeTruthy();
    expect(component.newPost.reset).not.toHaveBeenCalled();
    expect(fakeMatDialogRef.close).not.toHaveBeenCalled();
  });

  it('should check filled input', () => {
    spyOn(component.newPost, 'reset');

    component.newPost.setValue('Text');
    component.onPostButton();
    const post = component.newPost.value.trim();

    expect(component.newPost.getError('emptyField')).toBeFalsy();
    expect(component.newPost.reset).toHaveBeenCalled();
    expect(fakeMatDialogRef.close).toHaveBeenCalledWith(post);
  });
});
