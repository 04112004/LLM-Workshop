# VisionaryAI - Professional Business Strategy Consultant

VisionaryAI is a premium, AI-powered business consultant platform designed to transform raw business ideas into comprehensive, investor-ready strategic roadmaps. Using state-of-the-art LLMs, it provides actionable insights, financial projections, and risk assessments in seconds.

---

## 📋 Table of Contents
- [Description](#description)
- [Key Features](#-key-features)
- [Technology Stack](#️-technology-stack)
- [Setup & Installation](#-setup--installation)
- [Design Philosophy](#️-design-philosophy)
- [Environment Variables](#️-environment-variables)

---

## 📝 Description
 VisionaryAI acts as a virtual Chief Strategy Officer (CSO) for entrepreneurs and business leaders. By inputting basic business details—such as name, sector, and core concept—the platform generates a holistic strategic analysis. It bridges the gap between a vague idea and a structured business plan, providing the data-driven confidence needed to move projects forward.

## 🚀 Key Features

- **Executive Analysis**: Instant, high-impact summaries that capture the essence of your business concept.
- **Interactive SWOT Matrix**: A detailed 4-quadrant analysis covering Strengths, Weaknesses, Opportunities, and Threats.
- **3-Year Financial Projections**: Professional data visualizations of projected revenue and profit trends using dynamic charts.
- **Monetization Roadmap**: Strategic breakdown of primary and secondary revenue streams with suggested pricing models.
- **Risk Mitigation Strategy**: Proactive identification of market and operational roadblocks with step-by-step mitigation plans.
- **Investor Readiness Score**: A proprietary data-driven metric to evaluate how prepared your business is for external funding.

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 18 (Vite optimized)
- **Animations**: Framer Motion for smooth, high-end transitions
- **Data Visualization**: Recharts for interactive, responsive business charts
- **Icons**: Lucide React for consistent, modern iconography
- **Styling**: Custom CSS with Glassmorphism and CSS Variables

### **Backend**
- **Framework**: FastAPI (Python 3.11+)
- **Validation**: Pydantic for robust data schemas
- **Asynchronous Engine**: Uvicorn for high-performance request handling
- **Environment Management**: Python-dotenv

### **AI Intelligence**
- **Engine**: Groq Cloud Infrastructure
- **Model**: **Llama-3.3-70b-Versatile**
- **Capability**: Ultra-low latency inference for deep strategic reasoning

## 📦 Setup & Installation

### **1. Clone the Repository**
```bash
git clone <your-repo-url>
cd ai-business-consultant
```

### **2. Backend Configuration**
1.  **Navigate to directory**:
    ```bash
    cd backend
    ```
2.  **Set up Virtual Environment**:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate  # Windows
    source venv/bin/activate    # Linux/Mac
    ```
3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Environment Setup**: Create a `.env` file in the `backend` folder:
    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```
5.  **Run Server**:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

### **3. Frontend Configuration**
1.  **Navigate to directory**:
    ```bash
    cd ../frontend
    ```
2.  **Install Packages**:
    ```bash
    npm install
    ```
3.  **Start Development Client**:
    ```bash
    npm run dev
    ```

## ♻️ Environment Variables

The backend requires the following configuration in a `.env` file:

| Variable | Description | Source |
| :--- | :--- | :--- |
| `GROQ_API_KEY` | Your Groq Cloud API Key | [Groq Console](https://console.groq.com/) |

## 🖥️ Design Philosophy

VisionaryAI is built with a **"Rich Aesthetics"** mindset. We avoid the standard white-background bootstrap look in favor of a **Deep Slate & Glassmorphic** theme. 
- **Visuals**: Vibrant indigo/purple gradients for a high-techfeel.
- **Interaction**: Micro-animations on hover and state transitions to make the platform feel alive.
- **Professionalism**: Every component is designed to look like a high-end dashboard suitable for executive presentations.