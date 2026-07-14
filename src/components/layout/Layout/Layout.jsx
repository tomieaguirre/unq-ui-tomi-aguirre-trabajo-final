import { useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import RankingModal from "../../modals/RankingModal/RankingModal";
import SettingsModal from "../../modals/SettingsModal/SettingsModal";

import useRanking from "../../../hooks/useRanking";

import styles from "./Layout.module.css";

export default function Layout({ children }) {

  const {
    ranking,
    refreshRanking,
  } = useRanking();

  const [showRanking, setShowRanking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const openRanking = () => {
    refreshRanking();
    setShowRanking(true);
  };

  const closeRanking = () => {
    setShowRanking(false);
  };

  const openSettings = () => {
      setShowSettings(true);
  };

  const closeSettings = () => {
      setShowSettings(false);
  };

  return (
    <div className={styles.appWrapper}>

      <div className={styles.container}>

        <Header
          onOpenRanking={openRanking}
          onOpenSettings={openSettings}
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

      {showSettings && (
        <SettingsModal
          onClose={closeSettings}
        />
      )}

    </div>
  );
}