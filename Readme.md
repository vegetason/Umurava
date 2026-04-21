# 🧠 Umurava AI — Talent Screening Engine

> *Built for the Umurava AI Hackathon · Theme: AI Products for the Human Resources Industry*

---

## What Is This?

Umurava AI is a backend API that uses **Google Gemini** to automatically parse resumes, build structured talent profiles, and score candidates against job descriptions — so recruiters spend time on people, not paperwork.

Upload a stack of CVs (PDF, DOCX, or a ZIP). Get back a ranked shortlist. Every score is broken down and explained.

---

## The Problem It Solves

Recruiters face two brutal realities:

- **Volume** — hundreds of applications per role, most reviewed in under 10 seconds
- **Bias & inconsistency** — comparing a polished PDF from one candidate to a plain-text resume from another is apples to oranges

This system standardizes the chaos: every applicant, regardless of format, gets evaluated against the same job criteria using the same AI model, with a transparent score breakdown.

---

## How It Works

```
Upload CVs (PDF / DOCX / ZIP)
        ↓
Text extraction (pdf-parse + mammoth)
        ↓
Gemini AI parses raw text → structured TalentProfile
        ↓
Profiles saved to MongoDB
        ↓
Gemini AI scores each profile against a JobDescription
        ↓
Ranked shortlist returned with score breakdown + summary
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express 5 |
| Database | MongoDB via Mongoose |
| AI | Google Gemini (`@google/generative-ai`) |
| File Parsing | `pdf-parse`, `mammoth`, `adm-zip` |
| File Uploads | Multer |
| API Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Dev Tools | ts-node-dev, nodemon |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-org/umurava-ai.git
cd umurava-ai
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=3004
MONGO_URL=mongodb://localhost:27017/umurava
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a Gemini API key at [aistudio.google.com](https://aistudio.google.com).

### 3. Run in Development

```bash
npm run dev
```

Server starts at `http://localhost:3004`  
Swagger UI available at `http://localhost:3004/docs`

---

## API Overview

### Talent

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/talent/getData` | Upload resumes → parse & save profiles |
| `GET` | `/api/talent/getTalents` | Get all profiles, ranked by score |
| `GET` | `/api/talent/getTalentInfo` | Get a single talent profile |
| `POST` | `/api/talent/generateScore` | Score one talent against a job |
| `POST` | `/api/talent/generateScoreForAll` | Score all talents against a job |
| `DELETE` | `/api/talent/deleteTalent` | Delete a talent profile |
| `DELETE` | `/api/talent/deleteTalentsByJobDescription` | Delete all talents linked to a job |

### Job Description

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/jobDescription/createJobDescription` | Create a job description |
| `GET` | `/api/jobDescription/` | List all job descriptions |
| `GET` | `/api/jobDescription/getOne` | Get a single job description |
| `PUT` | `/api/jobDescription/update` | Update a job description |
| `DELETE` | `/api/jobDescription/delete` | Delete job + all linked talents |

---

## Example: Upload Resumes

```bash
curl -X POST http://localhost:3004/api/talent/getData \
  -F "resumes=@john_doe.pdf" \
  -F "resumes=@jane_smith.docx"
```

**Response:**
```json
{
  "saved": [
    {
      "file": "john_doe.pdf",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "headline": "Senior Backend Developer",
        "skills": [...],
        "talentScore": { "overallScore": 0 }
      }
    }
  ]
}
```

## Example: Score a Candidate

```bash
curl -X POST http://localhost:3004/api/talent/generateScore \
  -H "Content-Type: application/json" \
  -d '{
    "talentId": "664f1a2b3c4d5e6f7a8b9c0d",
    "jobDescriptionId": "774g2b3c4d5e6f7a8b9c1e2f"
  }'
```

**Response:**
```json
{
  "updatedScore": {
    "talentScore": {
      "overallScore": 84,
      "breakdown": {
        "skills": 90,
        "experience": 82,
        "education": 78,
        "projects": 88,
        "profileCompleteness": 95
      },
      "summary": "Strong match. Candidate has 4+ years of Node.js experience and has led API design in a similar domain. Minor gap in cloud infrastructure exposure."
    }
  }
}
```

---

## Talent Score Breakdown

Every scored candidate receives:

| Dimension | What it measures |
|---|---|
| **Skills** | Match between candidate skills and job requirements |
| **Experience** | Relevance of past roles, tenure, technologies used |
| **Education** | Degree level and field alignment |
| **Projects** | Demonstrated practical work and impact |
| **Profile Completeness** | Data quality and signal strength |
| **Overall Score** | Weighted composite (0–100) |

The AI also generates a human-readable **summary** explaining the score — strengths, gaps, and role fit. Recruiters always stay in control of the final decision.

---

## Supported Resume Formats

| Format | Support |
|---|---|
| `.pdf` | ✅ Full text extraction |
| `.docx` | ✅ Full text extraction |
| `.zip` | ✅ Recursively extracts and processes all PDFs/DOCXs inside |

Up to **20 files** per request. Files are automatically cleaned up after processing.

---

## Project Structure

```
umurava/
├── app.ts                        # Express app setup
├── server.ts                     # Entry point
├── swaggerSetup.ts               # Swagger configuration
├── src/
│   ├── controllers/              # Route handlers
│   │   ├── generateDataFromResume.controller.ts
│   │   ├── generateScore.controller.ts
│   │   ├── jobDescription.controller.ts
│   │   └── talentProfile.controller.ts
│   ├── services/                 # Business logic
│   │   ├── gemni.service.ts      # Gemini AI integration
│   │   ├── talentProfile.service.ts
│   │   ├── jobDescription.service.ts
│   │   ├── multer.service.ts     # File upload config
│   │   └── index.ts              # File parsing utilities
│   ├── database/
│   │   ├── database.ts           # MongoDB connection
│   │   ├── models/               # Mongoose models
│   │   └── schemas/              # Mongoose schemas
│   ├── routes/                   # Express routes + Swagger JSDoc
│   └── types/                    # TypeScript interfaces
```

---

## Hackathon Context

Built for the **Umurava AI Hackathon** under the theme:

> *"An innovation challenge to build AI Products for the Human Resources Industry"*

This submission addresses both hackathon scenarios:

- **Scenario 1** — Screening from structured talent profiles stored in the platform
- **Scenario 2** — Screening from uploaded resumes (PDF, DOCX, ZIP)

The system is designed to augment — not replace — human recruiters. AI produces ranked shortlists with transparent reasoning; the final hiring decision always belongs to a human.

---

## License

ISC