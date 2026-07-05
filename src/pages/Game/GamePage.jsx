import styles from "./GamePage.module.css";

import StatsSection from "../../components/game/StatsSection/StatsSection";
import WordChain from "../../components/game/WordChain/WordChain";
import InputPanel from "../../components/game/InputPanel/InputPanel";
import LastPlay from "../../components/game/LastPlay/LastPlay";
import HelpPanel from "../../components/game/HelpPanel/HelpPanel";

export default function GamePage() {
  return (
    <main className={styles.page}>
      <StatsSection />

      <section className={styles.content}>
        <section className={styles.chain}>
          <WordChain />
        </section>

        <aside className={styles.sidebar}>
          <InputPanel />
          <LastPlay />
          <HelpPanel />
        </aside>
      </section>
    </main>
  );
}