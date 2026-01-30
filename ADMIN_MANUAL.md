# Admin Panel - Návod na použitie

## Prístupové údaje

**Heslo:** `SHMU2026admin!`

⚠️ **Dôležité:** Toto heslo zdieľajte iba s poverenou osobou, ktorá má spravovať výsledky.

## Ako sa prihlásiť

1. Otvorte stránku `results.html`
2. V pravom hornom rohu kliknite na tlačidlo **"Admin"**
3. Zadajte heslo: `SHMU2026admin!`
4. Kliknite na **"Prihlásiť"**

## Základný pracovný postup

1. **Najprv pridajte tímy** (záložka "Tímy")
2. **Potom zadávajte výsledky zápasov** (záložka "Zápasy")
3. **Tabuľky a celkové poradie sa aktualizujú automaticky**

---

## 1. Správa tímov (záložka "Tímy")

### Pridanie tímu

1. V záložke **"Tímy"** vyplňte formulár:
   - **Názov tímu:** napr. "SHMÚ Bratislava", "ČHMÚ Praha"
   - **Organizácia:** vyberte SHMÚ alebo ČHMÚ
   - **Členovia tímu:** zadajte mená členov oddelené čiarkami
     - Príklad: `Jozef Novák, Peter Kováč, Mária Veľká`

2. Kliknite na **"Pridať tím"**

### Vymazanie tímu

- V zozname registrovaných tímov kliknite na tlačidlo **"Vymazať"** pri príslušnom tíme
- Pozor: Toto nevymaže výsledky zápasov tohto tímu

---

## 2. Zadávanie zápasov (záložka "Zápasy")

### Týmové športy (Futbal, Volejbal)

1. Vyberte šport z rozbaľovacieho menu
2. Formulár sa automaticky prispôsobí
3. Vyplňte:
   - **Dátum** (voliteľné)
   - **Tím 1** - vyberte z registrovaných tímov
   - **Tím 2** - vyberte z registrovaných tímov
   - **Skóre tímu 1** - zadajte počet gólov/setov
   - **Skóre tímu 2** - zadajte počet gólov/setov
   - **Detaily** (voliteľné) - napr. "(3:1 sety)" alebo "(4:3 pen.)"

4. Kliknite na **"Uložiť zápas"**

**Príklad - Futbal:**
- Tím 1: SHMÚ Bratislava
- Skóre tímu 1: 3
- Tím 2: ČHMÚ Praha
- Skóre tímu 2: 1
- Detaily: (alebo 2:2 (4:3 pen.) pre penaltový rozstrel)

**Príklad - Volejbal:**
- Tím 1: SHMÚ Košice
- Skóre tímu 1: 3
- Tím 2: ČHMÚ Brno
- Skóre tímu 2: 1
- Detaily: (25:20, 23:25, 25:18, 25:22)

### Individuálne športy (Stolný tenis, Bedminton, Beh)

1. Vyberte šport
2. Vyplňte:
   - **Dátum** (voliteľné)
   - **Meno účastníka:** meno a priezvisko
   - **Organizácia:** SHMÚ alebo ČHMÚ
   - **Výsledok:**
     - Pre tenis/badminton: `3:2 (11:7, 9:11, 11:9, 8:11, 11:6)`
     - Pre beh: `12.5s` alebo `1:23.45`

3. Kliknite na **"Uložiť zápas"**

### Vymazanie zápasu

- V zozname evidovaných zápasov kliknite na ikonu **odpadkového koša**
- Tabuľky sa automaticky prepočítajú

---

## 3. Automatické výpočty

### Tabuľky týmových športov

Pre každý tím sa automaticky počítajú:
- **Z** - Počet odohraných zápasov
- **V** - Výhry
- **R** - Remízy (iba futbal)
- **P** - Prehry
- **Skóre** - Góly/sety vstrelené : inkasované
- **+/-** - Rozdiel skóre
- **Body** - Celkový počet bodov

**Bodovanie:**
- **Futbal:** Výhra = 3 body, Remíza = 1 bod, Prehra = 0 bodov
- **Volejbal:** Výhra = 2 body, Prehra = 0 bodov

**Zoradenie:**
1. Podľa počtu bodov (zostupne)
2. Pri rovnosti bodov - podľa rozdielu skóre
3. Pri rovnosti rozdielu - podľa vstrelených gólov/setov

