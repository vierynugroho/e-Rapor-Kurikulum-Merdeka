<!--
Catatan: Jika Anda mengalami error parsing pada file README.md, pastikan file ini tidak mengandung karakter atau sintaks yang tidak valid (misal: awalan "s" di baris pertama atau komentar yang tidak sesuai format Markdown). Jika menggunakan ESLint, pastikan juga file README.md tidak di-parse sebagai file JavaScript/TypeScript.
-->

<!-- Ini adalah proyek [Next.js](https://nextjs.org) yang di-bootstrapped dengan [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) dan telah terintegrasi dengan [Prisma](https://www.prisma.io/) sebagai ORM untuk pengelolaan database. -->

## Langkah Instalasi

1. **Clone repository ini**

    ```bash
    git clone <repository-url>
    cd <nama-folder>
    ```

2. **Install dependencies**

    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    # atau
    bun install
    ```

3. **Konfigurasi environment**

    - Salin file `.env.example` menjadi `.env` dan sesuaikan variabel database Anda, misal:
        ```
        DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
        ```
    - Pastikan database sudah tersedia.

4. **Generate Prisma Client**

    ```bash
    npm run prisma
    ```

5. **Migrasi Database**

    ```bash
    npm run db:migrate-dev
    ```

    Atau untuk push skema tanpa migrasi:

    ```bash
    npm run db:push
    ```

6. **(Opsional) Jalankan Prisma Studio**

    ```bash
    npm run db:studio
    ```

7. **Jalankan development server**

    ```bash
    npm run dev
    # atau
    yarn dev
    # atau
    pnpm dev
    # atau
    bun dev
    ```

8. **Buka aplikasi**
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Script Penting

- `npm run dev` — Menjalankan Next.js dalam mode development
- `npm run build` — Build aplikasi untuk production
- `npm run prisma` — Generate Prisma Client
- `npm run db:migrate-dev` — Migrasi database (development)
- `npm run db:studio` — Membuka Prisma Studio (GUI database)
- `npm run db:reset` — Reset database dan migrasi ulang

## Sumber Belajar

- [Dokumentasi Next.js](https://nextjs.org/docs)
- [Dokumentasi Prisma](https://www.prisma.io/docs)

## Deployment

Aplikasi ini dapat dideploy di [Vercel](https://vercel.com/) atau platform lain yang mendukung Next.js dan akses ke database.

Pastikan environment variable `DATABASE_URL` sudah diatur dengan benar pada environment production Anda.
