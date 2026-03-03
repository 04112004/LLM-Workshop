from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
from schemas import BusinessInput
from prompts import generate_prompt
from llm import call_llm

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
def analyze_business(data: BusinessInput):
    prompt = generate_prompt(data)
    result = call_llm(prompt)
    return {"analysis": result}
