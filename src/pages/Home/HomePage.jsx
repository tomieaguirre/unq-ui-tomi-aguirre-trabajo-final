import { Link, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import styles from "./HomePage.module.css";
import Button from "../../components/ui/Button/Button";
import Logo from "../../components/branding/Logo/Logo";
import { PATHS } from "../../routes/paths";

import useAudio from "../../hooks/useAudio";

export default function HomePage() {
  const navigate = useNavigate();

  const {
    playMusic,
    stopMusic,
    MUSIC,
  } = useAudio();

  useEffect(() => {

      playMusic(MUSIC.MENU);

      return () => {
          stopMusic();
      };

  }, []);

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

        <Button
          variant="success"
          size="lg"
          fullWidth
          iconLeft={<Play fill="white" size={24} />}
          onClick={() => {
            stopMusic();
            navigate(PATHS.GAME);
          }}
        >
          JUGAR
        </Button>

      </div>
    </div>
  );
}
