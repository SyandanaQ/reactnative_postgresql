# Notes App 📒

A cross-platform note-taking application built using **React Native (Expo Router)** for the frontend and **Express.js + PostgreSQL** for the backend. Users can create, view, edit, and delete notes with data stored in a PostgreSQL database via a REST API.

---

## 📁 Project Structure

```
notes_app/
├── backend/              # Express.js backend
│   ├── .env              # Environment variables (ignored in git)
│   ├── index.js          # Main entry point
│   ├── routes/           # API routes
│   ├── controllers/      # Controller logic
│   └── db.js             # Database config and connection
└── react_native/         # React Native frontend (Expo)
    ├── .env              # Environment variables (ignored in git)
    ├── app/              # Screens and navigation
    ├── components/       # Reusable UI components
    └── assets/           # Fonts, images, etc.
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/reactnative_postgresql.git
cd reactnative_postgresql
```

### 2. Backend Setup (Express + PostgreSQL)
```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` folder:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

- Run the backend:
```bash
npm start
```

### 3. Frontend Setup (React Native + Expo)
```bash
cd ../react_native
npm install
```

- Create a `.env` file in the `react_native` folder:

```env
EXPO_PUBLIC_API_URL=http://<your-local-ip>:3001
```

> 💡 Ganti `<your-local-ip>` dengan IP address laptop kamu agar bisa diakses dari device.

- Start the Expo server:
```bash
npx expo start
```

---

## 📝 Features

- Tambah, lihat, edit, dan hapus catatan.
- Simpan catatan ke PostgreSQL via REST API.
- Desain simpel dan responsif dengan Expo Router.

---

## 🚫 .gitignore

File dan folder berikut tidak dipush ke GitHub:

```
backend/.env
react_native/.env
node_modules/
```

---

## ⚠️ Tips

- Jika kamu ganti jaringan Wi-Fi atau restart laptop, IP lokal bisa berubah.
- Cek IP address kamu dengan `ipconfig` (Windows) atau `ifconfig` (Linux/Mac).
- Bisa diatur agar IP tetap dengan fitur "Static IP" pada router.

---

## 📌 Todo

- [ ] Tambahkan autentikasi pengguna
- [ ] Tambahkan fitur pencarian dan filter catatan
- [ ] Hosting backend online agar bisa diuji lintas jaringan

---

## 📃 License

This project is for educational purposes and open to modification.