### Celkové poradie organizácií

Celkové poradie SHMÚ vs. ČHMÚ sa počíta automaticky:
- 🥇 **Zlato** (1. miesto): 3 body
- 🥈 **Striebro** (2. miesto): 2 body
- 🥉 **Bronz** (3. miesto): 1 bod

Poradie je zoradené podľa:
1. Celkový počet bodov
2. Pri rovnosti bodov - počet zlatých medailí
3. Pri rovnosti zlatých - počet strieborných medailí
4. Pri rovnosti strieborných - počet bronzových medailí

---

## 4. Nastavenia a správa (záložka "Nastavenia")

### Štatistiky
Zobrazujú sa:
- Počet registrovaných tímov
- Počet zaznamenaných zápasov

### Vymazanie všetkých dát
⚠️ **NEBEZPEČNÁ ZÓNA:**
- Tlačidlo na vymazanie všetkých tímov, zápasov a výsledkov
- Táto akcia je **nezvratná**!
- Používajte iba v prípade potreby kompletného resetu

---

## Odhlásenie

Pre odhlásenie z admin panelu použijte klávesovú skratku:
**Ctrl + Shift + L**

---

## Uloženie dát

- Všetky výsledky sú uložené v **prehliadači** (localStorage)
- Dáta zostanú zachované aj po zatvorení stránky
- Dáta sú uložené **lokálne**, nie na serveri
- Pri vymazaní dát prehliadača sa výsledky stratia
- **Backup:** Pre zálohu dát použite export/import funkciu prehliadača alebo prekopírujte localStorage

---

## Bezpečnosť

- Heslo je uložené priamo v kóde súboru `results-admin.js`
- Pre zmenu hesla upravte konštantu `ADMIN_PASSWORD` na riadku 3
- Prihlásenie je platné iba počas aktívneho sedenia (do zatvorenia prehliadača)

---

## Riešenie problémov

### Výsledky sa nezobrazujú
- Obnovte stránku (F5)
- Skontrolujte, či je JavaScript povolený v prehliadači
- Skontrolujte konzolu prehliadača (F12) pre chybové hlásenia

### Tímy sa nezobrazujú v rozbaľovacom menu
- Najprv pridajte tímy v záložke "Tímy"
- Obnovte stránku
- Skontrolujte, či ste vyplnili všetky povinné polia pri pridávaní tímu

### Tabuľka sa nezobrazuje správne
- Uistite sa, že máte zadané aspoň 2 zápasy
- Skontrolujte, či sú tímy správne priradené k zápasu
- Obnovte stránku (F5)

### Zabudnuté heslo
- Heslo je: `SHMU2026admin!`
- Pre zmenu hesla upravte súbor `js/results-admin.js`

### Vymazanie všetkých dát
Ak chcete vymazať všetky uložené výsledky:
1. Otvorte Vývojárske nástroje (F12)
2. Prejdite na záložku **Console**
3. Zadajte: 
   ```javascript
   localStorage.removeItem('sportsTeams');
   localStorage.removeItem('sportsMatches');
   ```
4. Stlačte Enter
5. Obnovte stránku

---

## Príklady pracovných postupov

### Príklad 1: Turnaj vo futbale

1. Pridajte 4 tímy v záložke "Tímy"
2. Prejdite do záložky "Zápasy"
3. Zadajte výsledky všetkých zápasov:
   - SHMÚ BA vs. SHMÚ KE: 2:1
   - ČHMÚ PR vs. ČHMÚ BR: 3:0
   - SHMÚ BA vs. ČHMÚ PR: 1:1
   - SHMÚ KE vs. ČHMÚ BR: 0:2
   - atď.
4. Tabuľka sa automaticky aktualizuje po každom zápase
5. Celkové poradie organizácií sa prepočíta automaticky

### Príklad 2: Individuálny šport (Beh)

1. Nepotrebujete pridávať tímy
2. Prejdite do záložky "Zápasy"
3. Vyberte "Beh"
4. Zadajte každého účastníka zvlášť:
   - Meno: Jozef Novák
   - Organizácia: SHMÚ
   - Výsledok: 12.5s
5. Výsledky sa automaticky zoradia od najlepšieho času

---

## Podpora

Pre technickú podporu alebo otázky kontaktujte administrátora webu.
