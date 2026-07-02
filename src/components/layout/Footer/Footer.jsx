import GithubIcon from '../../icons/GithubIcon'
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {currentYear} Tomás Aguirre</span>

      <a
        href="https://github.com/tomieaguirre"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={styles.githubLink}
      >
        <GithubIcon />
      </a>
    </footer>
  );
}