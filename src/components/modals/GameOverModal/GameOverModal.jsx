import {
    RotateCcw,
    Trophy,
    Hash,
} from "lucide-react";

import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";

import styles from "./GameOverModal.module.css";

export default function GameOverModal({
    score,
    words,
    newRecord = false,
    rankingPosition = null,
    onRestart,
    onClose,
    onOpenRanking,
}) {

    return (

        <Modal
            title="¡Partida terminada!"
            onClose={onClose}
        >

            <p className={styles.subtitle}>
                Se acabó el tiempo.
            </p>

            <div className={styles.stats}>

                <article className={styles.card}>

                    <Trophy size={24} />

                    <span className={styles.value}>
                        {score}
                    </span>

                    <span className={styles.label}>
                        puntos
                    </span>

                </article>

                <article className={styles.card}>

                    <Hash size={24} />

                    <span className={styles.value}>
                        {words}
                    </span>

                    <span className={styles.label}>
                        palabras
                    </span>

                </article>

            </div>

            {newRecord && (

                    <section className={styles.record}>

                        <Trophy
                            size={22}
                            className={styles.recordIcon}
                        />

                        <div className={styles.recordInfo}>

                            <span className={styles.recordTitle}>
                                ¡Nuevo récord!
                            </span>

                            <span className={styles.recordText}>
                                Alcanzaste el puesto #{rankingPosition} del ranking.
                            </span>

                        </div>

                    </section>

            )}

            <div className={styles.actions}>

                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Ver partida
                </Button>

                <Button
                    variant="primary"
                    iconLeft={<RotateCcw size={18} />}
                    onClick={onRestart}
                >
                    Nueva partida
                </Button>

            </div>

        </Modal>

    );

}