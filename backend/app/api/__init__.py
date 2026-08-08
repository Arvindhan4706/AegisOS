from fastapi import APIRouter
from app.api import agents, missions, events, memory, security, orchestration

router = APIRouter()

router.include_router(agents.router, prefix="/api/agents", tags=["agents"])
router.include_router(missions.router, prefix="/api/missions", tags=["missions"])
router.include_router(events.router, prefix="/api/events", tags=["events"])
router.include_router(memory.router, prefix="/api/memory", tags=["memory"])
router.include_router(security.router, prefix="/api", tags=["security"])
router.include_router(orchestration.router, prefix="/api/orchestrator", tags=["orchestrator"])
