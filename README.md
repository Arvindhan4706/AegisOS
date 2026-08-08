# AegisOS

Autonomous Mission Operating System for Critical AI Agents

"Run. Remember. Recover. Govern."

## Overview
AegisOS is a prototype of an operating environment/harness for autonomous AI agents. It provides agent execution, orchestration, long-term memory, trust evaluation, tool permissions, human approval, failure recovery, monitoring, auditability, and mission replay.

**Note:** This prototype simulates autonomous agent execution and recovery. It does not provide unrestricted execution of arbitrary code or access to real production systems.

## Project Structure
- `frontend/`: Next.js 15+ React Application
- `backend/`: FastAPI Python Application

## Installation & Running

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
