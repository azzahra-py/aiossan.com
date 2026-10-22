# Panduan Eksekusi Kiro Specs (`aiossan.com` — Swiss Editorial + Tactical SaaS)

Paket spesifikasi ini dirancang mengikuti standar resmi **Kiro Spec-Driven Development (`kiro.dev`)** dan dioptimalkan khusus agar **Model LLM Tier Menengah** (seperti *Gemini 2.5/3 Flash*, *Claude Haiku/Sonnet*, *DeepSeek V3*, *Qwen 2.5 Coder 32B*, atau *GPT-4o-mini*) dapat membangun ulang seluruh platform `aiossan.com` dari **Nol (hanya bermodalkan folder `./books/`)** sampai siap produksi **tanpa halusinasi**.

---

## 1. Struktur Direktori Paket Ini

```text
aiossan.com/
├── books/                                              # (Sudah ada di PC kamu — 9 file naskah Markdown)
│   ├── en/{book-1,book-2,book-3}.md
│   └── id/{casual,standar}/{book-1,book-2,book-3}.md
├── AGENTS.md                                           # Guardrails utama untuk Agent CLI / OpenCode / Cursor
├── KIRO-EXECUTION-GUIDE.md                             # Panduan ini
└── .kiro/
    ├── steering/                                       # Konteks global otomatis Kiro (inclusion: always)
    │   ├── 00-anti-hallucination-guardrails.md         # Aturan ketat pencegahan halusinasi model menengah
    │   ├── product.md                                  # Konteks bisnis, katalog 3 buku, 3 bahasa, 6 tier harga
    │   ├── tech.md                                     # Stack teknologi, versi paket npm, & environment variables
    │   ├── structure.md                                # Kontrak struktur file & path import (@/*)
    │   └── swiss-editorial-design-system.md            # Spesifikasi visual Swiss Editorial + Tactical SaaS
    └── specs/                                          # 6 Modul Spesifikasi Berurutan (Requirements -> Design -> Tasks)
        ├── 01-project-scaffold-and-swiss-design/
        │   ├── requirements.md
        │   ├── design.md
        │   └── tasks.md
        ├── 02-automated-illustration-and-cover-generator/
        │   ├── requirements.md
        │   ├── design.md
        │   └── tasks.md
        ├── 03-markdown-parser-and-reader-engine/
        │   ├── requirements.md
        │   ├── design.md
        │   └── tasks.md
        ├── 04-supabase-auth-db-and-entitlements/
        │   ├── requirements.md
        │   ├── design.md
        │   └── tasks.md
        ├── 05-mayar-checkout-webhook-and-r2-pdf/
        │   ├── requirements.md
        │   ├── design.md
        │   └── tasks.md
        └── 06-swiss-editorial-landing-reader-and-dashboard/
            ├── requirements.md
            ├── design.md
            └── tasks.md
```

---

## 2. Cara Menjalankan dari Kondisi Hanya Punya Folder `./books/`

### Langkah 1: Siapkan Folder Bersih
1. Buat folder kerja baru (misalnya `aiossan-swiss/`) atau bersihkan folder lama hingga **hanya menyisakan folder `./books/`** (dan `.env.local` jika sudah ada).
2. Ekstrak seluruh isi `aiossan-kiro-specs-swiss-editorial.zip` ke dalam root folder tersebut sehingga terbentuk `.kiro/`, `AGENTS.md`, dan `KIRO-EXECUTION-GUIDE.md` sejajar dengan `./books/`.

### Langkah 2: Jika Menggunakan Kiro IDE (`kiro.dev`)
1. Buka folder project di **Kiro IDE**.
2. Kiro akan otomatis mendeteksi seluruh file di `.kiro/steering/*.md` dan memuat semua 6 fitur di panel **Specs**.
3. Buka `.kiro/specs/01-project-scaffold-and-swiss-design/tasks.md`, lalu klik **"Start Task"** mulai dari Task 1 secara berurutan hingga Spec `06`.

### Langkah 3: Jika Menggunakan OpenCode / Cursor / Windsurf / Claude Code (Model Tier Menengah)
Berikan **Prompt Master** berikut ke agent LLM kamu (cukup jalankan per Spec agar konteks model tier menengah tetap segar dan akurat):

```text
Baca AGENTS.md dan seluruh file di .kiro/steering/.
Sekarang kerjakan HANYA .kiro/specs/01-project-scaffold-and-swiss-design/:
1. Baca requirements.md, design.md, dan tasks.md di folder spec tersebut.
2. Eksekusi tasks.md satu checkbox demi satu checkbox secara berurutan.
3. Salin kode dari design.md secara utuh (dilarang menyingkat kode dengan komentar TODO).
4. Jalankan perintah Verification di setiap task sebelum mencentang [x] di tasks.md.
5. Jangan pernah membaca isi penuh file di dalam folder ./books/.
```
Setelah Spec `01` selesai, ulangi prompt yang sama untuk Spec `02`, `03`, `04`, `05`, dan `06`.

---

## 3. Cara Kerja Generator Ilustrasi & Cover Buku (Spec 02)

Di dalam `.kiro/specs/02-automated-illustration-and-cover-generator/`, LLM diinstruksikan membangun **2 lapis sistem visual sekaligus**:
1. **Generator Ilustrasi Vektor & Sampul Buku Otomatis (`scripts/generate-illustrations.ts`):**
   - Menghasilkan **45 file SVG ilustrasi bab bergaya *Swiss Editorial Technical Blueprint*** (`public/illustrations/book-{1..3}/ch-{0..14}.svg`) lengkap dengan grid isometrik, diagram skematik, lencana nomor bab, dan ikon tematik tiap bab.
   - Menghasilkan **9 file SVG sampul buku bergaya *Stripe Press / A Book Apart*** (`public/covers/{bookId}-{lang}.svg`) untuk 3 buku × 3 bahasa.
   - Dijamin **0 error 404** meskipun kamu belum menggunakan API gambar berbayar.
2. **Generator Ilustrasi AI Opsional (`scripts/generate-ai-illustrations.ts` + Manifest 45 Prompt):**
   - Menyediakan 45 prompt gambar berstandar *Swiss Editorial Risograph Illustration* dan skrip otomatis yang bisa memanggil API Gemini Imagen / OpenAI / Fal.ai jika sewaktu-waktu kamu memasukkan API Key untuk me-render versi `.webp` artistik.
