# Workflow pre živé ukladanie výsledkov počas podujatia

## Príprava pred podujatím

1. **Naklonujte repozitár na notebook, ktorý bude na podujatí:**
   ```bash
   git clone https://github.com/samiljimari/SHMU-web.git
   cd SHMU-web
   ```

2. **Otvorte stránku v prehliadači:**
   - Otvorte `results.html` priamo v prehliadači
   - Alebo použite live server: `python -m http.server 8000`
   - Admin panel bude fungovať plne offline v prehliadači

## Počas podujatia - Aktualizácia výsledkov

### Krok 1: Pridajte výsledky
1. Kliknite na **Admin** tlačidlo (heslo: `SHMU2026admin!`)
2. Pridajte tímy (ak ešte nie sú)
3. Pridajte výsledky zápasov
4. Zmeny sa ukladajú automaticky v prehliadači (localStorage)

### Krok 2: Publikujte na web (každých 10-15 minút)
1. V admin paneli → záložka **Nastavenia**
2. Kliknite **"Publikovať zmeny"**
3. Stiahne sa súbor `data.json`
4. Nahraďte starý `data.json` v projekte týmto novým

### Krok 3: Push na GitHub
```bash
git add data.json
git commit -m "Update results - [aktuálny čas/šport]"
git push personal main
```

### Krok 4: Počkajte 1-2 minúty
- GitHub Pages automaticky aktualizuje stránku
- Návštevníci uvidia nové výsledky

## Rýchly skript pre publikáciu

Vytvorte súbor `update.sh` (alebo `update.bat` na Windows):

```bash
#!/bin/bash
# Skopírujte stiahnutý data.json do projektu
cp ~/Downloads/data.json ./data.json

# Commit a push
git add data.json
git commit -m "Update results - $(date '+%H:%M')"
git push personal main

echo "✅ Výsledky publikované! Zmeny sa objavia za 1-2 minúty."
```

**Použitie:**
1. Publikujte zmeny z admin panelu → stiahne sa `data.json`
2. Spustite: `./update.sh`
3. Hotovo!

## Alternatíva: Ručná editácia

Ak admin panel nefunguje, môžete upraviť `data.json` ručne:

```json
{
  "teams": [
    {
      "name": "Tím A",
      "organization": "SHMÚ",
      "members": ["Hráč 1", "Hráč 2"]
    }
  ],
  "matches": [
    {
      "sport": "futbal",
      "team1": "Tím A",
      "team2": "Tím B",
      "score1": 3,
      "score2": 1,
      "date": "2026-01-30"
    }
  ],
  "lastUpdated": 1738250000000
}
```

Potom commit a push ako zvyčajne.

## Riešenie problémov

**Admin panel nefunguje**
- Skontrolujte heslo: `SHMU2026admin!`
- Otvorte Developer Tools (F12) → Console pre chyby
- Vyskúšajte iný prehliadač

**data.json sa neaktualizuje na GitHub Pages**
- Počkajte 5 minút (niekedy trvá dlhšie)
- Skontrolujte či push prešiel: `git log`
- Vyčistite cache prehliadača: Ctrl+Shift+R

**Stratili ste zmeny**
- Zmeny sú v prehliadači (localStorage)
- Publikujte znova cez "Publikovať zmeny"
- Alebo použite: Developer Tools → Application → Local Storage → skopírujte údaje

## Best Practices

✅ **Publikujte často** - každých 10-15 minút počas podujatia  
✅ **Testujte pred podujatím** - vyskúšajte celý workflow  
✅ **Majte zálohu** - uložte data.json pred začatím podujatia  
✅ **Používajte dobré commit správy** - napr. "Update: Futbal final results"  
✅ **Skontrolujte živú stránku** - po každom push overte zmeny  
