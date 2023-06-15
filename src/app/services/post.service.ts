import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public getPosts(): Observable<Post[]> {
    return of([
      {
        id: 0,
        name: 'Alexandra',
        surname: 'Jackman',
        post: {
          text: 'Random text',
          likes: 2,
          liked: true,
          time: '1686835835000',
          comments: [
            { commentId: 0, text: 'comment to post 1', name: 'Robert De Niro' },
            { commentId: 1, text: 'one more comment', name: 'Meryl Streep' },
          ],
        },
      },
      {
        id: 1,
        name: 'Iryna',
        surname: 'Chan',
        post: {
          text: 'Hi, my name is Iryna',
          likes: 6,
          liked: false,
          time: '1686835835000',
          comments: [
            {
              commentId: 0,
              text: 'comment to to Irynw post',
              name: 'Harry Potter',
            },
          ],
        },
      },
      {
        id: 2,
        name: 'David',
        surname: 'Kidman',
        post: {
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cen",
          likes: 19,
          liked: true,
          time: '1610492467000',
          comments: [
            { commentId: 0, text: 'I Like', name: 'Tom Hanks' },
            { commentId: 1, text: 'I disagre!!!!', name: 'Leonardo DiCaprio' },
          ],
        },
      },
      {
        id: 3,
        name: 'Kseniya',
        surname: 'Portman',
        post: {
          id: 1,
          text: "le content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors",
          likes: 2,
          liked: true,
          time: '1672320067000',
          comments: [],
        },
      },
      {
        id: 4,
        name: 'Nadzeya',
        surname: 'Depp',
        post: {
          text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text",
          likes: 8,
          liked: false,
          time: '1662729667000',
          comments: [
            { commentId: 0, text: 'comment to post 1', name: 'Morgan Freeman' },
            { commentId: 1, text: 'Good', name: 'Cate Blanchett' },
            { commentId: 2, text: 'one more comment', name: 'Kate Winslet' },
            { commentId: 3, text: 'Fantastic', name: 'Madonna' },
          ],
        },
      },
      {
        id: 5,
        name: 'Alexey ',
        surname: 'Spears',
        post: {
          text: 'reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
          likes: 110,
          liked: true,
          time: '1655040067000',
          comments: [
            {
              commentId: 0,
              text: 'Thank you. It was perfect explanation',
              name: 'Julia Roberts ',
            },
            { commentId: 1, text: 'one more comment', name: ' Sophia Loren' },
          ],
        },
      },
    ]);
  }
}
