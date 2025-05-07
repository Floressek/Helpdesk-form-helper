# AI Form Assistant

An application that uses generative AI (Google Gemini) to help users fill out a helpdesk form. Users can have a conversation with the AI assistant, which collects necessary information and fills out the form.

## Technologies

### Backend:
- Django 5.2
- Django REST Framework
- Python 3.12+
- Google Generative AI API (Gemini)

### Frontend:
- React 19
- TypeScript
- Axios (API communication)
- TailwindCSS

## Project Structure
```
project/
├── client/                  # Frontend React
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── assets/          # Images and other assets
│   │   ├── components/      # React components
│   │   │   ├── Chat/        # Chat-related components
│   │   │   ├── Form/        # Form-related components
│   │   │   └── Layout/      # Layout components
│   │   ├── context/         # React context providers
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript type definitions
│   ├── Dockerfile           # Docker configuration for frontend
│   └── nginx.conf           # Nginx configuration
└── server/                  # Backend Django
    ├── helpdesk/            # Main application
    │   ├── models.py        # Database models
    │   ├── serializers.py   # API serializers
    │   ├── services.py      # Business logic and AI integration
    │   ├── urls.py          # URL routing
    │   └── views.py         # API endpoints
    ├── src/                 # Django configuration
    │   ├── settings.py      # Django settings
    │   ├── urls.py          # Main URL configuration
    │   └── wsgi.py          # WSGI configuration
    ├── Dockerfile           # Docker configuration for backend
    └── pyproject.toml       # Dependencies (Poetry)
```

## Features

- Conversation with AI in a chat interface
- Dynamic form filling based on the conversation
- Real-time form state view
- Form validation (email format, field lengths, etc.)
- Form submission

## Requirements

- Docker and Docker Compose
- Google Gemini API key (to be placed in .env file)

## Installation and Setup

### Clone the repository

```bash
git clone https://github.com/your-username/ai-form-assistant.git
cd ai-form-assistant
```

### Environment variables setup

Create a `.env` file in the project root with:

```
GEMINI_API_KEY=your-api-key
DEBUG=False
SECRET_KEY=your-django-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Running with Docker Compose—FOR RECRUITMENT TASK

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8000/api/

## Usage

1. Open the application in your browser (http://localhost)
2. Start a conversation with the AI assistant, which will ask questions needed to fill out the form
3. The form on the left side will be automatically filled as you provide information
4. Once all fields are filled, you can submit the form

## Form Structure

The helpdesk form contains the following fields:
- First Name (string, max 20 characters)
- Last Name (string, max 20 characters)
- Email (string, validated format)
- Reason of Contact (string, max 100 characters)
- Urgency (integer, range 1-10)

## Development Setup

### Backend (Django server):
```bash
cd server
poetry install
poetry run python manage.py runserver
```

### Frontend (React app):
```bash
cd client
npm install
npm run dev
```

## First Time Setup for development

### Backend:
```bash
cd server
poetry install
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend:
```bash
cd client
npm install
npm run dev
```

## Author

Szymon Florek