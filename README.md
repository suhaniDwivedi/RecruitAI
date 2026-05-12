# RecruitAI

RecruitAI is a full-stack recruitment platform.

## Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Django, Django REST Framework
- **Database**: MySQL

## Project Structure
- `backend/`: Django backend project
- `frontend/`: React frontend project

## Setup Instructions

### Virtual Environment (Important)
Please create the Python virtual environment (`.venv`) in the **root folder** of the project:

```bash
# From the project root (d:\projects\recruitAI\RecruitAI)
python -m venv .venv
```

Activate the virtual environment:
- Windows:
  ```bash
  .venv\Scripts\activate
  ```
- macOS/Linux:
  ```bash
  source .venv/bin/activate
  ```

### Backend Setup

1. **Install Dependencies**
   Navigate to the `backend` directory and install the requirements:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run Migrations and Server**
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup

1. **Install Dependencies**
   Navigate to the `frontend` directory and install the dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
