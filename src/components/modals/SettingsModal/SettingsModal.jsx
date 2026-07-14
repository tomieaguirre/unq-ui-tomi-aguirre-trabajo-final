import { useState } from "react";

import {
    AlertTriangle,
    Music2,
    Trash2,
} from "lucide-react";

import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";

import useRanking from "../../../hooks/useRanking";
import useSettings from "../../../hooks/useSettings";

import styles from "./SettingsModal.module.css";

export default function SettingsModal({
    onClose,
}) {

    const {
        resetRanking,
    } = useRanking();

    const {
        settings,
        save,
    } = useSettings();

    const [confirming, setConfirming] = useState(false);

    const handleReset = () => {

        resetRanking();

        onClose();

    };

    return (

        <Modal
            title="Configuración"
            onClose={onClose}
        >

            {/* ============================================
                AUDIO
            ============================================ */}

            <section className={styles.section}>

                <h3 className={styles.sectionTitle}>
                    Audio
                </h3>

                {/* Música */}

                <div className={styles.setting}>

                    <div className={styles.settingHeader}>

                        <div className={styles.settingLabel}>

                            <Music2
                                size={18}
                                className={styles.settingIcon}
                            />

                            <span>Música</span>

                        </div>

                        <label className={styles.switch}>

                            <input
                                type="checkbox"
                                checked={settings.musicEnabled}
                                onChange={(event) =>
                                    save({
                                        musicEnabled: event.target.checked,
                                    })
                                }
                            />

                            <span className={styles.sliderSwitch} />

                        </label>

                    </div>

                    <input
                        className={styles.slider}
                        type="range"
                        min="0"
                        max="100"
                        value={settings.musicVolume * 100}
                        onChange={(event) => {

                            const volume =
                                Number(event.target.value) / 100;

                            save({
                                musicVolume: volume,
                                musicEnabled: volume > 0,
                            });

                        }}
                    />

                </div>

                {/* Efectos */}

                <div className={styles.setting}>

                    <div className={styles.settingHeader}>

                        <div className={styles.settingLabel}>

                            <Music2
                                size={18}
                                className={styles.settingIcon}
                            />

                            <span>Efectos</span>

                        </div>

                        <label className={styles.switch}>

                            <input
                                type="checkbox"
                                checked={settings.effectsEnabled}
                                onChange={(event) =>
                                    save({
                                        effectsEnabled:
                                            event.target.checked,
                                    })
                                }
                            />

                            <span className={styles.sliderSwitch} />

                        </label>

                    </div>

                    <input
                        className={styles.slider}
                        type="range"
                        min="0"
                        max="100"
                        value={settings.effectsVolume * 100}
                        onChange={(event) => {

                            const volume =
                                Number(event.target.value) / 100;

                            save({
                                effectsVolume: volume,
                                effectsEnabled: volume > 0,
                            });

                        }}
                    />

                </div>

            </section>

            {/* ============================================
                DATA
            ============================================ */}

            <section className={styles.section}>

                <h3 className={styles.sectionTitle}>
                    Datos
                </h3>

                {!confirming ? (

                    <>

                        <p className={styles.description}>
                            Administrá los datos almacenados de la aplicación.
                        </p>

                        <button
                            className={styles.option}
                            onClick={() => setConfirming(true)}
                        >

                            <Trash2
                                size={20}
                                className={styles.optionIcon}
                            />

                            <div>

                                <strong>
                                    Reiniciar ranking
                                </strong>

                                <span>
                                    Elimina todos los puntajes guardados.
                                </span>

                            </div>

                        </button>

                    </>

                ) : (

                    <>

                        <div className={styles.warning}>

                            <AlertTriangle
                                size={22}
                                className={styles.warningIcon}
                            />

                            <div>

                                <strong>
                                    ¿Eliminar el ranking?
                                </strong>

                                <p>
                                    Esta acción eliminará todos los puntajes y no se puede deshacer.
                                </p>

                            </div>

                        </div>

                        <div className={styles.actions}>

                            <Button
                                variant="secondary"
                                onClick={() => setConfirming(false)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant="danger"
                                onClick={handleReset}
                            >
                                Eliminar
                            </Button>

                        </div>

                    </>

                )}

            </section>

        </Modal>

    );

}