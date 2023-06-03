import { Avatar } from '../Avatar/Avatar';
import styles from './Sidebar.module.css';

import { PencilLine } from "@phosphor-icons/react";

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=50"
        alt="cover"
      />
      <div className={styles.profile}>
        <Avatar source="https://xesque.rocketseat.dev/users/avatar/profile-a7492078-4cbb-4381-a1e8-febef1a6cc55-1614111722724.jpg" />
        <strong>Guilherme Lima</strong>
        <span>Front-end Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}