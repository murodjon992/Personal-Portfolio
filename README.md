# Portfolio sayt — Django + React + Docker

Bu loyiha ikki qismdan iborat:
- **backend/** — Django + DRF (admin panel orqali loyihalar, xizmatlar/narxlar, "men haqimda" va kelgan xabarlarni boshqarasiz)
- **frontend/** — React (Vite) + Tailwind + Framer Motion, 3 tilli (uz/ru/en) sayt

---

## 1. Zipdan chiqargandan keyin nima qilish kerak (ketma-ket)

### A) Docker bilan ishga tushirish (eng oson yo'l — tavsiya etiladi)

1. Docker va Docker Compose kompyuteringizda o'rnatilgan bo'lishi kerak.
2. Terminalda loyiha papkasiga kiring:
   ```
   cd portfolio-project
   ```
3. Backend uchun `.env` faylini yarating:
   ```
   cp backend/.env.example backend/.env
   ```
   `backend/.env` faylini oching va kamida `SECRET_KEY` ni o'zgartiring (istalgan uzun tasodifiy matn). Agar Telegram orqali xabar bildirishnomasi kerak bo'lsa, `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` ni ham to'ldiring (pastda tushuntirilgan).
4. Loyihani ishga tushiring:
   ```
   docker compose up --build
   ```
5. Birinchi marta ishga tushirgach, admin foydalanuvchi (superuser) yarating — yangi terminal oynasida:
   ```
   docker compose exec backend python manage.py createsuperuser
   ```
6. Tayyor:
   - Sayt: **http://localhost**
   - Admin panel: **http://localhost/admin**

### B) Docker'siz, lokal rivojlantirish uchun (development)

**Backend:**
```
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Backend http://localhost:8000 da ishga tushadi.

**Frontend (boshqa terminalda):**
```
cd frontend
npm install
cp .env.example .env
npm run dev
```
Sayt http://localhost:5173 da ochiladi.

---

## 2. Admin panel orqali kontentni to'ldirish

`http://localhost/admin` (yoki dev rejimida `http://localhost:8000/admin`) ga superuser bilan kiring:

1. **Profil (men haqimda)** — ismingiz, unvon (uz/ru/en), bio (uz/ru/en), tajriba yillari, ko'nikmalar (vergul bilan), rasm, email/telefon/telegram/github/linkedin. Faqat 1 ta profil yozuvi bo'lishi kerak.
2. **Loyihalar** — har bir loyiha uchun nomi, qisqa va to'liq tavsif (har uch tilda), texnologiyalar (vergul bilan, masalan: `Django, React Native, PostgreSQL`), rasm, sayt manzili (bo'lsa), tartib raqami.
3. **Xizmatlar/Narxlar** — xizmat nomi, tavsif, narx yozuvi (masalan: `$300 dan boshlab`), "nimalar kiradi" (har qatorga bitta band), va xohlasangiz "ko'p tanlanadi" belgisini yoqing.
4. **Kontakt xabarlari** — saytdagi forma orqali kelgan xabarlar shu yerda avtomatik ko'rinadi.

Kontentni o'zgartirgandan so'ng saytni yangilasangiz (frontend qayta build qilinmasa ham) — ma'lumotlar API orqali kelgani uchun **darhol yangilanadi**, kodni qayta yozish shart emas.

---

## 3. Telegram orqali xabar bildirishnoma (ixtiyoriy, lekin tavsiya etiladi)

Kontakt formasidan xabar kelganda sizga Telegramda darhol xabar kelishi uchun:

1. Telegram'da **@BotFather** ga yozib, yangi bot yarating — sizga `TELEGRAM_BOT_TOKEN` beradi.
2. O'z Telegram `chat_id` raqamingizni bilish uchun botga bir marta `/start` yozing, so'ng **@userinfobot** orqali chat ID'ingizni oling.
3. `backend/.env` faylida:
   ```
   TELEGRAM_BOT_TOKEN=sizning_tokeningiz
   TELEGRAM_CHAT_ID=sizning_chat_id
   ```
4. Docker ishlatayotgan bo'lsangiz, konteynerni qayta ishga tushiring: `docker compose up --build backend`

---

## 4. Domenga chiqarish (production)

1. `backend/.env` faylida:
   - `DEBUG=0`
   - `ALLOWED_HOSTS=sizningdomeningiz.uz,www.sizningdomeningiz.uz`
   - `SECRET_KEY` — uzun va tasodifiy qiymat
   - Xavfsiz parol bilan `POSTGRES_PASSWORD` ni o'zgartiring
2. Domeningizni serveringiz IP manziliga yo'naltiring (DNS A-record).
3. HTTPS uchun tavsiya: `docker-compose.yml` oldiga **Caddy** yoki **Nginx + Certbot** qo'shib, 80/443 portlarni shu orqali boshqarish (buni keyinroq birga sozlab olsak bo'ladi).
4. `docker compose up --build -d` — orqa fonda ishga tushirish uchun `-d` flagini qo'shing.

---

## 5. Loyiha strukturasi

```
portfolio-project/
├── docker-compose.yml
├── backend/                  # Django + DRF
│   ├── config/                # settings, urls
│   ├── portfolio/             # models, admin, API
│   │   ├── models.py           # Profile, Project, Service, ContactMessage
│   │   ├── admin.py
│   │   ├── serializers.py      # tilga qarab (uz/ru/en) mos maydonni qaytaradi
│   │   ├── views.py
│   │   └── utils.py            # Telegram xabar yuborish
│   └── requirements.txt
└── frontend/                 # React + Vite + Tailwind
    └── src/
        ├── components/         # Navbar, Hero, About, Projects, Services, Contact, Footer
        ├── locales/            # uz.json, ru.json, en.json (interfeys matnlari)
        ├── api.js              # backend bilan bog'lanish
        └── App.jsx
```

---

## 6. Foydali eslatmalar

- Kontent (loyihalar, narxlar, bio) **har doim admin panel orqali** boshqariladi — kodga qo'l tegizish shart emas.
- Interfeys matnlari (tugmalar, sarlavhalar kabi "Yuborish", "Bog'lanish" so'zlari) `frontend/src/locales/*.json` fayllarida — buni o'zgartirish uchun frontendni qayta build qilish kerak bo'ladi.
- Rasm hajmi katta bo'lmasin (loyiha/profil rasmlari uchun ~500KB-1MB atrofida tavsiya etiladi) — sayt tezligi uchun muhim.
- Agar keyinchalik yangi til yoki yangi bo'lim (masalan "Mijozlar sharhi") qo'shmoqchi bo'lsangiz, aytib qo'yasiz — birga qo'shib beraman.
