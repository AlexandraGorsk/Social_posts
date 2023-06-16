import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  faThumbsUp,
  faComment,
  faAngleLeft,
  faAngleRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { PostService } from './services/post.service';
import { Post, PostItem } from './services/post.interface';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, filter, takeUntil, tap } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CreatePostModalComponent } from './create-post-modal/create-post-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public faThumbsUp = faThumbsUp;
  public faComment = faComment;
  public faAngleLeft = faAngleLeft;
  public faAngleRight = faAngleRight;
  public faSearch = faSearch;

  public postService = inject(PostService);
  public comment: FormControl = new FormControl();
  public findPost: FormControl = new FormControl();

  public content!: string;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  public searchResults: Post[] = [];
  public createPostModal = false;

  public posts!: Post[];

  private _cdr = inject(ChangeDetectorRef);
  private _dialog = inject(MatDialog);
  public ngOnInit(): void {
    this.postService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.posts = resp;
      });
    this.findPost.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => {
          if (value.length < 1) {
            this.content = '';
            this._cdr.markForCheck();
          }
        }),
        filter((value) => value.length > 2),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.searchResults = this.posts.filter((item) =>
          item.post.text.toLowerCase().includes(value.toLowerCase())
        );
        this._cdr.markForCheck();
        this.searchResults.length
          ? (this.content = 'searchResultsField')
          : (this.content = 'noResultsFound');
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onCommentClick(item: PostItem): void {
    item.commentsIsOpen = !item.commentsIsOpen;
  }

  public onLike(post: PostItem): void {
    post.liked = !post.liked;
    if (post.liked) {
      ++post.likes;
    } else {
      --post.likes;
    }
    this._cdr.markForCheck();
  }

  public onLeaveComment(post: Post): void {
    if (!post.commentInputIsShown) {
      post.commentInputIsShown = true;
    } else {
      const comment = this.comment.value?.trim();
      if (!comment) {
        this.comment.setErrors({ emptyField: true });
      } else {
        this.posts = this.posts.map((item) => {
          if (item.id === post.id) {
            const updatedComments = [
              ...item.post.comments,
              {
                commentId: item.post.comments.length,
                text: comment,
                name: 'Your Name',
              },
            ];
            return {
              ...item,
              post: { ...item.post, comments: updatedComments },
            };
          }
          return item;
        });
        this.comment.reset();
      }
    }
  }

  public openCreatePostModal(): void {
    this.openDialog();
  }

  public openDialog(): void {
    const dialogRef = this._dialog.open(CreatePostModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const date = Date.now().toString();
        const postObj = {
          id: this.posts.length,
          name: 'My Name',
          surname: 'My Surname',
          post: {
            text: result,
            likes: 0,
            liked: false,
            time: date,
            comments: [],
          },
        };
        this.posts = [postObj, ...this.posts];
        this._cdr.markForCheck();
      }
    });
  }
}
