# 📘 Aplicație Web pentru Gestionarea Cererilor de Disertație

Această aplicație web permite gestionarea procesului de înscriere la disertație, facilitând interacțiunea dintre **studenți** și **profesori** în cadrul sesiunilor de înscriere. Platforma este implementată ca **Single Page Application (SPA)** și include funcționalități de autentificare, administrare a sesiunilor, trimiterea și procesarea cererilor, precum și upload/download de documente.

## 🚀 Funcționalități principale

### 👨‍🎓 Pentru Studenți:

- Vizualizarea sesiunilor de înscriere disponibile
- Trimiterea de cereri preliminare către profesori
- Posibilitatea de a trimite cereri către mai mulți profesori
- Upload de fișiere după aprobarea cererii (cerere semnată)
- Reîncărcarea fișierului în caz de respingere
- Vizualizarea statusului cererilor: **Trimisă**, **Aprobată**, **Respinsă**, **Fișier încărcat**

### 👨‍🏫 Pentru Profesori:

- Crearea, editarea și ștergerea sesiunilor de înscriere
- Gestionarea cererilor primite
- Aprobare sau respingere (cu justificare) în limita numărului prestabilit de locuri
- Upload de fișier ca răspuns final la cererea studentului
- Validare automată a suprapunerilor între sesiuni

---

## 📂 Structura proiectului

#### 🔧 Coming Soon...

## 🛠️ Tehnologii

- **Frontend**: React
- **Backend**: Node.js
- **Bază de date**: PostgreSQL / MySQL
- **Autentificare**: JWT
- **Stocare fișiere**: cloud (AWS)
- **Containerizare**: Docker

---

## 🔧 Instalare & Rulare

**Structură proiect:**

- `backend/` - server Express + MongoDB
- `dissertation-registration/` - aplicație SPA client (React)

**1. Instalare dependențe**

- Backend:

```
cd backend
npm install
```

- Frontend:

```
cd dissertation-registration
npm install
```

**2. Configurare variabile de mediu**

- Creează un fișier `.env` în `backend/` :

```
# Exemplu backend/.env
PORT=5000
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
JWT_SECRET=secretul_meu_super_sigur_pentru_licenta

# sau folosește variabile separate (dacă codul suportă):
# user=<USERNAME>
# password=<PASSWORD>
# DB_NAME=<DB_NAME>
```

- Înlocuiește `<USERNAME>`, `<PASSWORD>`, `<CLUSTER>` și `<DB_NAME>` cu valorile tale.
- Dacă folosești caractere speciale în parolă, escape/URL-encode-le corespunzător.

**3. Pornire backend**

- În folderul `backend`:

```
npm start
```

**4. Pornire frontend**

- În folderul `dissertation-registration`:

```
npm start
```

**6. Probleme frecvente și soluții**

- `bad auth : authentication failed`:
  - Verifică `MONGO_URI` (username/password corecte).
  - Verifică că userul are permisiunea pe DB.
  - În MongoDB Atlas, adaugă IP-ul tău în Network Access (sau 0.0.0.0/0 pentru dezvoltare).
- `Port already in use`:
  - Schimbă `PORT` în `backend/.env` sau oprește procesul care ocupă portul.
  - Poți vedea procesul cu `lsof -i :3000` și opri cu `kill <PID>`.
- `Module type` / ESM warning:
  - Dacă vezi avertisment legat de module, verifică `package.json` și setarea `"type": "module"` dacă folosești `import`.
