# 💈 Viking Barber — Experiência Web Cinematográfica

Este projeto é uma Single Page Application (SPA) moderna e ultrarrápida construída em **React 19**, **TypeScript**, **Tailwind CSS v4** e **Framer Motion / Lucide React**.

---

## 🚀 Como Rodar Localmente no seu Computador

### 1. Pré-requisitos
Certifique-se de ter instalado no seu computador:
- **Node.js** (versão 18 ou superior, recomendado 20 LTS): baixe em [nodejs.org](https://nodejs.org/)

### 2. Passo a Passo
1. Descompacte o arquivo `viking-barber.zip` em uma pasta.
2. Abra o terminal (Prompt de Comando, PowerShell ou Terminal do VS Code) dentro dessa pasta.
3. Instale as dependências:
```bash
npm install
```
4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
5. Abra o navegador no endereço exibido (geralmente `http://localhost:3000` ou `http://localhost:5173`). O site rodará exatamente igual ao preview!

---

## 🌐 Como Publicar na Internet (100% Grátis)

Como este projeto é um frontend estático de alta performance (Vite + React), ele pode ser hospedado gratuitamente e com certificado SSL (HTTPS) em qualquer uma das plataformas líderes:

### Opção A: Vercel (Mais Fácil e Rápido — Recomendado ⭐)
1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. **Método 1 (Arrastar e Soltar via CLI)**:
   ```bash
   npm i -g vercel
   vercel
   ```
3. **Método 2 (Via GitHub)**:
   - Suba o código para o seu repositório no GitHub.
   - No painel da Vercel, clique em **"Add New Project"** e importe o repositório.
   - O Vercel detectará automaticamente que é um projeto **Vite**.
   - Clique em **"Deploy"**. Em menos de 1 minuto seu site estará no ar com link público e domínio grátis (ex: `viking-barber.vercel.app`) ou seu domínio próprio (ex: `vikingbarber.com.br`).

---

### Opção B: Netlify (Arrastar e Soltar sem usar terminal)
1. Gere a versão final de produção no seu computador executando:
   ```bash
   npm run build
   ```
   Isso criará uma pasta chamada `dist/`.
2. Acesse [netlify.com](https://app.netlify.com/drop).
3. Arraste a pasta `dist/` diretamente para a tela do navegador.
4. Pronto! O site é publicado instantaneamente.

---

### Opção C: Cloudflare Pages
1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Conecte com o seu GitHub.
3. Configure:
   - **Framework Preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Clique em **Save and Deploy**.

---

## ⚙️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor local de desenvolvimento.
- `npm run build`: Compila e minifica o projeto em arquivos ultra-otimizados na pasta `dist/`.
- `npm run preview`: Testa a build de produção localmente.
- `npm run lint`: Valida tipagens e regras de código.

---

## 🛠️ Tecnologias Utilizadas
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion (`motion/react`)**
- **Lucide Icons**
