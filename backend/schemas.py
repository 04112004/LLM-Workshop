from pydantic import BaseModel


class BusinessInput(BaseModel):
    idea: str
    target_audience: str
    budget: float
    location: str
    industry: str
