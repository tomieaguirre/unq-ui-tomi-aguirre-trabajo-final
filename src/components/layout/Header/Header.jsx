import { useState } from "react";
import { BarChart2, Menu, Settings, X } from "lucide-react";

import Logo from "../../branding/Logo/Logo";
import IconButton from "../../ui/IconButton/IconButton";

import { PATHS } from "../../../routes/paths";

import styles from "./Header.module.css";

export default function Header({
  onOpenRanking,
  onOpenSettings,
}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>

      <Logo
        size="small"
        layout="horizontal"
        to={PATHS.HOME}
      />

      {/* Desktop */}

      <div className={styles.desktopActions}>

        <IconButton
          icon={<BarChart2 size={20} />}
          label="Ranking"
          onClick={onOpenRanking}
        />

        <IconButton
          icon={<Settings size={20} />}
          label="Configuración"
          onClick={onOpenSettings}
        />

      </div>

      {/* Mobile */}

      <div className={styles.mobileMenu}>

        <IconButton
          icon={
            isMenuOpen
              ? <X size={22} />
              : <Menu size={22} />
          }
          label="Menú"
          onClick={() => setIsMenuOpen(open => !open)}
        />

        {isMenuOpen && (

          <div className={styles.dropdown}>

            <button
              className={styles.menuItem}
              onClick={() => {
                onOpenRanking();
                setIsMenuOpen(false);
              }}
            >
              Ranking
            </button>

            <button 
              className={styles.menuItem}
              onClick={() => {
                onOpenSettings();
                setIsMenuOpen(false);
              }}
            >
              Configuración
            </button>

          </div>

        )}

      </div>

    </header>
  );
}