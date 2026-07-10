import { useEffect, useState } from "react";

import styles from "./GamePage.module.css";

import NextLetterCard from "../../components/game/NextLetterCard/NextLetterCard";
import StatsSection from "../../components/game/StatsSection/StatsSection";
import WordChain from "../../components/game/WordChain/WordChain";
import InputPanel from "../../components/game/InputPanel/InputPanel";
import LastPlay from "../../components/game/LastPlay/LastPlay";
import HelpPanel from "../../components/game/HelpPanel/HelpPanel";
import CountdownOverlay from "../../components/game/CountdownOverlay/CountdownOverlay";
import useGame from "../../hooks/useGame";
import useCountdown from "../../hooks/useCountdown";
import { GAME_STATUS } from "../../reducers/gameStatus";
import GameOverModal from "../../components/modals/GameOverModal/GameOverModal";

export default function GamePage() {

    const {
        game,
        submitWord,
        startNewGame,
        finishCountdown,
    } = useGame();

    const [showGameOver, setShowGameOver] = useState(false);

    const countdown = useCountdown(
        game.status === GAME_STATUS.COUNTDOWN,
        finishCountdown,
    );

    useEffect(() => {

        if (game.status === GAME_STATUS.FINISHED) {
            setShowGameOver(true);
        }

    }, [game.status]);

    
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
                        status={game.status}
                        onSubmit={submitWord}
                        onStart={startNewGame}
                        loading={game.isSubmitting}
                    />

                    <LastPlay
                        play={game.lastPlay}
                    />

                    <HelpPanel />

                </aside>

            </section>

            {
                showGameOver && (

                    <GameOverModal
                        score={game.score}
                        words={game.words.length}
                        onClose={() =>
                            setShowGameOver(false)
                        }

                        onRestart={() => {
                            setShowGameOver(false);
                            startNewGame();
                        }}
                    />
                )
            }

            {
                game.status === GAME_STATUS.COUNTDOWN && (

                    <CountdownOverlay
                        value={countdown}
                    />

                )
            }

        </main>
    );
}