# Sixty — iOS-app (Capacitor)

Detta är den native iOS-inpackningen av Sixty-appen, byggd med [Capacitor](https://capacitorjs.com).
Ursprungsfilerna (`index.html`, `index mobile.html` i mappen ovanför) är **inte** ändrade —
`www/index.html` här är en fristående kopia anpassad för att köras som native app.

Se den fullständiga planen: `C:\Users\marti\.claude\plans\vad-beh-ver-g-ras-f-r-tingly-starfish.md`

## Vad som redan är klart

- Capacitor-projekt initierat, iOS-plattform tillagd (`ios/` — ett komplett Xcode-projekt).
- Export använder native dela-funktion (`@capacitor/filesystem` + `@capacitor/share`) på iOS,
  med webbläsarens `<a download>` som fallback när du testar filen i en vanlig webbläsare.
- Typsnitten (Caprasimo, Figtree) är nedladdade och buntas lokalt i `www/fonts/` —
  appen kräver inte internet för att visa rätt typsnitt.
- Skärmorientering låst till stående läge (`ios/App/App/Info.plist`).
- App-ikon och startskärm genererade i alla storlekar Apple kräver, från `www/icon.svg`
  (källfiler i `resources/`, genererade via `scripts/make-assets.js` + `@capacitor/assets`).
- `codemagic.yaml` förberedd för molnbygge (se nedan).
- Git-repo initierat med en första commit.

## Vad som återstår (kräver dina egna konton — kan inte göras åt dig)

1. **Apple Developer Program** (developer.apple.com/programs, 99 USD/år).
2. **Sekretesspolicy-URL** — texten kan vara enkel eftersom appen inte samlar in någon data.
3. Skapa **GitHub-repo** och pusha detta projekt dit: `git remote add origin <url> && git push -u origin main`.
4. Skapa konto på **Codemagic** (codemagic.io), koppla GitHub-repot.
5. I Codemagic: lägg till en **App Store Connect API-nyckel**-integration (namnge den
   `sixty_app_store_connect` så att den matchar `codemagic.yaml`), och skapa variabelgruppen
   `sixty_ios` med `BUNDLE_ID=se.officedays.sixty` (byt om du väljer ett annat bundle-ID).
6. Skapa appen i **App Store Connect** med samma Bundle ID.
7. Kör workflow "Sixty iOS Release" i Codemagic → bygger och skickar automatiskt till TestFlight.
8. Testa på din iPhone via TestFlight-appen.
9. Fyll i App Store-listan (skärmdumpar, beskrivning, sekretessfrågor, åldersgräns) i App Store Connect.
10. Sätt `submit_to_app_store: true` i `codemagic.yaml` när du är redo att skicka in för granskning.

## Vanliga kommandon (körs i denna mapp)

```bash
npm run sync        # bygger capacitor-bundle.js och synkar www/ till ios/-projektet
node scripts/make-assets.js && npx capacitor-assets generate --ios   # regenerera ikoner/splash om icon.svg ändras
```

## Bundle-ID

Satt till `se.officedays.sixty` i `capacitor.config.json`. Ändra det **innan** du registrerar
App ID:t hos Apple om du vill ha ett annat.
