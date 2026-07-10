import {
    CircleCheckBig,
    TriangleAlert,
    Info,
} from "lucide-react";

import styles from "./LastPlay.module.css";

const errorMessages = {
    'not-found': 'No existe en el diccionario',
    'duplicated': 'Ya usaste esa palabra',
    'invalid-chain': 'No encadena correctamente',
};

export default function LastPlay({ play }) {
    const variants = {
        success: {
            icon: CircleCheckBig,
            className: styles.success,
        },
        error: {
            icon: TriangleAlert,
            className: styles.error,
        },
        info: {
            icon: Info,
            className: styles.info,
        },
    };

    const current = variants[play.type] ?? variants.info;
    const Icon = current.icon;

    let displayMessage = play.message;
    if (play.type === 'error' && errorMessages[play.message]) {
        displayMessage = errorMessages[play.message];
    }

    return (
        <section className={`${styles.container} ${current.className}`}>
            <div className={styles.iconWrapper}>
                <Icon size={24} strokeWidth={2.4} />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{play.title}</h3>
                <p className={styles.message}>
                    {displayMessage}
                    {play.points > 0 && (
                        <> (+{play.points} puntos)</>
                    )}
                </p>
            </div>

        </section>
    );
}