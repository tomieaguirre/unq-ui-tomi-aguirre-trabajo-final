import { Link, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/branding/Logo/Logo";
import styles from "./HomePage.module.css";
import { PATHS } from "../../routes/paths";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <Logo size="big" layout="vertical" />

      <div className={styles.actions}>
        <div className={styles.infoBox}>
          <Link className={styles.infoIcon} size={24} color="var(--color-success)" />

          <p>
            Forma la <strong>cadena más larga</strong> de palabras antes de que se acabe el tiempo.
          </p>
        </div>

        <button className={styles.playButton} onClick={() => navigate(PATHS.GAME)}>
          <Play fill="white" size={24} />
          <span>JUGAR</span>
        </button>
      </div>
    </div>
  );
}
