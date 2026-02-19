# Product EMI Platform

Full-stack starter with a React (Vite) client and Express + Prisma server.

## Structure
- client/ (React + Vite)
- server/ (Express + Prisma + PostgreSQL)

## Environment
Copy env examples:
- client/.env.example -> client/.env
- server/.env.example -> server/.env

## Install
Client:
1. cd client
2. npm install
3. npm run dev

Server:
1. cd server
2. npm install
3. npm run prisma:generate
4. npm run dev

## Health Check
GET http://localhost:4000/api/health
