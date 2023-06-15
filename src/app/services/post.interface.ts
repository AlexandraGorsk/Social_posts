export interface Post {
  id: number;
  name: string;
  surname: string;
  post: PostItem;
  commentInputIsShown?: boolean;
}
export interface PostItem {
  text: string;
  likes: number;
  liked: boolean;
  time: string;
  comments: Comment[];
  commentsIsOpen?: boolean;
  showHint?: boolean;
}
export interface Comment {
  commentId: number;
  text: string;
  name: string;
}
