import React, { useState, useEffect } from 'react';

const CONFIG = {
  positions: [
    { platform: 'Vest (Forex)', size: 7000, leverage: 15, type: 'funding', apr: 5 },
    { platform: 'Hyperliquid', size: 5000, leverage: 1, type: 'funding', apr: 12 },
    { platform: 'Polymarket', size: 3000, leverage: 1, type: 'prediction', apr: 0 },
    { platform: 'Stocks', size: 10000, leverage: 1, type: 'spot', apr: 0 },
    { platform: 'Livret A', size: 5000, leverage: 1, type: 'savings', apr: 3 },
  ],
  watchlists: {
    uranium: { symbols: ['CCJ', 'URA', 'URNM', 'NXE', 'DNN'], thesis: 'Déficit offre/demande structurel' },
    japan: { symbols: ['EWJ', 'DXJ', 'MUFG'], thesis: 'Fin déflation, yen faible' },
    semiconductors: { symbols: ['NVDA', 'ASML', 'TSM', 'AMD', 'LRCX'], thesis: 'IA, data centers' },
    defense: { symbols: ['LMT', 'RTX', 'PLTR', 'AVAV'], thesis: 'Réarmement global' },
    space: { symbols: ['RKLB', 'PL', 'LUNR'], thesis: 'NewSpace, satellites' },
    robotics: { symbols: ['ISRG', 'TER', 'FANUY'], thesis: 'Automation' },
    copper: { symbols: ['FCX', 'SCCO', 'COPX'], thesis: 'Électrification, EVs' },
    energy_infra: { symbols: ['PWR', 'ETN'], thesis: 'Grid + data centers' },
  },
  riskRules: { maxPerPlatform: 30, minPlatforms: 4, maxLeverage: 20, stopLoss: 10 }
};

const Icons = {
  Zap: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  TrendingUp: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  TrendingDown: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>,
  Shield: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2}/><circle cx="12" cy="12" r="6" strokeWidth={2}/><circle cx="12" cy="12" r="2" strokeWidth={2}/></svg>,
  PieChart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /></svg>,
  AlertTriangle: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Refresh: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  DollarSign: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Percent: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
};

const Card = ({ children, className = '', alert = false }) => (
  <div className={`bg-gray-900 border rounded-xl p-4 ${alert ? 'border-yellow-600' : 'border-gray-800'} ${className}`}>{children}</div>
);

