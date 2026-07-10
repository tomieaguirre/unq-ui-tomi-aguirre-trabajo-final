import {
    BookOpen,
    Clock3,
    Repeat2,
    Trophy,
} from "lucide-react";

import styles from "./HelpPanel.module.css";

const rules = [
    {
        icon: BookOpen,
        color: "green",
        text: "Forma una cadena de palabras.",
    },
    {
        icon: Clock3,
        color: "blue",
        text: "Cada palabra debe comenzar con la última letra de la anterior.",
    },
    {
        icon: Repeat2,
        color: "purple",
        text: "No se permiten palabras repetidas.",
    },
    {
        icon: Trophy,
        color: "yellow",
        text: "¡Gana puntos y consigue la cadena más larga!",
    },
];

export default function HelpPanel() {

    return (
        <section className={styles.container}>

            <h2 className={styles.title}>
                Cómo jugar
            </h2>

            <ul className={styles.list}>

                {rules.map((rule) => {

                    const Icon = rule.icon;

                    return (
                        <li
                            key={rule.text}
                            className={styles.item}
                        >

                            <div
                                className={`${styles.icon} ${styles[rule.color]}`}
                            >
                                <Icon size={18} />
                            </div>

                            <span className={styles.text}>
                                {rule.text}
                            </span>

                        </li>
                    );
                })}

            </ul>

        </section>
    );
}