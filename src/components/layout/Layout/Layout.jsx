import { useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import RankingModal from "../../modals/RankingModal/RankingModal";

import useRanking from "../../../hooks/useRanking";

import styles from "./Layout.module.css";

export default function Layout({ children }) {

  const {
    ranking,
    refreshRanking,
  } = useRanking();

  const [showRanking, setShowRanking] = useState(false);

  const openRanking = () => {
    refreshRanking();
    setShowRanking(true);
  };

  const closeRanking = () => {
    setShowRanking(false);
  };

  return (
    <div className={styles.appWrapper}>

      <div className={styles.container}>

        <Header
          onOpenRanking={openRanking}
        />

        <main className={styles.main}>
          {children}
        </main>

      </div>

      <Footer />

      {showRanking && (
        <RankingModal
          ranking={ranking}
          onClose={closeRanking}
        />
      )}

    </div>
  );
}