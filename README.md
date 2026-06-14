# Athena

An open-source AI research companion — the NotebookLM alternative. Upload sources, ask questions, generate podcast-style deep dives, and synthesize knowledge.

## Tech Stack

| Layer    | Technology           |
| -------- | -------------------- |
| Frontend | Next.js · TypeScript |
| Backend  | Django · DRF         |
| Database | PostgreSQL           |

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
cp .env.example .env           # edit with your DB credentials
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API

| Endpoint       | Method | Description           |
| -------------- | ------ | --------------------- |
| /api/health/   | GET    | Backend health check  |
