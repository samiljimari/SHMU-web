#!/bin/bash
# Quick update script for publishing results during live event

echo "🏆 Športové hry SHMÚ - Publikácia výsledkov"
echo "=========================================="
echo ""

# Check if data.json exists in Downloads
if [ -f ~/Downloads/data.json ]; then
    echo "✓ Našiel som data.json v Downloads"
    cp ~/Downloads/data.json ./data.json
    rm ~/Downloads/data.json
    echo "✓ Súbor skopírovaný"
else
    echo "❌ CHYBA: data.json nebol nájdený v Downloads!"
    echo "   1. Otvorte admin panel"
    echo "   2. Kliknite 'Publikovať zmeny'"
    echo "   3. Spustite tento skript znova"
    exit 1
fi

# Git operations
echo ""
echo "📤 Nahrávam zmeny na GitHub..."
git add data.json

if git diff --cached --quiet; then
    echo "⚠️  Žiadne zmeny na publikovanie"
    exit 0
fi

TIMESTAMP=$(date '+%H:%M')
git commit -m "Update results - $TIMESTAMP"

echo ""
git push personal main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ÚSPECH! Výsledky publikované."
    echo "🌐 Zmeny sa objavia na https://samiljimari.github.io/SHMU-web/ za 1-2 minúty"
else
    echo ""
    echo "❌ Push zlyhal! Skontrolujte git nastavenia."
fi
