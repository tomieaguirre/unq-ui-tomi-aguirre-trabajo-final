import {
    Clock3,
    Star,
    Trophy,
} from "lucide-react";

import StatCard from "./StatCard/StatCard";
import styles from "./StatsSection.module.css";

export default function StatsSection({
    time,
    score,
    words,
}) {
    return (
        <section className={styles.container}>
            <StatCard
                icon={<Clock3 size={28} />}
                color="colorB"
                title="Tiempo"
                value={time}
                suffix="seg"
            />
            <StatCard
                icon={<Star size={28} />}
                color="colorC"
                title="Puntaje"
                value={score}
                suffix="pts"
            />
            <StatCard
                icon={<Trophy size={28} />}
                color="colorA"
                title="Palabras"
                value={words}
                suffix="palabras"
            />
        </section>
    );
}