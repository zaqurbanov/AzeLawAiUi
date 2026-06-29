# ⚖️ AzeLawAI UI

> Azərbaycan qanunvericiliyi əsasında hüquqi sualları cavablandıran AI chat assistanı — öyrənmə & portfolio layihəsi.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/Lisenziya-MIT-green)](LICENSE)

---

## 📌 Layihə haqqında

**AzeLawAI UI** — istifadəçinin hüquqi suallarını Azərbaycan qanunvericiliyi kontekstində AI vasitəsilə cavablandıran tam ekranlı chat interfeysidir. Layihə tamamilə **öyrənmə məqsədilə** yazılmış olub React, Node.js backend-i ilə real-vaxt streaming inteqrasiyasını əhatə edən **portfolio işidir**.

Arxa tərəfdə Node.js REST API işləyir; cavablar token-token şəkildə `ReadableStream` vasitəsilə axın (stream) kimi göndərilir — bu da ChatGPT-yə bənzər real-vaxt yazma effekti yaradır.

---

## ✨ Xüsusiyyətlər

### UI / UX
- 🎉 **Xoş gəldiniz modalı** — ilk açılışda layihə haqqında məlumat, GitHub/LinkedIn linklər
- 💬 **Tam ekranlı chat layout** — header + sürüşdürülə bilən mesajlar + yapışqan input sahəsi
- 🔵 **İstifadəçi balonu** (sağ, mavi) və **Bot balonu** (sol, ağ) avatar ilə
- ⚡ **Real-vaxt streaming** — `ReadableStream` API ilə token-token cavab
- ⌨️ **Yazma indikatoru** — 3 animasiyalı nöqtə
- 🔔 **Custom toast bildirişlər** — uğur / xəbərdarlıq / xəta, 4.5 saniyədə öz-özünə bağlanır
- 🪄 **Boş vəziyyət** — hint chip-ləri ilə ilkin ekran (`Əmək müqaviləsi`, `Mülkiyyət hüququ`, `Ailə hüququ`)
- 📏 **Auto-resize textarea** — mətn çoxaldıqca avtomatik böyüyür (max 6 sətir)
- ↩️ **Enter** — göndər, **Shift+Enter** — yeni sətir
- 🔄 **Auto-scroll** — ən son mesaja avtomatik sürüşmə
- ✅ **Inline input validation** — boş sual göndərmə qorunması

### Texniki
- 🌓 **Dark mode** dəstəyi (`dark:` class-ları vasitəsilə)
- ♿ **Accessibility** — `aria-label`, `aria-busy`, `focus-visible` halqaları
- 🎬 **`prefers-reduced-motion`** — animasiyalar azaldılmış hərəkat parametrini hörmət edir
- 🔗 **Sessiya davamlılığı** — `sessionId` ilə backend tərəfindəki söhbət tarixçəsi qorunur
- 🌐 **Shimmer skeleton** — bot cavabı gəlməmiş xətt əvəzinə yüklənmə effekti

### Custom animasiyalar (`App.css`)
| Animasiya | Təsviri |
|---|---|
| `animate-fade-up` | Aşağıdan yuxarı soluxma (mesaj baloncuqları) |
| `animate-fade-in` | Sadə soluxma (boş vəziyyət, xəta mətn) |
| `animate-scale-in` | Kiçikdən böyüyə (xoş gəldiniz modalı) |
| `animate-slide-in-right` | Sağdan giriş (toast bildirişlər) |
| `typing-dot` | Zıplayan nöqtə (yazma indikatoru) |
| `shimmer` | Sürüşən parıltı (skeleton loader) |

---

## 🛠️ Texnologiya Yığını

| Kateqoriya | Texnologiya |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| HTTP Client | Axios (tarixçə endpoint üçün) |
| Streaming | Native `fetch` + `ReadableStream` API |
| Markdown render | react-markdown |
| UI Component lib | @material-tailwind/react |
| Linting | ESLint 9 (eslint-plugin-react, react-hooks, react-refresh) |
| Backend | Node.js REST API (ayrı repo) |

---

## 🚀 Başlamaq üçün

### Tələblər
- **Node.js** v18 və ya daha yeni versiya
- **npm** v9+
- Backend API işlək olmalıdır (lokal `http://localhost:3333/` və ya production `https://azelawai.onrender.com/`)

### Quraşdırma

```bash
# Reponu klonlayın
git clone https://github.com/zaurqurbanov/AzeLawAiUi.git
cd AzeLawAiUi

# Asılılıqları yükləyin
npm install
```

### Backend URL-ini konfiqurasiya edin

`src/component/AiChat.jsx` faylını açın və `baseUrl` dəyişənini tənzimləyin:

