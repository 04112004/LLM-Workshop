import streamlit as st
import requests

st.title("AI Business Strategy Consultant")

with st.form("business_form"):
    idea = st.text_input("Business Idea")
    target_audience = st.text_input("Target Audience")
    budget = st.number_input("Budget", min_value=0.0, step=100.0)
    location = st.text_input("Location")
    industry = st.text_input("Industry")
    submitted = st.form_submit_button("Analyze")

if submitted:
    payload = {
        "idea": idea,
        "target_audience": target_audience,
        "budget": budget,
        "location": location,
        "industry": industry,
    }
    try:
        resp = requests.post("http://localhost:8000/analyze", json=payload)
        data = resp.json()
        st.json(data)
    except Exception as e:
        st.error(f"Request failed: {e}")
