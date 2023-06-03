import { ThumbsUp, Trash } from '@phosphor-icons/react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useState } from 'react';

import styles from './Comment.module.css';
import { Avatar } from '../Avatar/Avatar';

export const Comment = ({author, publishedAt, content, applause, onDeleteComment, id}) => {
  const [applauses, setApplauses] = useState(applause);
  const [applauded, setApplauded] = useState(false);

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm", {
    locale: ptBr
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: 'há'
  });

  const removeComment = () => {
    onDeleteComment(id);
  }

  const addOrRemoveApplause = () => {
    if (applauded) {
      // setApplauses(applauses - 1);
      setApplauses((state) => {
        return state - 1;
      });
      setApplauded(false);
      return;
    }

    // setApplauses(applauses + 1);
    setApplauses((state) => {
      return state + 1;
    });
    setApplauded(true);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} source={author.avatarUrl} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong> {author.name} </strong>
              <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                {publishedDateRelativeToNow}
              </time>
            </div>
            <button title='Deletar comentário' onClick={removeComment}>
              <Trash size={24} />
            </button>
          </header>
          <p dangerouslySetInnerHTML={{ __html: content.replaceAll("\n", "<br />") }} />
        </div>
        <footer>
          <button onClick={addOrRemoveApplause} className={applauded ? styles.applauded : undefined}>
            <ThumbsUp  />
            Aplaudir <span>{applauses}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}