# React + LM Studio Demo

## 🏥 Inspired from Watson in the Ward – Healthcare AI Model (Using LM Studio)

**Watson in the Ward** is a secure, locally-hosted healthcare AI assistant built with **React** and **LM Studio**.
It provides **general health information, wellness guidance, and medical education** while enforcing **strict safety boundaries** through a robust **7-layer safety architecture**.

> ⚠️ This project is **educational only** and **not a replacement for professional medical advice**.

---

## ✨ Key Features

* 🔒 **7-Layer Healthcare Safety System**
* 🚨 **Real-time Emergency Detection** (Cardiac, Stroke, Mental Health, Poisoning, Trauma)
* 🛡️ **Prompt Injection & Jailbreak Protection**
* 🧼 **Input Sanitization & Output Safety Filtering**
* ⚕️ **Automatic Medical Disclaimers**
* ⏳ **Rate Limiting with Emergency Bypass**
* 📋 **Audit Logging & Session Statistics**
* 🧠 **Runs Fully Local using LM Studio (No Cloud APIs)**

---

## 🧱 Safety Architecture (7 Layers)

1. **Prompt Injection Detection**
2. **Emergency Keyword Detection**
3. **Input Sanitization (XSS / Script Removal)**
4. **Output Safety Filtering (No diagnosis / dosage)**
5. **Medical & Mental Health Disclaimers**
6. **Rate Limiting (Emergency-aware)**
7. **Audit Logging (Security & Usage Events)**

---

## 🖥️ Tech Stack

* **Frontend:** React (Single-file Component)
* **AI Runtime:** LM Studio (Local LLM Server)
* **Language:** JavaScript (ES6+)
* **Styling:** Inline CSS (Dark UI)
* **Model Support:** Any LM Studio compatible chat model

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

* Node.js 18+
* LM Studio installed
* A local chat model downloaded in LM Studio

---

### 2️⃣ Start LM Studio Server

In LM Studio:

* Load a chat model
* Start the **Local Server**
* Default endpoint:

```
http://127.0.0.1:1234/v1
```

---

### 3️⃣ Run the React App

```bash
npm install
npm start
```

---

### 4️⃣ Configure in App

* Open **⚙️ Settings**
* Verify LM Studio URL
* Select an available model
* Adjust temperature if needed

Connection status will show **Connected** when successful.

---

## 💬 What You Can Ask

✅ General health education
✅ Understanding symptoms (non-diagnostic)
✅ Wellness & lifestyle tips
✅ Preparing questions for doctors
✅ Medical terminology explanations

🚫 No diagnosis
🚫 No prescriptions or dosages
🚫 No medical guarantees

---

## 🚨 Emergency Handling

If emergency phrases are detected, Watson:

* Stops AI response
* Displays **immediate emergency instructions**
* Shows correct **hotlines**:

  * **911** – Emergency
  * **988** – Suicide & Crisis Lifeline
  * **1-800-222-1222** – Poison Control

---

## 📊 Built-in Monitoring

* Total Queries
* Blocked Prompt Attacks
* Emergency Detections
* Full Session Audit Logs (Viewable & Exportable)

---

## 🔐 Privacy & Security

* ✅ Fully local inference
* ✅ No data leaves your machine
* ✅ No external APIs
* ✅ No cloud logging

---

## ⚠️ Medical Disclaimer

> This application does **NOT** provide medical diagnoses, treatments, or prescriptions.
> Always consult a qualified healthcare professional for medical concerns.

---

## 📄 License

MIT License
Free to use for **education, research, and demos**.

---

## Author

**Sakir Saiyed** — Senior iOS & AI Engineer

Built as a **Healthcare-Safe AI Demo** using **LM Studio + React**.
Focused on **responsible AI, safety-first design, and local privacy**.


