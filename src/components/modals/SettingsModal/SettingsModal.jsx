import { useState } from "react";

import {
    AlertTriangle,
    Trash2,
} from "lucide-react";

import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";

import useRanking from "../../../hooks/useRanking";

import styles from "./SettingsModal.module.css";

export default function SettingsModal({
    onClose,
}) {

    const {
        resetRanking,
    } = useRanking();

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

            {

                !confirming ? (

                    <>

                        <p className={styles.description}>
                            Administrá los datos de la aplicación.
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

                )

            }

        </Modal>

    );

}