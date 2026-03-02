# 🆘 Noodalarm Systeem — Setup Handleiding

## Wat zit er in dit project?

| Bestand | Waarvoor |
|---|---|
| `sender.html` | De alarmknop pagina — deel deze link met anderen |
| `receiver.html` | Jouw alarm-app — installeer dit op jouw Android telefoon |
| `manifest.json` | Maakt `receiver.html` installeerbaar als app |
| `sw.js` | Achtergrond-ondersteuning voor de app |

---

## STAP 1 — Gratis Firebase project aanmaken

Firebase is de brug tussen de alarmknop en jouw telefoon. Het is gratis.

1. Ga naar: **https://console.firebase.google.com/**
2. Klik op **"Project toevoegen"**
3. Geef je project een naam, bijv. `mijn-noodalarm`
4. Schakel Google Analytics **uit** (niet nodig)
5. Klik op **"Project maken"**

---

## STAP 2 — Realtime Database inschakelen

1. Klik in de linkerzijbalk op **"Build" → "Realtime Database"**
2. Klik op **"Database aanmaken"**
3. Kies een locatie (bijv. `europe-west1`)
4. Kies **"Starten in testmodus"** ← belangrijk!
5. Klik op **"Inschakelen"**

---

## STAP 3 — Firebase configuratie kopiëren

1. Klik linksboven op het tandwiel ⚙️ naast "Project Overview"
2. Klik op **"Projectinstellingen"**
3. Scroll naar beneden naar **"Jouw apps"**
4. Klik op het **`</>`** (web) icoontje
5. Geef de app een naam (bijv. `alarm-app`) en klik op **"App registreren"**
6. Je ziet nu een stukje code met **`firebaseConfig = { ... }`** — kopieer dit!

---

## STAP 4 — Configuratie invullen in de bestanden

Open **`sender.html`** en **`receiver.html`** in een teksteditor (Kladblok, VS Code, etc.)

Zoek deze sectie in **beide** bestanden:
```javascript
const firebaseConfig = {
  apiKey: "JOUW_API_KEY",
  authDomain: "JOUW_PROJECT.firebaseapp.com",
  ...
};
```

Vervang de hele `firebaseConfig = { }` met de gegevens die je in Stap 3 gekopieerd hebt. Sla beide bestanden op.

---

## STAP 5 — Gratis hosting instellen met Netlify

1. Ga naar: **https://app.netlify.com/**
2. Maak een gratis account aan (kan met Google)
3. Klik op **"Add new site" → "Deploy manually"**
4. Sleep de **hele map `sos-alarm`** naar het grijze vlak
5. Netlify geeft je een link zoals: `https://magische-naam-123.netlify.app`

Dat is alles! Jouw site is nu online.

---

## STAP 6 — Receiver installeren als Android app

1. Open **Chrome** op jouw Android telefoon
2. Ga naar: `https://jouw-naam.netlify.app/receiver.html`
3. Tik op de **drie puntjes** rechtsboven in Chrome
4. Kies **"Toevoegen aan startscherm"** of **"App installeren"**
5. De app verschijnt nu als echt app-icoontje op jouw startscherm!

> ⚠️ **Belangrijk:** Zet je telefoon op **max volume** en laat de app geopend (of op de achtergrond). Zo hoor je het alarm zeker.

---

## STAP 7 — Alarmknop delen

Deel de volgende link met de persoon die jou moet kunnen waarschuwen:

```
https://jouw-naam.netlify.app/sender.html
```

Dat is het! Wanneer zij op de grote rode SOS-knop drukken, gaat er op jouw telefoon een luid alarm af.

---

## Hoe werkt het?

```
Persoon drukt op SOS knop (sender.html)
        ↓
Firebase Realtime Database wordt bijgewerkt
        ↓
Jouw ontvanger-app (receiver.html) detecteert de wijziging
        ↓
Luid SOS-alarm (. . . — — — . . .) klinkt op jouw telefoon
```

---

## Problemen?

| Probleem | Oplossing |
|---|---|
| Geen alarm hoorbaar | Controleer of volume op max staat. Tik kort op het scherm van de receiver-app om audio te activeren. |
| "Firebase niet geconfigureerd" | Controleer of je de firebaseConfig correct hebt ingevuld in BEIDE bestanden |
| App werkt niet na herstart | Zet de Netlify database regels op testmodus (zie Stap 2) |
| Alarm gaat niet af | Controleer of de Realtime Database is ingeschakeld (Stap 2) |
