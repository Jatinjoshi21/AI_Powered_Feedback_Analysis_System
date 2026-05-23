# VoicePulse AI

AI-powered voice feedback intelligence platform for businesses.

VoicePulse AI lets a business create a feedback campaign, share a QR code, collect short customer voice responses, transcribe them with AI, analyze sentiment, and view insights in a dashboard.

## Project Goal

Build a working MVP that demonstrates the complete feedback loop:

1. Business owner registers and logs in.
2. Business owner creates a campaign.
3. App generates a QR-linked public feedback page.
4. Customer scans the QR code and records voice feedback.
5. Audio is uploaded and stored securely.
6. AI transcribes the audio and detects sentiment.
7. Business owner views analytics, transcripts, and audio playback.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Recharts
- MediaRecorder API
- QR code generation

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt password hashing
- Multer for multipart uploads
- Cloudinary for audio storage

### AI Services

- Whisper speech-to-text
- HuggingFace sentiment analysis

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Media storage: Cloudinary

## Core Product Flows

### Business Flow

```text
Register/Login -> Create Campaign -> Configure Campaign -> Generate QR -> Share QR
```

A business owner can create a campaign in under two minutes. The backend stores campaign details in MongoDB, generates a unique slug, and returns a QR-ready public feedback URL.

### Customer Flow

```text
Scan QR -> Public Feedback Page -> Record Voice -> Submit -> Thank You
```

Customers do not need an account. They open the public campaign page, record up to 30 seconds of audio, submit it, and see a confirmation screen.

### AI Processing Flow

```text
Audio URL -> Speech-to-Text -> Transcript -> Sentiment Analysis -> Save Result
```

After the audio is uploaded, the backend starts asynchronous processing. The audio is transcribed, analyzed for sentiment, and the feedback document is updated.

### Dashboard Flow

```text
Login -> Dashboard -> Select Campaign -> Analytics -> Playback
```

The business owner can view response counts, sentiment distribution, transcript lists, and audio playback for each campaign.

## System Architecture

```text
Customer Browser
    |
    | Public feedback page
    v
React Frontend  <---------->  Express API
    |                            |
    |                            v
    |                       MongoDB Atlas
    |                            |
    | Audio upload               v
    +---------------------> Cloudinary
                                 |
                                 v
                         Async AI Processing
                                 |
                   Whisper + HuggingFace Inference
```

## Data Models

### User

```js
{
  _id,
  email,
  passwordHash,
  createdAt
}
```

### Campaign

```js
{
  _id,
  userId,
  name,
  promptText,
  slug,
  isActive,
  createdAt
}
```

### Feedback

```js
{
  _id,
  campaignId,
  audioUrl,
  transcript,
  sentimentLabel,
  sentimentScore,
  status,
  createdAt
}
```

`status` can be:

- `pending`
- `processing`
- `processed`
- `failed`

## Planned API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Campaigns

```http
POST /api/campaigns
GET /api/campaigns
GET /api/campaigns/:id
PATCH /api/campaigns/:id
DELETE /api/campaigns/:id
GET /api/campaigns/:id/analytics
```

### Public Feedback

```http
GET /api/public/campaigns/:slug
POST /api/feedback/:slug
```

## Environment Variables

Create a `.env` file inside the backend app.

```env
NODE_ENV=development
PORT=5000

CLIENT_URL=http://localhost:5173
API_BASE_URL=http://localhost:5000

MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_jwt_secret
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

OPENAI_API_KEY=your_openai_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

Create a `.env` file inside the frontend app.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Local Development

> Project scaffolding is planned as a monorepo with separate frontend and backend apps.

```text
AI_Powered_Review_App/
├── client/
├── server/
└── README.md
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## MVP Roadmap

### Phase 1: Setup

- Scaffold React frontend and Express backend.
- Connect MongoDB Atlas.
- Configure Cloudinary.
- Add `.env.example` files.
- Prepare Vercel and Render projects.

### Phase 2: Authentication

- Register endpoint.
- Login endpoint.
- JWT token generation.
- Protected route middleware.
- Frontend login and register screens.

### Phase 3: Campaigns and QR

- Campaign create/list/detail APIs.
- Unique slug generation.
- Public feedback URL.
- QR code display and download.

### Phase 4: Voice Recording

- Public campaign page.
- Microphone permission flow.
- MediaRecorder-based recording.
- 30-second recording limit.
- Re-record flow.
- Mobile-friendly recording UI.

### Phase 5: Audio Upload

- Multipart upload endpoint.
- Cloudinary upload integration.
- Feedback document creation.
- Immediate customer confirmation response.

### Phase 6: AI Processing

- Async processing worker.
- Whisper transcription.
- HuggingFace sentiment analysis.
- Retry and error handling.
- Feedback status updates.

### Phase 7: Analytics Dashboard

- Campaign analytics endpoint.
- Sentiment distribution.
- Response timeline.
- Transcript list.
- Audio playback.
- Empty, loading, and error states.

### Phase 8: Polish and Deploy

- Responsive UI pass.
- Production CORS setup.
- Vercel frontend deployment.
- Render backend deployment.
- End-to-end smoke test.
- Demo video and final documentation.

## MVP Checklist

- User registration and login
- Campaign creation and management
- QR code generation
- Public feedback page
- Voice recording
- Audio upload to Cloudinary
- Speech-to-text transcription
- Sentiment analysis
- Analytics dashboard
- Audio playback
- Production deployment

## Nice-to-Have Features

- CSV export
- Campaign active/inactive toggle
- Daily email summary
- Keyword extraction
- Word cloud
- Multi-language feedback
- Custom campaign branding
- Real-time dashboard updates

## Definition of Done

The MVP is complete when:

- A business owner can register, log in, and create a campaign.
- The campaign generates a QR code linked to a public feedback page.
- A customer can record and submit voice feedback without logging in.
- Audio is uploaded to Cloudinary and stored as a secure URL.
- AI transcription and sentiment analysis run successfully.
- The dashboard shows real campaign insights.
- The full flow works on a deployed production URL.

## Team Responsibilities

### Frontend Engineer

- React pages
- Tailwind UI
- Voice recording UI
- QR code display
- Dashboard charts
- Frontend routing and state handling

### Backend Engineer

- Express routes
- MongoDB models
- JWT authentication
- Campaign APIs
- Feedback upload APIs
- Analytics aggregation

### AI Engineer

- Whisper integration
- Sentiment analysis
- Async worker flow
- Error handling and retry logic
- Transcript and sentiment persistence

### Integration / DevOps Engineer

- Vercel deployment
- Render deployment
- Environment variables
- CORS configuration
- Smoke testing
- README and demo preparation

## License

This project is currently intended for MVP/demo use. A formal license can be added before public release.
