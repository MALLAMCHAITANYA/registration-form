# Deploy Online — Get a Public URL

Follow these steps to put your app online so anyone can open it with a link.

---

## What you will get

| Part | Free hosting | Example URL |
|------|--------------|---------------|
| Frontend (React) | **Vercel** | `https://your-app.vercel.app` |
| Backend (API) | **Render** | `https://your-api.onrender.com` |
| Database (MySQL) | **Railway** or **Aiven** | Cloud MySQL connection |

---

## Step 1: Push code to GitHub

1. Create a GitHub account at https://github.com
2. Create a new repository named `registration-form`
3. In your project folder, run:

```bash
git init
git add .
git commit -m "Registration form project with React and MySQL"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/registration-form.git
git push -u origin main
```

> Never commit your `.env` file — it contains your password. It is already in `.gitignore`.

---

## Step 2: Deploy MySQL database (cloud)

### Option A — Railway (easier)

1. Go to https://railway.app and sign up
2. New Project → **Add MySQL**
3. Open MySQL → **Connect** → copy:
   - Host, Port, User, Password, Database name
4. Run your `schema.sql` using Railway's query tab or MySQL Workbench with the cloud connection

### Option B — Keep local MySQL (not for public URL)

Local MySQL only works on your PC. For a public link, you **must** use cloud MySQL.

---

## Step 3: Deploy backend on Render

1. Go to https://render.com and sign up
2. **New → Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add **Environment Variables:**

| Key | Value |
|-----|-------|
| `DB_HOST` | Your cloud MySQL host |
| `DB_USER` | Your MySQL username |
| `DB_PASSWORD` | Your MySQL password |
| `DB_DATABASE` | `registration_db` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://your-app.vercel.app` (add after Step 4) |

6. Click **Deploy** — copy your backend URL (e.g. `https://registration-api.onrender.com`)

---

## Step 4: Deploy frontend on Vercel

1. Go to https://vercel.com and sign up
2. **Add New Project** → import your GitHub repo
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
4. Add **Environment Variable:**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-api.onrender.com` (your Render URL from Step 3) |

5. Click **Deploy** — you get a URL like `https://registration-form.vercel.app`

6. Go back to Render → update `FRONTEND_URL` to your Vercel URL → redeploy backend

---

## Step 5: Test your live URL

1. Open your Vercel URL in a browser
2. Fill the form and submit
3. Click **View Submissions**
4. Check cloud MySQL for the new row

---

## Share or sell your link

Once deployed, your **Vercel URL** is the public link you can share or sell:

```
https://your-app-name.vercel.app
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Form says "Cannot connect to server" | Check `VITE_API_URL` in Vercel matches Render URL |
| Database error on submit | Check MySQL env vars on Render |
| CORS error | Set `FRONTEND_URL` on Render to your exact Vercel URL |
| Render sleeps on free tier | First request may take 30–60 seconds to wake up |

---

## Cost

- **Vercel** — Free for personal projects
- **Render** — Free tier (may sleep when idle)
- **Railway** — Free trial credits, then paid for MySQL

For a demo or school project, the free tiers are enough.