```js
// Lokal development üçün:
const baseUrl = "http://localhost:3333/";

// Production üçün:
// const baseUrl = "https://azelawai.onrender.com/";
```

### Development serverini işə salın

```bash
npm run dev
```

Brauzer avtomatik açılmasa, `http://localhost:5173` ünvanına daxil olun.

---

## 📜 Əmrlər

| Əmr | Təsviri |
|---|---|
| `npm run dev` | Vite HMR ilə development serveri işə salır |
| `npm run build` | `dist/` qovluğuna production build hazırlayır |
| `npm run preview` | Production build-i lokal olaraq önizləyir |
| `npm run lint` | ESLint ilə kod keyfiyyətini yoxlayır |

---

## 🌐 API İnteqrasiyası

Backend iki endpoint açır:

### `POST /ask` — Streaming cavab

```
Content-Type: application/json
Body: { "question": "...", "session_id": "..." }
```

**Cavab formatı:**
- İlk sətir — JSON: `{"sessionId":"abc123"}`
- Qalan axın — text token-ları (streamed)

Frontend bu axını `ReadableStream` + `TextDecoder` ilə oxuyur və hər chunk gəldikcə bot baloncuğunu yerində yeniləyir:

```js
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  // chunk-u UI-da real vaxtda göstər
}
```

### `GET /history/:sessionId` — Söhbət tarixçəsi

```
Response: { "data": [{ "userMessage": "...", "botMessage": "..." }] }
```

Sessiya ID-si `sessionId` state-ında saxlanılır; səhifə yeniləndikdə tarixçə avtomatik çəkilir.

---

## 📁 Layihə Strukturu

```
AzeLawAiUi/
├── public/                  # Statik fayllar
├── src/
│   ├── component/
│   │   └── AiChat.jsx       # Əsas chat komponenti
│   │                        #   ├── Toast
│   │                        #   ├── TypingIndicator
│   │                        #   ├── EmptyState
│   │                        #   ├── UserBubble
│   │                        #   ├── BotBubble
│   │                        #   └── AiChat (əsas)
│   ├── App.jsx              # WelcomeModal + App kökü
│   ├── App.css              # Tailwind import + @keyframes + @theme tokens
│   └── main.jsx             # React entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

### Komponent Məsuliyyətləri

| Fayl | Məsuliyyət |
|---|---|
| `App.jsx` | `WelcomeModal` state-ni idarə edir, `AiChat`-ı render edir |
| `AiChat.jsx` | Bütün chat məntiqi: streaming, tarixçə, toast, input validation |
| `App.css` | `@keyframes` animasiyaları, `@theme` token-ları (Tailwind v4), `prefers-reduced-motion` |

---

## 🖼️ Ekran Görüntüsü

> Screenshot-lar tezliklə əlavə olunacaq.

```
┌─────────────────────────────────────────────┐
│  WelcomeModal — ilk açılışda göstərilir     │
│  (Zaur Qurbanov, GitHub, LinkedIn, CTA)     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ LAW AI          Azərbaycan Hüquq Assistanı  │
│─────────────────────────────────────────────│
│                                             │
│  [İstifadəçi balonu]               Siz  👤 │
│                                             │
│ 📖 [Bot cavabı — real-vaxt streaming]       │
│    LAW AI                                   │
│                                             │
│─────────────────────────────────────────────│
│  Hüquqi sualınızı yazın…           [→]     │
│  LAW AI məlumat məqsədli cavablar verir.    │
└─────────────────────────────────────────────┘
```

---

## 🎓 Layihənin Məqsədi

Bu layihə **kommersiya məhsulu deyil** — aşağıdakı bacarıqları praktikada tətbiq etmək üçün yazılmışdır:

- ⚛️ React 18 ilə komponent arxitekturası və state management
- 🔄 `ReadableStream` API ilə real-vaxt streaming
- 🎨 Tailwind CSS v4 ilə UI dizayn (dark mode, custom animasiyalar, `@theme` token-ları)
- 🌐 REST API inteqrasiyası (axios + native fetch)
- ♿ Accessibility standartları (`aria-*`, `focus-visible`, `prefers-reduced-motion`)
- 🏗️ Komponentlərə parçalanmış, oxunaqlı kod strukturu

> **Qeyd:** LAW AI yalnız məlumat məqsədilə cavablar verir. Rəsmi hüquqi məsləhət üçün mütləq peşəkar vəkilə müraciət edin.

---

## 👤 Müəllif

**Zaur Qurbanov** — Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-zaurqurbanov-181717?logo=github)](https://github.com/zaurqurbanov)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-zaurqurbanov-0A66C2?logo=linkedin)](https://www.linkedin.com/in/zaurqurbanov)

---

## 📄 Lisenziya

Bu layihə [MIT](LICENSE) lisenziyası altında paylaşılır.
