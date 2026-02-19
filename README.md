# Product EMI Platform

Full-stack EMI product application with a React (Vite) frontend, Express API, and PostgreSQL powered by Prisma ORM. It provides product catalogs, variants, and EMI plans, along with a modern responsive product detail UI.

## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, Prisma ORM
- Database: PostgreSQL
- Tooling: ESLint/Prettier ready (optional), Prisma migrations

## Architecture Diagram (text)
```
┌────────────────────────┐        HTTP/JSON        ┌──────────────────────────┐
│        Client          │  ───────────────────▶  │         Server           │
│ React + Vite + Tailwind│                        │ Express + Prisma          │
└──────────┬─────────────┘                        └──────────┬───────────────┘
					 │                                                   │
					 │                                                   │
					 │                                      ┌────────────▼──────────┐
					 └────────────────────────────────────▶ │    PostgreSQL DB      │
																									└───────────────────────┘
```

## Project Structure
```
client/        # React frontend
server/        # Express API
```

## Setup Instructions
### 1) Clone and install dependencies
```
cd client
npm install

cd ../server
npm install
```

### 2) Configure environment variables
Copy the example files and update values:
- client/.env.example → client/.env
- server/.env.example → server/.env

### 3) Run database migrations + seed
```
cd server
npx prisma migrate dev --name init
npx prisma db seed
```

### 4) Start the apps
```
# API
cd server
npm run dev

# Frontend
cd client
npm run dev
```

## Environment Variables
### client/.env
```
VITE_API_URL=http://localhost:4000
```

### server/.env
```
NODE_ENV=development
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:password@localhost:5432/emi_platform
```

## API Endpoints
Base URL: `http://localhost:4000`

### Health Check
`GET /api/health`
Response:
```
{
	"status": "ok",
	"service": "emi-platform-api",
	"timestamp": "2026-02-19T00:00:00.000Z"
}
```

### List Products
`GET /api/products`
Response:
```
{
	"status": "success",
	"data": [
		{
			"id": "uuid",
			"name": "Nova X1 5G",
			"slug": "nova-x1-5g",
			"price": "38999",
			"mrp": "44999",
			"imageUrl": "https://..."
		}
	]
}
```

### Product Detail
`GET /api/products/:slug`
Response:
```
{
	"status": "success",
	"data": {
		"id": "uuid",
		"name": "Nova X1 5G",
		"slug": "nova-x1-5g",
		"description": "6.6-inch AMOLED...",
		"mrp": "44999",
		"price": "38999",
		"imageUrl": "https://...",
		"variants": [
			{ "id": "uuid", "productId": "uuid", "storage": "128GB", "color": "Black" }
		],
		"emiPlans": [
			{
				"id": "uuid",
				"productId": "uuid",
				"monthlyAmount": "5625",
				"tenureMonths": 6,
				"interestRate": 0,
				"cashback": "750"
			}
		]
	}
}
```

## Database Schema (Prisma)
### Product
- `id` (uuid)
- `name`, `slug` (unique), `description`
- `mrp`, `price`, `imageUrl`
- Relations: `variants`, `emiPlans`

### Variant
- `id` (uuid)
- `productId` → Product
- `storage`, `color`

### EMIPlan
- `id` (uuid)
- `productId` → Product
- `monthlyAmount`, `tenureMonths`, `interestRate`, `cashback`

## Deployment Instructions
### Frontend (Vite)
```
cd client
npm run build
```
Deploy `client/dist` to any static host (Vercel, Netlify, S3).

### Backend (Express + Prisma)
1. Set environment variables in your hosting platform.
2. Run migrations:
```
npx prisma migrate deploy
```
3. Start the server:
```
npm run start
```

### Notes
- Ensure `CLIENT_ORIGIN` matches the deployed frontend URL.
- PostgreSQL must be reachable from the server environment.
