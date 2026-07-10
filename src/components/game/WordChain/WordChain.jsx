import { useEffect, useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

import WordCard from "../WordCard/WordCard";

import styles from "./WordChain.module.css";

export default function WordChain({ words }) {
    const listRef = useRef(null);

    useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [words]);

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>
                Cadena de palabras
            </h2>

            <div
                ref={listRef}
                className={styles.listWrapper}
            >
                {words.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>La cadena aparecerá aquí.</p>
                        <span>Ingresa la primera palabra.</span>
                    </div>
                ) : (
                    <div className={styles.list}>
                        {words.map((item, index) => (
                            <div
                                key={item.id}
                                className={styles.step}
                            >
                                {index !== 0 && (
                                    <>
                                        <ArrowRight
                                            className={styles.arrowDesktop}
                                            size={22}
                                        />
                                        <ArrowDown
                                            className={styles.arrowMobile}
                                            size={22}
                                        />
                                    </>
                                )}

                                <WordCard
                                    word={item.word}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}