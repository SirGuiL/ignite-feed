import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Avatar } from '../Avatar/Avatar';
import { Comment } from '../Comment/Comment';
import styles from './Post.module.css';

import { authors } from '../../static/posts'
import { linkifyHashtags } from '../../utils/postUtils';

export const Post = ({author, content, publishedAt, comments}) => {
  const [Comments, setComments] = useState(comments);
  const [inputValue, setInputValue] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm", {
    locale: ptBr
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: 'há'
  });

  const handleDeleteComment = (id) => {
    const newComments = Comments.filter((comment, index) => comment.id !== id);

    setComments(newComments);
  }

  const generateUniqueID = () => {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5);
    const uniqueID = timestamp + randomNum;
    return uniqueID;
  }

  const handleCreateNewComment = () => {
    event.preventDefault();

    if (!inputValue) {
      toast.error('Mensagem inválida.', {
        style: {
          padding: '16px',
          background: '#ee6060',
          color: 'white'
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ee6060',
        },
      })
      return;
    }

    const commentAuthor = authors.find(a => a.id === 0);

    const newCommentId = generateUniqueID();

    const newComment = {
      id: newCommentId,
      author: commentAuthor,
      publishedAt: new Date(),
      content: linkifyHashtags(inputValue),
      applause: 0
    }

    setInputValue('');

    setComments([...Comments, newComment]);

    toast.success(`Feedback enviado com sucesso para ${author.name}.`, {
      style: {
        padding: '16px',
        background: '#00b37e',
        color: '#fff'
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#00b37e',
      },
    })
  }

  const handleUpdateInputValue = (e) => {
    setInputValue(e.target.value)
  }

  const isNewCommentEmpty = inputValue.trim();

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar source={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>
              {author.name}
            </strong>
            <span>
              {author.role}
            </span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content.replaceAll("\n", "<br />") }} />

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='Deixe um comentário'
          value={inputValue}
          onChange={handleUpdateInputValue}
        />
        <footer>
          <button type='submit' disabled={!isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>
        <div className={styles.commentList}>
          {Comments.map((comment, index) => {
            return (
              <Comment 
                key={index}
                id={comment.id}
                author={comment.author}
                content={comment.content}
                publishedAt={comment.publishedAt}
                applause={comment.applause}
                onDeleteComment={handleDeleteComment}
              />)
          })}
        </div>
        <Toaster position="top-right" />
    </article>
  )
}