const Badge = ({ children, variant = 'default' }) => {
  const styles = { default: 'bg-gray-800 text-gray-300', success: 'bg-green-900/50 text-green-400 border border-green-800', danger: 'bg-red-900/50 text-red-400 border border-red-800', warning: 'bg-yellow-900/50 text-yellow-400 border border-yellow-800', info: 'bg-blue-900/50 text-blue-400 border border-blue-800' };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[variant]}`}>{children}</span>;
};

const Change = ({ value }) => {
  const isPos = value >= 0;
  return <span className={`flex items-center gap-1 text-sm ${isPos ? 'text-green-400' : 'text-red-400'}`}>{isPos ? <Icons.TrendingUp /> : <Icons.TrendingDown />}{isPos ? '+' : ''}{value.toFixed(2)}%</span>;
};

const ProgressBar = ({ value, max = 100, color = 'blue' }) => {
  const pct = Math.min(100, (value / max) * 100);
  const colors = { blue: 'bg-blue-500', green: 'bg-green-500', yellow: 'bg-yellow-500', red: 'bg-red-500' };
  return <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className={`h-full ${colors[color]} rounded-full`} style={{ width: `${pct}%` }} /></div>;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [positions] = useState(CONFIG.positions);
  const [stockPrices, setStockPrices] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [fundingRates, setFundingRates] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const totalCapital = positions.reduce((a, b) => a + b.size, 0);
  const byPlatform = positions.reduce((acc, p) => { acc[p.platform] = (acc[p.platform] || 0) + p.size; return acc; }, {});
  const platformPcts = Object.entries(byPlatform).map(([name, size]) => ({ name, size, pct: (size / totalCapital * 100).toFixed(1) }));
  const yearlyYield = positions.reduce((acc, p) => p.type === 'funding' ? acc + (p.size * p.leverage * p.apr / 100) : acc + (p.size * p.apr / 100), 0);

  const alerts = [];
  platformPcts.forEach(p => { if (parseFloat(p.pct) > CONFIG.riskRules.maxPerPlatform) alerts.push(`⚠️ ${p.name}: ${p.pct}% (max: ${CONFIG.riskRules.maxPerPlatform}%)`); });
  if (platformPcts.length < CONFIG.riskRules.minPlatforms) alerts.push(`⚠️ ${platformPcts.length} plateformes (min: ${CONFIG.riskRules.minPlatforms})`);
  const riskScore = Math.min(100, Math.max(...platformPcts.map(p => parseFloat(p.pct))) * 1.5);

  useEffect(() => {
    setFundingRates({ 'BTC': { hyperliquid: 12.5, binance: 10.2, bybit: 11.8 }, 'ETH': { hyperliquid: 8.3, binance: 7.1, bybit: 9.2 }, 'SOL': { hyperliquid: 15.2, binance: 12.8, bybit: 14.1 }, 'EUR/USD': { vest: 5.0 }, 'GBP/USD': { vest: 5.7 } });
    setPredictions([
      { question: 'Will Bitcoin reach $100k in 2025?', yes: 0.72, volume: 2500000 },
      { question: 'Will Fed cut rates in Q1 2025?', yes: 0.88, volume: 1800000 },
      { question: 'Will ETH ETF be approved?', yes: 0.91, volume: 890000 },
      { question: 'Will oil hit $100/barrel?', yes: 0.35, volume: 450000 },
    ]);
    const mockPrices = {};
    Object.entries(CONFIG.watchlists).forEach(([sector, data]) => {
      mockPrices[sector] = data.symbols.map(s => ({ symbol: s, price: (Math.random() * 200 + 20).toFixed(2), change: (Math.random() * 10 - 5).toFixed(2) }));
    });
    setStockPrices(mockPrices);
  }, []);

  const arbitrageOpps = Object.entries(fundingRates).filter(([_, rates]) => Object.keys(rates).length > 1).map(([symbol, rates]) => {
    const sorted = Object.entries(rates).sort((a, b) => a[1] - b[1]);
    return { symbol, spread: (sorted[sorted.length - 1][1] - sorted[0][1]).toFixed(1), long: sorted[0][0], short: sorted[sorted.length - 1][0], longRate: sorted[0][1], shortRate: sorted[sorted.length - 1][1] };
  }).filter(o => parseFloat(o.spread) > 2).sort((a, b) => parseFloat(b.spread) - parseFloat(a.spread));

  const highProbPredictions = predictions.filter(p => Math.max(p.yes, 1 - p.yes) >= 0.85);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Icons.PieChart },
    { id: 'funding', label: 'Funding', icon: Icons.Percent },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
    { id: 'stocks', label: 'Stocks', icon: Icons.DollarSign },
    { id: 'risk', label: 'Risk', icon: Icons.Shield },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2"><span className="text-yellow-400"><Icons.Zap /></span>Trading Dashboard</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Màj: {lastUpdate.toLocaleTimeString()}</span>
            <button onClick={() => setLastUpdate(new Date())} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"><Icons.Refresh /></button>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
              <tab.icon />{tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="space-y-4">
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card><div className="text-gray-500 text-xs uppercase">Capital Total</div><div className="text-2xl font-bold">${totalCapital.toLocaleString()}</div></Card>
              <Card><div className="text-gray-500 text-xs uppercase">Yield Annuel Est.</div><div className="text-2xl font-bold text-green-400">${yearlyYield.toFixed(0)}</div><div className="text-xs text-gray-500">{(yearlyYield / totalCapital * 100).toFixed(1)}% APR</div></Card>
              <Card><div className="text-gray-500 text-xs uppercase">Opportunités</div><div className="text-2xl font-bold">{arbitrageOpps.length}</div><div className="text-xs text-gray-500">arbitrage funding</div></Card>
              <Card><div className="text-gray-500 text-xs uppercase">Risk Score</div><div className="text-2xl font-bold">{riskScore.toFixed(0)}/100</div><ProgressBar value={riskScore} color={riskScore < 40 ? 'green' : riskScore < 70 ? 'yellow' : 'red'} /></Card>
            </div>
            {alerts.length > 0 && <Card alert><div className="flex items-center gap-2 text-yellow-400 mb-2"><Icons.AlertTriangle /><span className="font-semibold">Alertes</span></div>{alerts.map((a, i) => <div key={i} className="text-sm text-gray-300">{a}</div>)}</Card>}
            <div className="grid lg:grid-cols-2 gap-4">
              <Card><h3 className="font-semibold mb-3 flex items-center gap-2 text-yellow-400"><Icons.Zap />Top Arbitrage</h3>{arbitrageOpps.slice(0, 3).map((o, i) => <div key={i} className="flex justify-between items-center p-2 bg-gray-800/50 rounded mb-2"><div><span className="font-mono font-bold">{o.symbol}</span><div className="text-xs text-gray-500">Long {o.long} → Short {o.short}</div></div><Badge variant="success">{o.spread}%</Badge></div>)}</Card>
              <Card><h3 className="font-semibold mb-3 flex items-center gap-2 text-green-400"><Icons.Target />Bets High Prob</h3>{highProbPredictions.slice(0, 3).map((p, i) => <div key={i} className="flex justify-between items-center p-2 bg-gray-800/50 rounded mb-2"><span className="text-sm truncate flex-1 pr-2">{p.question.slice(0, 35)}...</span><Badge variant="success">{(Math.max(p.yes, 1 - p.yes) * 100).toFixed(0)}%</Badge></div>)}</Card>
            </div>
            <Card><h3 className="font-semibold mb-3 flex items-center gap-2"><Icons.PieChart />Allocation</h3><div className="space-y-2">{platformPcts.map((p, i) => <div key={i}><div className="flex justify-between text-sm mb-1"><span>{p.name}</span><span>${p.size.toLocaleString()} ({p.pct}%)</span></div><ProgressBar value={parseFloat(p.pct)} color={parseFloat(p.pct) > 30 ? 'red' : parseFloat(p.pct) > 20 ? 'yellow' : 'blue'} /></div>)}</div></Card>
          </>
        )}

        {activeTab === 'funding' && (
          <>
            <Card alert={arbitrageOpps.length > 0}><h3 className="font-semibold mb-3 flex items-center gap-2 text-yellow-400"><Icons.Zap />Opportunités d'Arbitrage</h3>{arbitrageOpps.map((o, i) => <div key={i} className="p-3 bg-gray-800/50 rounded-lg mb-2"><div className="flex justify-between items-center"><span className="font-mono font-bold text-lg">{o.symbol}</span><Badge variant="success">{o.spread}% spread</Badge></div><div className="text-sm text-gray-400 mt-1">Long sur <span className="text-green-400">{o.long}</span> ({o.longRate}%) → Short sur <span className="text-red-400">{o.short}</span> ({o.shortRate}%)</div></div>)}</Card>
            <Card><h3 className="font-semibold mb-3">Tous les Funding Rates (APR)</h3><table className="w-full text-sm"><thead><tr className="text-gray-500 border-b border-gray-800"><th className="text-left pb-2">Symbol</th><th className="text-right pb-2">Hyperliquid</th><th className="text-right pb-2">Binance</th><th className="text-right pb-2">Bybit</th><th className="text-right pb-2">Vest</th></tr></thead><tbody>{Object.entries(fundingRates).map(([symbol, rates]) => <tr key={symbol} className="border-b border-gray-800/50"><td className="py-2 font-mono font-bold">{symbol}</td><td className={`py-2 text-right ${rates.hyperliquid ? 'text-green-400' : 'text-gray-600'}`}>{rates.hyperliquid ? `${rates.hyperliquid}%` : '-'}</td><td className={`py-2 text-right ${rates.binance ? 'text-green-400' : 'text-gray-600'}`}>{rates.binance ? `${rates.binance}%` : '-'}</td><td className={`py-2 text-right ${rates.bybit ? 'text-green-400' : 'text-gray-600'}`}>{rates.bybit ? `${rates.bybit}%` : '-'}</td><td className={`py-2 text-right ${rates.vest ? 'text-green-400' : 'text-gray-600'}`}>{rates.vest ? `${rates.vest}%` : '-'}</td></tr>)}</tbody></table></Card>
            <Card><h3 className="font-semibold mb-3">💰 Calculateur de Rendement</h3><div className="grid grid-cols-3 gap-4"><div className="p-3 bg-gray-800/50 rounded"><div className="text-gray-400 text-xs">Position 100k$ @ 5% APR</div><div className="text-xl font-bold text-green-400">$13.70/jour</div></div><div className="p-3 bg-gray-800/50 rounded"><div className="text-gray-400 text-xs">Position 100k$ @ 10% APR</div><div className="text-xl font-bold text-green-400">$27.40/jour</div></div><div className="p-3 bg-gray-800/50 rounded"><div className="text-gray-400 text-xs">Position 100k$ @ 15% APR</div><div className="text-xl font-bold text-green-400">$41.10/jour</div></div></div></Card>
          </>
        )}

        {activeTab === 'predictions' && (
          <>
            <Card><h3 className="font-semibold mb-3 flex items-center gap-2 text-green-400"><Icons.Target />Bets Haute Probabilité (≥85%)</h3>{highProbPredictions.map((p, i) => { const prob = Math.max(p.yes, 1 - p.yes); const side = p.yes > 0.5 ? 'YES' : 'NO'; return <div key={i} className="p-3 bg-gray-800/50 rounded-lg mb-2"><div className="flex justify-between items-start"><p className="flex-1 pr-4">{p.question}</p><Badge variant="success">{side} @ {(prob * 100).toFixed(0)}%</Badge></div><div className="flex gap-4 mt-2 text-sm text-gray-400"><span>Return: {((1 / prob - 1) * 100).toFixed(1)}%</span><span>Vol: ${(p.volume / 1000000).toFixed(1)}M</span></div></div>; })}</Card>
            <Card><h3 className="font-semibold mb-3">Tous les marchés</h3>{predictions.map((p, i) => <div key={i} className="flex justify-between items-center p-2 bg-gray-800/30 rounded mb-2"><span className="flex-1 truncate pr-4 text-sm">{p.question}</span><div className="flex gap-2"><span className="text-green-400 font-mono text-sm">Y:{(p.yes * 100).toFixed(0)}%</span><span className="text-red-400 font-mono text-sm">N:{((1 - p.yes) * 100).toFixed(0)}%</span></div></div>)}</Card>
          </>
        )}

        {activeTab === 'stocks' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(CONFIG.watchlists).map(([sector, data]) => { const stocks = stockPrices[sector] || []; const avgChange = stocks.length ? stocks.reduce((a, b) => a + parseFloat(b.change), 0) / stocks.length : 0; return <Card key={sector}><h4 className="font-semibold capitalize text-sm">{sector.replace('_', ' ')}</h4><div className="flex justify-between items-center mt-1"><span className="text-xs text-gray-500">{data.symbols.length} stocks</span><Change value={avgChange} /></div></Card>; })}
            </div>
            {Object.entries(CONFIG.watchlists).map(([sector, data]) => { const stocks = stockPrices[sector] || []; return <Card key={sector}><h3 className="font-semibold capitalize mb-2">{sector.replace('_', ' ')}</h3><p className="text-xs text-gray-500 mb-3">{data.thesis}</p><div className="grid grid-cols-2 lg:grid-cols-5 gap-2">{stocks.map((s, i) => <div key={i} className="p-2 bg-gray-800/50 rounded"><div className="font-mono font-bold">{s.symbol}</div><div className="text-sm">${s.price}</div><Change value={parseFloat(s.change)} /></div>)}</div></Card>; })}
          </>
        )}

        {activeTab === 'risk' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card><div className="text-gray-500 text-xs uppercase">Capital Total</div><div className="text-2xl font-bold">${totalCapital.toLocaleString()}</div></Card>
              <Card><div className="text-gray-500 text-xs uppercase">Plateformes</div><div className="text-2xl font-bold">{platformPcts.length}</div></Card>
              <Card><div className="text-gray-500 text-xs uppercase">Risk Score</div><div className="text-2xl font-bold">{riskScore.toFixed(0)}/100</div><ProgressBar value={riskScore} color={riskScore < 40 ? 'green' : riskScore < 70 ? 'yellow' : 'red'} /></Card>
              <Card><div className="text-gray-500 text-xs uppercase">Alertes</div><div className="text-2xl font-bold">{alerts.length}</div></Card>
            </div>
            <Card alert={alerts.length > 0}><div className="flex items-center gap-2 mb-3"><Icons.Shield /><span className="font-semibold">Alertes Risk Management</span></div>{alerts.length > 0 ? alerts.map((a, i) => <div key={i} className="flex items-center gap-2 p-2 bg-yellow-900/30 rounded mb-2"><Icons.AlertTriangle /><span className="text-sm">{a}</span></div>) : <div className="flex items-center gap-2 p-2 bg-green-900/30 rounded"><Icons.Check /><span className="text-sm text-green-400">Tout est OK</span></div>}</Card>
            <Card><h3 className="font-semibold mb-3">Répartition</h3>{platformPcts.map((p, i) => <div key={i} className="mb-2"><div className="flex justify-between text-sm mb-1"><span>{p.name}</span><span>${p.size.toLocaleString()} ({p.pct}%)</span></div><ProgressBar value={parseFloat(p.pct)} color={parseFloat(p.pct) > 30 ? 'red' : 'blue'} /></div>)}</Card>
          </>
        )}
      </main>
      <footer className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-600 text-sm">Dashboard personnel • Data simulée</footer>
    </div>
  );
}
