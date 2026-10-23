#!/usr/bin/env bash
# Gunakan skrip ini di terminal untuk mendaftarkan dan menguji webhook Mayar
# Sesuai panduan mayar-cli (https://github.com/mayarid/mayar-cli/blob/main/SKILL.md)

echo "=== Mayar Admin Helper Script ==="
echo ""

echo "1. Cek status identitas merchant Mayar..."
npx -y mayar@latest whoami --json
echo ""

echo "2. Daftarkan URL Webhook Produksi..."
npx -y mayar@latest webhook register https://aiossan.com/api/webhooks/mayar
echo ""

echo "3. Kirim ping test ke Webhook..."
npx -y mayar@latest webhook test https://aiossan.com/api/webhooks/mayar
echo ""

echo "Selesai."
