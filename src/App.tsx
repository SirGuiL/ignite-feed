import { Header } from "./components/Header/Header"
import { Sidebar } from "./components/Sidebar/Sidedbar";
import { Post } from "./components/Post/Post";

import { posts, authors } from './static/posts'

import './global.css';
import styles from './App.module.css';
import { linkifyHashtags } from "./utils/postUtils";

// export const generateNumber = () => {
//   let number = 1;

//   setInterval(() => {
//     console.log(number);

//     if (number === 3) {
//       number = 0;
//     }

//     number++;
//   }, 500);
// }

const formattedPosts = posts.map((post) => {
  const author = authors.find(author => author.id === post.author);
  const comments = post.comments.map((comment) => {
    const commentAuthor = authors.find(author => author.id === comment.author);

    return {
      id: comment.id,
      author: commentAuthor,
      publishedAt: comment.publishedAt,
      content: comment.content,
      applause: comment.applause
    }
  });

  return {
    id: post.id,
    author: author,
    publishedAt: post.publishedAt,
    content: post.content,
    comments: comments
  }
});

const App = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            formattedPosts.map(post => {
              return (
                <Post
                  author={post.author}
                  content={linkifyHashtags(post.content)}
                  publishedAt={post.publishedAt}
                  key={post.id}
                  comments={post.comments}
                />
              )
            })
          }
        </main>
      </div>
    </>
  )
}

export default App
