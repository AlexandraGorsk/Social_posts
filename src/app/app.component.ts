import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  faThumbsUp,
  faComment,
  faAngleLeft,
  faAngleRight,
  faSearch,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { PostService } from './services/post.service';
import { Post, PostItem } from './services/post.interface';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public faThumbsUp = faThumbsUp;
  public faComment = faComment;
  public faAngleLeft = faAngleLeft;
  public faAngleRight = faAngleRight;
  public faSearch = faSearch;
  public faClose = faClose;
  public postService = inject(PostService);
  private _cdr = inject(ChangeDetectorRef);
  public comment: FormControl = new FormControl();
  public findPost: FormControl = new FormControl();
  public newPost: FormControl = new FormControl();
  public content!: string;

  public searchResults: Post[] = [];
  public createPostModal = false;

  posts!: Post[];
  public ngOnInit(): void {
    console.log(this.content);
    this.postService.getPosts().subscribe((resp) => {
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
        filter((value) => value.length > 2)
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
    this.createPostModal = true;
  }

  public onPostButton(): void {
    const postText = this.newPost.value?.trim();
    if (!postText) {
      this.newPost.setErrors({ emptyField: true });
    } else {
      const date = Date.now().toString();
      const postObj = {
        id: this.posts.length,
        name: 'My Name',
        surname: 'My Surname',
        post: {
          text: postText,
          likes: 0,
          liked: false,
          time: date,
          comments: [],
        },
      };
      this.posts = [postObj, ...this.posts];
      this._cdr.markForCheck;
      this.newPost.reset();
      this.createPostModal = false;
    }
  }

  public onCloseModal(): void {
    this.createPostModal = false;
  }
}
