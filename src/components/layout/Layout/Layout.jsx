import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
