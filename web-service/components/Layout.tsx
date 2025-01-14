import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./css/Layout.module.scss";
import { OsPreferredTheme, useTheme } from "./ThemeProvider";

import uiLightImage from "../public/assets/ui_light.svg";
import uiDarkImage from "../public/assets/ui_dark.svg";
import uiSystemPreferenceImage from "../public/assets/ui_system_preference.svg";

export default function Layout(props: { children: React.ReactNode }) {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isSettingsDisplay, setSettingsDisplay] = useState(false);

  const themeContext = useTheme();
  const currentAppTheme = themeContext.theme;
  const setCurrentAppTheme = themeContext.setTheme;
  const osPreferredTheme = themeContext.osPreferredTheme;

  // Contains the currently selected theme
  const [selectedTheme, setSelectedTheme] = useState(currentAppTheme);

  // currentAppTheme is originally null
  // Set the selected theme to currentAppTheme when the value is loaded
  useEffect(() => {
    setSelectedTheme(currentAppTheme);
  }, [currentAppTheme]);

  const SETTINGS_ANIMATION_LENGTH = 200;

  function changeSettingsState(openState: boolean) {
    if (openState) {
      setTimeout(() => {
        setSettingsOpen(openState);
      }, SETTINGS_ANIMATION_LENGTH);
      setSettingsDisplay(openState);
    } else {
      setTimeout(() => {
        setSettingsDisplay(openState);
      }, SETTINGS_ANIMATION_LENGTH);
      setSettingsOpen(openState);
    }
  }

  function onThemeChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedTheme(e.target.value);
  }

  function onSettingsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const preferences = new UserPreferences();

    // Save theme theme to localStorage
    // preferences.setTheme(selectedTheme);

    // Update the app to the new theme
    setCurrentAppTheme(selectedTheme);

    changeSettingsState(false);
  }
  function onSettingsCancel() {
    // Reset all settings here to the original state
    // setSelectedTheme(currentAppTheme);

    changeSettingsState(false);
  }

  return (
    <>
      {/* <ThemeProvider key={currentAppTheme} theme={currentAppTheme} /> */}
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Link href="/" className={styles["logo-link"]}><h1 className={styles.logo}>Safka.<br />Online</h1></Link>
          <button onClick={() => changeSettingsState(!isSettingsOpen)} className={styles["settings-btn"] + " material-symbols-outlined"}>settings</button>
        </div>
        <div className={styles.content}>
          {props.children}
        </div>
        <Footer />
      </div>

      <div className={styles["preferences-container"]} onClick={e => {
        if (e.target === e.currentTarget) {
          onSettingsCancel();
        }
      }} style={{
        display: isSettingsDisplay ? "flex" : "none",
        opacity: isSettingsOpen ? 1 : 0
      }}>
        <form onSubmit={onSettingsSubmit} className={styles.preferences} style={{ transform: `scale(${isSettingsOpen ? 1 : 0})` }}>
          <div className={styles["preferences-content"]}>
            <h2 style={{marginTop: 0}}>Käyttäjän Asetukset</h2>
            <hr style={{width: "10em"}} />
            <h3>Teema</h3>
            <p className="on-background-slight-color">Mukauta käyttöliittymän ulkonäköä</p>
            <div className={styles["theme-select"]}>
              <label className={`${styles["theme-select-block"]} ${selectedTheme == "os" ? styles["theme-select-block-checked"] : ""}`}>
                <div className={styles["theme-select-preview"]} style={{backgroundImage: `url(${uiSystemPreferenceImage.src})`}}>
                  <input type="radio" value={"os"} checked={selectedTheme == "os"} onChange={onThemeChanged} className="material-symbols-outlined" />
                </div>
                <span>Järjestelmän Oletus <strong className={styles["default-theme"]}>({osPreferredTheme == OsPreferredTheme.Light ? "Vaalea" : "Tumma"})</strong></span>
                
              </label>
              <label className={`${styles["theme-select-block"]} ${selectedTheme == "light" ? styles["theme-select-block-checked"] : ""}`}>
                <div className={styles["theme-select-preview"]} style={{backgroundImage: `url(${uiLightImage.src})`}}>
                  <input type="radio" value={"light"} checked={selectedTheme == "light"} onChange={onThemeChanged} className="material-symbols-outlined" />
                </div>
                <span>Vaalea Teema</span>
              </label>
              <label className={`${styles["theme-select-block"]} ${selectedTheme == "dark" ? styles["theme-select-block-checked"] : ""}`}>
                <div className={styles["theme-select-preview"]} style={{backgroundImage: `url(${uiDarkImage.src})`}}>
                  <input type="radio" value={"dark"} checked={selectedTheme == "dark"} onChange={onThemeChanged} className="material-symbols-outlined" />
                </div>
                <span>Tumma Teema</span>
              </label>
            </div>
            {/* <hr style={{width: "10em"}} />
            <h3>Tekniset Tiedot</h3>
            <p className="on-background-slight-color">Ohjelmiston tekniset tiedot</p>
            <p className="on-background-slight-color">{process.env.BUILD_ID}</p>
            <h3>Erityisruokavaliot</h3>
            <p className="on-background-slight-color">Näät vain ruuat joilla nämä erityisruokavaliot</p>
            <div className={styles["diet-chips"]}>
              <DietChip>Laktoositon</DietChip>
              <DietChip>Gluteeniton</DietChip>
              <DietChip>Maidoton</DietChip>
            </div> */}
          </div>
          <div className={styles["preferences-bottom-bar"]}>
            <input className={styles["preferences-bottom-btn"]} onClick={onSettingsCancel} type="button" value="Peruuta" />
            <input className={styles["preferences-bottom-btn"]} type="submit" value="Tallenna" />
          </div>
        </form>
      </div>

    </>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={styles["footer-header"]}>Resources</h3>
      <ul className={styles["footer-links"]}>
        <li><FooterLink href={process.env.API_URL || "https://api.safka.online/v1/menu"}>API</FooterLink></li>
        <li><FooterLink href="https://www.turkuai.fi/turun-ammatti-instituutti/opiskelijalle/ruokailu-ja-ruokalistat/ruokalista-juhannuskukkula-topseli">Data Source</FooterLink></li>

      </ul>
      <h3 className={styles["footer-header"]}>Open Source</h3>
      <ul className={styles["footer-links"]}>
        <li><FooterLink href="https://github.com/Tembero11/Safka/tree/main/api-service">API</FooterLink></li>
        <li><FooterLink href="https://github.com/Tembero11/Safka/tree/main/web-service">Web</FooterLink></li>
      </ul>
    </footer>
  );
}

function FooterLink(props: { href: string, children: string }) {
  return <a className={styles.link} href={props.href} target="_blank" rel="noreferrer">{props.children} <span className="material-symbols-outlined">open_in_new</span></a>
}


function DietChip(props: { children: React.ReactNode, isActive?: boolean }) {
  return (
    <div className={styles["diet-chip"]}>{props.children}</div>
  )
}
