import styles from './Avatar.module.css';

export const Avatar = ({hasBorder = true, source}) => {
  return (
    <img
      className={hasBorder ? styles.avatar : styles.avatarNoBorder}
      src={source}
      alt="avatar"
    />
  )
}