import React, { useMemo } from 'react';

// --- DATA LAYER ---
const PORTFOLIO_ALLOCATION = [
    { ticker: 'ET', name: 'Energy Transfer', sector: 'Energy/Midstream', allocation: 60000, percentage: 12, rationale: 'Highest yield, best-priced, double-digit DCF growth' },
    { ticker: 'EPD', name: 'Enterprise Products', sector: 'Energy/Midstream', allocation: 50000, percentage: 10, rationale: '28-year dividend growth streak, $6.5B project backlog' },
    { ticker: 'PEP', name: 'PepsiCo', sector: 'Consumer Staples', allocation: 55000, percentage: 11, rationale: '54-year streak, defensive dual-category structure' },
    { ticker: 'PG', name: 'Procter & Gamble', sector: 'Consumer Staples', allocation: 50000, percentage: 10, rationale: '70-year streak, essential product resilience' },
    { ticker: 'ABBV', name: 'AbbVie', sector: 'Healthcare', allocation: 50000, percentage: 10, rationale: 'Pivoting to faster-growing pharma segments' },
    { ticker: 'DOC', name: 'Healthpeak', sector: 'Healthcare', allocation: 45000, percentage: 9, rationale: '6% yield, monthly dividends, aging demographics' },
    { ticker: 'O', name: 'Realty Income', sector: 'Real Estate', allocation: 50000, percentage: 10, rationale: '5.1% yield, monthly dividends, 113+ increases' },
    { ticker: 'VZ', name: 'Verizon', sector: 'Telecom', allocation: 50000, percentage: 10, rationale: '5.6% yield, $20B FCF' },
    { ticker: 'BAC', name: 'Bank of America', sector: 'Financials', allocation: 45000, percentage: 9, rationale: '29% payout ratio, 14.3% dividend growth' },
    { ticker: 'CMI', name: 'Cummins', sector: 'Industrials', allocation: 45000, percentage: 9, rationale: 'Data center exposure, 10% dividend increase' },
];

// --- REUSABLE UI COMPONENTS ---
const StatCard = ({ title, value, subtitle }) => (
    <div className="stat-card">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
        {subtitle && (
            <p className="stat-change">{subtitle}</p>
        )}
    </div>
);

const HoldingRow = ({ holding }) => {
    return (
        <tr className="holding-row">
            <td className="sector">{holding.sector}</td>
            <td>
                <div className="holding-name">
                    <span className="ticker">{holding.ticker}</span>
                    <span className="company-name">{holding.name}</span>
                </div>
            </td>
            <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600' }}>${holding.allocation.toLocaleString()}</span>
                    <span style={{ fontSize: '0.8rem', color: '#8892b0' }}>{holding.percentage}% weight</span>
                </div>
            </td>
            <td style={{ color: '#8892b0', fontSize: '0.9rem', lineHeight: '1.4' }}>{holding.rationale}</td>
        </tr>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
const PortfolioDashboard = () => {
    const totals = useMemo(() => {
        const totalAllocated = PORTFOLIO_ALLOCATION.reduce((sum, h) => sum + h.allocation, 0);
        const totalPercentage = PORTFOLIO_ALLOCATION.reduce((sum, h) => sum + h.percentage, 0);

        return {
            totalAllocated: totalAllocated.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }),
            totalPercentage,
            positionCount: PORTFOLIO_ALLOCATION.length,
        };
    }, []);

    return (
        <div className="portfolio-dashboard">
            <header className="dashboard-header">
                <h1>📊 Equity Portfolio Dashboard</h1>
                <p>Suggested Allocation Framework ($500,000)</p>
            </header>

            {/* Stats Overview */}
            <div className="stats-grid">
                <StatCard title="Total Allocation" value={totals.totalAllocated} subtitle="Target capital" />
                <StatCard title="Positions" value={totals.positionCount} subtitle="Mid to large caps only" />
                <StatCard title="Total Weight" value={`${totals.totalPercentage}%`} subtitle="Fully invested" />
            </div>

            {/* Holdings Table */}
            <div className="table-container">
                <table className="holdings-table">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>Sector</th>
                            <th style={{ width: '25%' }}>Pick</th>
                            <th style={{ width: '15%' }}>Allocation</th>
                            <th style={{ width: '45%' }}>Rationale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PORTFOLIO_ALLOCATION.map(holding => (
                            <HoldingRow key={holding.ticker} holding={holding} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CSS Styles */}
            <style jsx>{`
        .portfolio-dashboard {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #0a0e27;
          color: #e0e6f1;
          padding: 2rem;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #8892b0;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: linear-gradient(145deg, #151a30, #0f1428);
          border: 1px solid #1e2749;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .stat-card h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8892b0;
          margin-bottom: 0.75rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .stat-change {
          font-size: 0.9rem;
          font-weight: 600;
          color: #8892b0;
        }

        .table-container {
          background: #0f1428;
          border: 1px solid #1e2749;
          border-radius: 12px;
          overflow: hidden;
        }

        .holdings-table {
          width: 100%;
          border-collapse: collapse;
        }

        .holdings-table thead {
          background: #151a30;
        }

        .holdings-table th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8892b0;
          font-weight: 600;
          border-bottom: 1px solid #1e2749;
        }

        .holdings-table td {
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          border-bottom: 1px solid #1a2240;
          vertical-align: middle;
        }

        .holding-row {
          transition: background 0.15s ease;
        }

        .holding-row:hover {
          background: #141a33;
        }

        .holding-name {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .ticker {
          font-weight: 700;
          color: #667eea;
          font-size: 0.95rem;
        }

        .company-name {
          font-size: 0.8rem;
          color: #6b7a9e;
        }

        .sector {
          color: #ffffff;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .portfolio-dashboard { padding: 1rem; }
          .dashboard-header h1 { font-size: 1.75rem; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .holdings-table th, .holdings-table td { padding: 0.75rem 0.5rem; font-size: 0.8rem; }
        }
      `}</style>
        </div>
    );
};

export default PortfolioDashboard;