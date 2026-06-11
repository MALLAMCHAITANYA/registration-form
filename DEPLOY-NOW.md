# Deploy Now — Step by Step

Your GitHub repo: **https://github.com/MALLAMCHAITANYA/registration-form**

You need 3 free accounts:
1. **Railway** — cloud MySQL database
2. **Render** — backend API
3. **Vercel** — frontend (your public URL)

---

## STEP 1 — Cloud MySQL on Railway (5 min)

1. Open **https://railway.app** → Sign up with GitHub
2. Click **New Project** → **Provision MySQL**
3. Click the **MySQL** box → **Connect** tab
4. Copy these values (you need them in Step 2):

| Railway shows | Use as env var |
|---------------|----------------|
| MYSQLHOST | `DB_HOST` |
| MYSQLPORT | `DB_PORT` |
| MYSQLUSER | `DB_USER` |
| MYSQLPASSWORD | `DB_PASSWORD` |
| MYSQLDATABASE | `DB_DATABASE` |

5. Optional: open **Query** in Railway and paste contents of `backend/database/schema.sql` (only the CREATE TABLE part is enough — server auto-creates table too)

---

## STEP 2 — Backend on Render (10 min)

1. Open **https://render.com** → Sign up with GitHub
2. **New +** → **Web Service**
3. Connect repo: **MALLAMCHAITANYA/registration-form**
4. Settings:

| Setting | Value |
|---------|-------|
| Name | `registration-form-api` |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Instance Type | Free |

5. **Environment Variables** → Add from Railway:

```
DB_HOST     = (paste MYSQLHOST)
DB_PORT     = (paste MYSQLPORT)
DB_USER     = (paste MYSQLUSER)
DB_PASSWORD = (paste MYSQLPASSWORD)
DB_DATABASE = (paste MYSQLDATABASE)
DB_SSL      = true
PORT        = 5000
```

6. Click **Deploy Web Service**
7. Wait until status is **Live**
8. Copy your URL — example: `https://registration-form-api.onrender.com`
9. Test in browser: open `https://YOUR-URL.onrender.com/api/registrations`  
   You should see: `{"success":true,"data":[]}`

---

## STEP 3 — Frontend on Vercel (5 min)

1. Open **https://vercel.com** → Sign up with GitHub
2. **Add New Project** → Import **registration-form**
3. Settings:

| Setting | Value |
|---------|-------|
| Root Directory | `frontend` |
| Framework | Vite |

4. **Environment Variables**:

```
VITE_API_URL = https://YOUR-RENDER-URL.onrender.com
```

(Use your exact Render URL from Step 2 — no slash at the end)

5. Click **Deploy**
6. Copy your Vercel URL — example: `https://registration-form.vercel.app`

---

## STEP 4 — Test your live app

1. Open your **Vercel URL** in browser
2. Fill the form → click **Register**
3. Click **View Submissions**
4. First load may take 30–60 sec (Render free tier wakes up)

---

## Your public link to share/sell

```
https://your-project-name.vercel.app
```

This is the URL you give to customers or your manager.

---

## If something fails

| Error | Fix |
|-------|-----|
| Cannot connect to server | Check `VITE_API_URL` in Vercel = Render URL |
| Database error | Check all 5 DB_* vars on Render match Railway |
| Empty page on Render URL | Normal — API only. Use Vercel URL for the app |
| Slow first request | Render free tier sleeps — wait 1 minute |

---

## Push latest deploy files (run once)

```bash
git add .
git commit -m "Add deployment config for Render and Vercel"
git push
```

Then redeploy on Render if needed.
