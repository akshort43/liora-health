# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## Support submission database logging

This project now includes a local API + SQLite database to log support form submissions in both:

- Human-readable format (`human_summary`)
- AI-readable format (`ai_summary` JSON)

### Run both app + API

```sh
npm install
npm run dev:full
```

- Frontend: `http://localhost:8080`
- API: `http://localhost:8787`
- SQLite file: `data/liora-submissions.sqlite`

### Available API endpoints

- `POST /api/support-submissions`  
  Saves form submissions with structured payload + summaries.
- `GET /api/support-submissions?limit=50`  
  Returns recent entries as JSON.
- `GET /api/support-submissions/export/human`  
  Markdown export for people.
- `GET /api/support-submissions/export/ai`  
  NDJSON export for AI workflows.
- `GET /health`  
  API health check.

### Environment variables

Copy `.env.example` to `.env` and adjust if needed:

- `VITE_API_BASE_URL` controls frontend API target.
- `LIORA_API_PORT` controls API port.

### Generate a shareable public URL

Use this from your terminal and keep it running:

```sh
npm run share
```

The terminal prints a `https://...trycloudflare.com` URL. Share that URL with your friend.

If you want support form submissions to work through the same shared URL, run:

```sh
npm run share:full
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
