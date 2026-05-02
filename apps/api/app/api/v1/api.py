from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, events, alerts, playbooks, cases, audit
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(playbooks.router, prefix="/playbooks", tags=["playbooks"])
api_router.include_router(cases.router, prefix="/cases", tags=["cases"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
