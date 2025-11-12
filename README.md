# Personal Expense Tracker

## Features
- Dashboard where users can see a summary of their finances with D3js chart
- Transaction Management - Forms to add, edit and delete transactions
- Transaction Overview - Display a list of all transactions (add pagination). Allow users to filter transactions by date or category or amount.
- Budget Management - Display the user’s budget for the current month and compare it to their actual expenses with D3js chart

## How To Run

### Frontend

- cd to frontend directory `cd frontend`
- Install packages `npm i`
- Run dev server `npm run dev`

### Backend

- Create/Activate VENV
- cd to backend directory `cd backend`
- Create env file and add `DATABASE_URL` for Neon Postgres Database connection string
- Install packages `pip install -r requirements.txt`
- Apply migrations `python manage.py migrate`
- Run dev server `python manage.py runserver`

### Libraries/Packages Used

### Frontend
- react
- shadcn/radix-ui
- lucide icons
- dayjs
- react-router-dom
- tailwind
- D3js

### Backend
- Django Rest Framework
- djangorestframework_simplejwt
- drf-spectacular
- django-cors-headers

### Hosting & DB

Uses Render to host Backend, Vercel to host Frontend, Neon for PostgreSQL DBaaS