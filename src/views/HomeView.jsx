import { Link, Play } from 'lucide-react';

import Logo from '../components/branding/Logo/Logo';
import styles from './HomeView.module.css';

export default function HomeView() {
  return (
    <div className={styles.content}>
      <Logo
        size="big"
        layout="vertical"
      />

      <div className={styles.infoBox}>
        <Link
          className={styles.infoIcon}
          size={24}
          color="var(--color-success)"
        />

        <p>
          Forma la <strong>cadena más larga</strong> de palabras antes de que
          se acabe el tiempo.
        </p>
      </div>

      <button className={styles.playButton}>
        <Play fill="white" size={24} />
        <span>JUGAR</span>
      </button>
    </div>
  );
}