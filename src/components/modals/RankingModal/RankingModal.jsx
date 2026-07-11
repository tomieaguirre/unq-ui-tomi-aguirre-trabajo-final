import {
    Crown,
    Trophy,
    CalendarDays,
    Hash,
} from "lucide-react";

import Button from "../../ui/Button/Button";
import Modal from "../../ui/Modal/Modal";

import styles from "./RankingModal.module.css";
import "../../../styles/scroll.css";


export default function RankingModal({
    ranking,
    onClose,
}) {

    const formatDate = (timestamp) => {

        return new Date(timestamp)
            .toLocaleDateString("es-AR");

    };

    return (

        <Modal
            title="Top 10"
            onClose={onClose}
        >

            {

                ranking.length === 0 ? (
                    <p className={styles.empty}>
                        Todavía no hay partidas registradas.
                    </p>
                ) : (
                    <div
                        className={`${styles.list} scrollable`}
                    >
                        {
                            ranking.map((item, index) => (
                                <article
                                    key={item.id}
                                    className={styles.row}
                                >

                                    <div
                                        className={`${styles.position} ${
                                            index === 0 ? styles.firstPosition : ""
                                        }`}
                                    >
                                        {index === 0 ? (
                                            <Crown size={22} />
                                        ) : (
                                            <span>#{index + 1}</span>
                                        )}
                                    </div>

                                    <div className={styles.info}>
                                        <span
                                            className={styles.score}
                                        >
                                            <Trophy size={16} />
                                            {item.score} pts
                                        </span>

                                        <span>
                                            <Hash size={15} />
                                            {item.words}
                                        </span>

                                        <span 
                                            className={styles.date}
                                        >
                                            <CalendarDays size={15} />
                                            {formatDate(item.date)}
                                        </span>
                                    </div>
                                </article>
                            ))
                        }
                    </div>
                )
            }
        </Modal>
    );
}