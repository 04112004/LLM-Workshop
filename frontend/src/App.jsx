import React, { useState } from 'react';
import {
    Rocket,
    Zap,
    TrendingUp,
    ShieldAlert,
    Building2,
    ChevronRight,
    ArrowRight,
    BarChart3,
    Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import confetti from 'canvas-confetti';

const App = () => {
    const [formData, setFormData] = useState({
        idea: '',
        target_audience: '',
        budget: '',
        location: '',
        industry: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idea: formData.idea,
                    target_audience: formData.target_audience,
                    budget: parseFloat(formData.budget) || 0,
                    location: formData.location,
                    industry: formData.industry
                })
            });

            if (!response.ok) throw new Error('Analysis failed. Please try again.');

            const rawData = await response.json();
            let data = rawData.analysis;
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            setResult(data);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#a855f7', '#22d3ee']
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const chartData = result ? [
        { name: 'Year 1', revenue: result.financial_projection.year_1.revenue, profit: result.financial_projection.year_1.profit },
        { name: 'Year 2', revenue: result.financial_projection.year_2.revenue, profit: result.financial_projection.year_2.profit },
        { name: 'Year 3', revenue: result.financial_projection.year_3.revenue, profit: result.financial_projection.year_3.profit },
    ] : [];

    return (
        <div className="app-container">
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.5rem', borderRadius: '0.75rem' }}>
                        <Rocket color="white" size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>VisionaryAI</h2>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Professional 2.0</div>
            </nav>

            <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}
                    >
                        Architect Your <span style={{ color: 'var(--primary)' }}>Future</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}
                    >
                        Leverage elite-level AI to transform your business idea into a data-backed strategic roadmap.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    <motion.div
                        layout
                        className="glass-card"
                        style={{ maxWidth: result ? '100%' : '600px', margin: '0 auto' }}
                    >
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Zap size={20} color="var(--accent)" />
                            Business Parameters
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: result ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr', gap: '1rem' }}>
                                <div className="input-group">
                                    <label className="input-label">Business Idea</label>
                                    <input className="text-input" name="idea" placeholder="e.g. AI Urban Farming" value={formData.idea} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Target Audience</label>
                                    <input className="text-input" name="target_audience" placeholder="e.g. Homeowners" value={formData.target_audience} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Budget ($)</label>
                                    <input className="text-input" type="number" name="budget" placeholder="50000" value={formData.budget} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Location</label>
                                    <input className="text-input" name="location" placeholder="e.g. London" value={formData.location} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Industry</label>
                                    <input className="text-input" name="industry" placeholder="e.g. AgTech" value={formData.industry} onChange={handleChange} required />
                                </div>
                            </div>
                            <button className="btn-primary" type="submit" disabled={loading} style={{ width: result ? 'auto' : '100%', marginTop: '1rem' }}>
                                {loading ? <><div className="loader"></div> Processing...</> : <>Generate Report <ArrowRight size={18} /></>}
                            </button>
                        </form>
                        {error && <p style={{ color: 'var(--danger)', marginTop: '1rem' }}>{error}</p>}
                    </motion.div>

                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}
                            >
                                <div className="glass-card" style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                                    <div style={{ flex: 2 }}>
                                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Executive Report</h2>
                                        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{result.summary}</p>
                                    </div>
                                    <div className="score-gauge" style={{ flex: 1 }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div className="score-value">{result.investor_readiness.score}</div>
                                            <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Investor Readiness</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <BarChart3 size={20} color="var(--primary)" /> SWOT Analysis
                                    </h3>
                                    <div className="grid-swot">
                                        <div className="swot-box swot-strength">
                                            <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--success)', marginBottom: '0.5rem' }}>STRENGTHS</div>
                                            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>{result.swot.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                        </div>
                                        <div className="swot-box swot-weakness">
                                            <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--danger)', marginBottom: '0.5rem' }}>WEAKNESSES</div>
                                            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>{result.swot.weaknesses.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                        </div>
                                        <div className="swot-box swot-opportunity">
                                            <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>OPPORTUNITIES</div>
                                            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>{result.swot.opportunities.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                        </div>
                                        <div className="swot-box swot-threat">
                                            <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--warning)', marginBottom: '0.5rem' }}>THREATS</div>
                                            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem' }}>{result.swot.threats.map((s, i) => <li key={i}>{s}</li>)}</ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <TrendingUp size={20} color="var(--primary)" /> 3-Year Forecast
                                    </h3>
                                    <div style={{ height: '300px', width: '100%' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                                <XAxis dataKey="name" stroke="var(--text-muted)" />
                                                <YAxis stroke="var(--text-muted)" />
                                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                                <Legend />
                                                <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                                                <Bar dataKey="profit" fill="var(--accent)" radius={[4, 4, 0, 0]} name="Profit ($)" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Building2 size={20} color="var(--primary)" /> Strategy
                                    </h3>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.9rem' }}>Revenue Model</div>
                                        <p style={{ fontSize: '0.85rem' }}>{result.revenue_model.primary_stream}</p>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.9rem' }}>Marketing Channels</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            {result.marketing_plan.channels.map((c, i) => (
                                                <span key={i} style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)' }}>{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <ShieldAlert size={20} color="var(--danger)" /> Risks
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {result.risk_analysis.map((r, i) => (
                                            <div key={i} style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.02)' }}>
                                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.risk}</div>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.mitigation}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))' }}>
                                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Award size={20} color="var(--primary)" /> Improvement Areas
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                        {result.investor_readiness.key_improvement_areas.map((area, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                                <ChevronRight size={14} color="var(--primary)" /> {area}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', padding: '2rem' }}>
                <p>&copy; 2024 VisionaryAI Consultant. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
