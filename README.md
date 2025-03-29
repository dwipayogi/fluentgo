# FluentGo - Video Conferencing for Language Learning

FluentGo is a video conferencing web application designed specifically for language learning. It provides a platform for users to practice speaking and listening skills in real-time with AI-powered mentoring.

## Features

- **Real-time Video Conferencing** - Connect with language partners or AI mentors
- **Translation Tools** - Get instant translations during conversations
- **Pronunciation Feedback** - Improve your accent and speaking skills
- **Gamification** - Learn through interactive exercises and challenges
- **Analytics** - Track your progress and language learning journey
- **Dark/Light Mode** - Comfortable UI for any environment

## Technologies Used

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn
- **Real-time Communication**: LiveKit
- **AI Engine**: Groq
- **AI Models**: whisper-large-v3-turbo (Text To Speech), llama-3.3-70b-versatile (LLM), playai-tts (Text To Speech)
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd meet
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   JWT_SECRET=your_jwt_secret
   LIVEKIT_API_KEY=your_livekit_api_key
   LIVEKIT_API_SECRET=your_livekit_api_secret
   LIVEKIT_URL=your_livekit_url
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── layout.tsx        # Root layout with theme provider
├── page.tsx          # Landing page
├── agent/            # AI agent functionality
├── dashboard/        # Dashboard and user features
├── rooms/            # Video conference rooms
├── signin/           # Authentication pages
└── signup/           # User registration
components/
├── ui/               # Reusable UI components
└── dashboard/        # Dashboard-specific components
lib/
├── auth.ts           # Authentication utilities
├── db.ts             # Database connection and queries
└── utils.ts          # Helper functions
context/
└── UserContext.tsx   # User authentication context
```