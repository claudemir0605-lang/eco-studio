# ☁️ Ativar o modo nuvem (Firebase) — 2 pessoas, dados sincronizados

Siga uma vez. Depois é só os dois abrirem o site e digitarem o **mesmo código de espaço**.
Leva ~5 minutos e é **gratuito**.

## 1. Criar o projeto
1. Acesse **https://console.firebase.google.com** e entre com sua conta Google.
2. Clique em **Adicionar projeto** → nome (ex.: `controle-gastos`) → pode **desativar** o Google Analytics → **Criar projeto**.

## 2. Ativar o login anônimo
1. No menu lateral: **Criar → Authentication → Vamos começar**.
2. Aba **Sign-in method** → clique em **Anônimo** → **Ativar** → **Salvar**.

## 3. Criar o banco de dados
1. No menu: **Criar → Firestore Database → Criar banco de dados**.
2. Escolha a localização **`southamerica-east1`** (São Paulo) → avance.
3. Pode iniciar em **modo de produção** (as regras abaixo cuidam do acesso).

## 4. Colar as regras de segurança
Na aba **Regras** do Firestore, substitua tudo por isto e clique em **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /espacos/{espaco}/lancamentos/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 5. Pegar a configuração do app
1. Clique na engrenagem ⚙️ (canto superior) → **Configurações do projeto**.
2. Role até **Seus apps** → clique no ícone **Web `</>`**.
3. Dê um apelido (ex.: `web`) → **Registrar app**.
4. Vai aparecer um bloco `const firebaseConfig = { ... }`. **Copie os valores.**

## 6. Colar no app
No arquivo **`index.html`**, no topo do `<script>`, preencha o `FIREBASE_CONFIG`
com os valores copiados:

```js
const FIREBASE_CONFIG = {
  apiKey:            "AIza...",
  authDomain:        "controle-gastos.firebaseapp.com",
  projectId:         "controle-gastos",
  storageBucket:     "controle-gastos.appspot.com",
  messagingSenderId: "1234567890",
  appId:             "1:1234567890:web:abc123"
};
```

Salve e publique (git push, ou Vercel/GitHub Pages atualiza sozinho).

## Pronto! Como usar
- Os dois abrem o site → digitam **o mesmo código de espaço** (ex.: `casa-silva-2026`).
- Tudo que um lançar aparece no outro **na hora**.
- Quem souber o código entra no espaço — então escolham um código **só de vocês**.
- O canto superior mostra **🟢 Nuvem — sincronizado** quando está conectado.

> Não quer mexer no código? Me mande os valores do `firebaseConfig` que eu colo e publico para você.
