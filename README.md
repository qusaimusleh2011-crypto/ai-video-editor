# ClipSpark – AI Video Editing Web App

Edit videos in seconds with AI-powered features: auto-cuts, captions, silence removal, and social-ready formats.

## Features

- ✅ **Upload Videos**: Drag-and-drop support for MP4, MOV, AVI (max 300MB)
- ✅ **Auto Edit**: Remove silence, add captions, resize for social media
- ✅ **Auto Subtitles**: Generate subtitles via mock API (ready for AssemblyAI/Whisper)
- ✅ **TikTok Export**: Vertical 9:16 format export
- ✅ **Real-time Progress**: Live upload and processing indicators
- ✅ **Dark UI**: Modern, minimal design with blue/teal accents
- ✅ **Responsive**: Mobile-first design

## Tech Stack

- **Frontend**: Next.js 16 + React 18 + TypeScript + Tailwind CSS
- **Backend**: Next.js Route Handlers (app/api/*)
- **Video Processing**: ffmpeg (optional, mocked in demo)
- **Subtitles**: AssemblyAI or Whisper API (optional, mocked in demo)

## Installation & Setup

### 1. Install Node.js (if not already installed)

Download LTS from https://nodejs.org and install it.

Verify installation:
```powershell
node -v
npm -v
```

### 2. Install Dependencies

```powershell
cd C:\Users\halam\ai-video-editor
npm install
```

### 3. Run Development Server

```powershell
npm run dev
```

Open **http://localhost:3000** in your browser.

## Usage

1. **Upload a video** using drag-and-drop or file picker
2. **Watch progress bar** as file uploads
3. **Choose an edit option**:
   - **Auto Edit (Quick)**: Removes silence, adds captions, optimizes quality
   - **Auto Subtitles**: Generates subtitle file (.vtt)
   - **Export for TikTok**: Crops to 9:16 vertical format
4. **Download** the edited video

## API Endpoints

### POST /api/upload
Accepts video file, validates type/size, saves to `public/uploads/`

**Response:**
```json
{
  "success": true,
  "filePath": "/uploads/1234567890-filename.mp4"
}
```

### POST /api/auto-edit
Processes video (remove silence, add captions, resize)

**Request:**
```json
{
  "filePath": "/uploads/filename.mp4",
  "format": "tiktok" // optional
}
```

**Response:**
```json
{
  "success": true,
  "editedPath": "/uploads/edited-filename.mp4"
}
```

### POST /api/subtitles
Generates subtitle file (.vtt format)

**Request:**
```json
{
  "filePath": "/uploads/filename.mp4"
}
```

**Response:**
```json
{
  "success": true,
  "vttPath": "/uploads/filename.vtt"
}
```

## Project Structure

```
ai-video-editor/
├── app/
│   ├── page.tsx (main upload/edit interface)
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       ├── upload/route.ts
│       ├── auto-edit/route.ts
│       └── subtitles/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── UploadDropzone.tsx
│   ├── ProgressBar.tsx
│   ├── StatusDisplay.tsx
│   └── ThemeToggle.tsx
├── public/
│   ├── uploads/ (video storage)
│   └── favicon.ico
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Customization

### Colors (Tailwind)
- **Background**: `#000000` (black)
- **Text**: `#ffffff` (white)
- **Primary**: `#2563EB` (blue-600)
- **Secondary**: `#06B6D4` (teal-500)

Update colors in `app/globals.css` and component classes.

### Add Real ffmpeg

Install ffmpeg:
```powershell
# Using Chocolatey
choco install ffmpeg

# Or download from https://ffmpeg.org/download.html
```

Then update `/api/auto-edit/route.ts` to call ffmpeg commands.

### Add Real Subtitles API

1. Get API key from [AssemblyAI](https://www.assemblyai.com/) or [OpenAI Whisper](https://platform.openai.com/docs/guides/speech-to-text)
2. Update `/api/subtitles/route.ts` to make real API calls

## Deployment

### Vercel (Recommended)

```powershell
npm install -g vercel
vercel
```

### Automatic Deploy via GitHub Actions (Vercel)

This repo includes a GitHub Actions workflow that will build and deploy to Vercel when you push to the `main` branch. To enable it:

1. Create a project on Vercel and note the `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.
2. Go to your GitHub repository Settings → Secrets → Actions and add the following secrets:
  - `VERCEL_TOKEN` — your personal Vercel token (from https://vercel.com/account/tokens)
  - `VERCEL_ORG_ID` — your Vercel org id
  - `VERCEL_PROJECT_ID` — your Vercel project id
3. Push to `main` and the workflow `.github/workflows/deploy-vercel.yml` will run and deploy to Vercel.

If you prefer to deploy directly from your machine, install the Vercel CLI and run `vercel --prod`.

### Self-hosted (VPS/Server)

```powershell
npm install
npm run build
npm start
```

Use PM2 to keep running:
```powershell
npm install -g pm2
pm2 start "npm start"
```

## Production Checklist

- [ ] Add ffmpeg support for real video processing
- [ ] Integrate AssemblyAI or Whisper for subtitles
- [ ] Switch to S3/Supabase for file storage
- [ ] Add user authentication (NextAuth or Auth0)
- [ ] Implement rate limiting (20 edits/day/user)
- [ ] Add database for video history
- [ ] Set up CI/CD pipeline
- [ ] Add error logging (Sentry)

## Support

For issues or questions, email: support@clipspark.ai

---

**License**: MIT

**Made with ⚡ ClipSpark**


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
