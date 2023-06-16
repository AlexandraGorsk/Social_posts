import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostModalComponent {
  private _dialogRef = inject(MatDialogRef);
  public faClose = faClose;
  public newPost: FormControl = new FormControl();

  public onPostButton() {
    const postText = this.newPost.value?.trim();
    if (postText) {
      this.newPost.reset();
      this._dialogRef.close(postText);
    } else {
      this.newPost.setErrors({ emptyField: true });
    }
  }

  public onClose() {
    this._dialogRef.close();
  }
}
