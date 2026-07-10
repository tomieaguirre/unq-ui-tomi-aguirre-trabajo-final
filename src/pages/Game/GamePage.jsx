import styles from "./GamePage.module.css";

import NextLetterCard from "../../components/game/NextLetterCard/NextLetterCard";
import StatsSection from "../../components/game/StatsSection/StatsSection";
import WordChain from "../../components/game/WordChain/WordChain";
import InputPanel from "../../components/game/InputPanel/InputPanel";
import LastPlay from "../../components/game/LastPlay/LastPlay";
import HelpPanel from "../../components/game/HelpPanel/HelpPanel";
import useGame from "../../hooks/useGame";
import { GAME_STATUS } from "../../reducers/gameStatus";

export default function GamePage() {

    const {
        game,
        submitWord,
    } = useGame();

    console.log(game); // borrar xd

    return (
        <main className={styles.page}>

            <StatsSection
                time={game.timeLeft}
                score={game.score}
                words={game.words.length}
            />

            <section className={styles.content}>

                <section className={styles.chain}>

                    <NextLetterCard
                        letter={game.nextLetter}
                    />

                    <WordChain
                        words={game.words}
                    />

                </section>

                <aside className={styles.sidebar}>

                    <InputPanel
                        onSubmit={submitWord}
                        disabled={
                            game.status === GAME_STATUS.FINISHED ||
                            game.isSubmitting
                        }
                        loading={game.isSubmitting}
                    />

                    <LastPlay
                        play={game.lastPlay}
                    />

                    <HelpPanel />

                </aside>

            </section>
        </main>
    );
}