import React, { useState, useEffect, useCallback } from 'react';

// ==================== ICONS ====================
const Icons = {
  Zap: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Grid: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
};

// ==================== CONFIG ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80' },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa' },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6' },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa' },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee' },
  { id: 'xyz', name: 'XYZ', url: 'https://trade.xyz/', color: '#facc15' },
  { id: 'binance', name: 'Binance', url: 'https://www.binance.com/en/futures', color: '#f0b90b' },
  { id: 'bybit', name: 'Bybit', url: 'https://www.bybit.com/trade/usdt/BTCUSDT', color: '#f7a600' },
];

const PREDICTION_SITES = [
  { name: 'Polymarket', url: 'https://polymarket.com/', desc: 'Leader, max liquidité', color: '#6366f1' },
  { name: 'Myriad', url: 'https://myriad.markets/earn', desc: 'Earn + airdrop', color: '#8b5cf6' },
  { name: 'Myriad BNB', url: 'https://bnb.myriadprotocol.com/markets', desc: 'BNB Chain', color: '#f0b90b' },
  { name: 'Limitless', url: 'https://limitless.exchange/advanced', desc: 'Advanced', color: '#ec4899' },
  { name: 'PredictBase', url: 'https://predictbase.app/', desc: 'Nouveau', color: '#14b8a6' },
  { name: 'Opinion', url: 'https://app.opinion.trade/profile', desc: 'Opinion markets', color: '#f97316' },
  { name: 'XO Market', url: 'https://beta.xo.market/markets?sort=volume-high-to-low', desc: 'Beta', color: '#06b6d4' },
];

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('funding');
  
  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions_v2');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newPos, setNewPos] = useState({
    pair: '',
    longPlatform: 'hyperliquid',
    shortPlatform: 'binance',
    capital: '',
    leverage: '10',
    longApr: '',
    shortApr: '',
  });

  // ===== STOCKS STATE =====
  const [stocks, setStocks] = useState(() => {
    const saved = localStorage.getItem('stocks_v2');
    return saved ? JSON.parse(saved) : [
      { symbol: 'CCJ', group: 'Uranium', change: 2.4 },
      { symbol: 'URA', group: 'Uranium', change: 1.8 },
      { symbol: 'URNM', group: 'Uranium', change: -0.5 },
      { symbol: 'NVDA', group: 'Semis', change: 3.2 },
      { symbol: 'ASML', group: 'Semis', change: 1.1 },
      { symbol: 'TSM', group: 'Semis', change: -1.2 },
      { symbol: 'AMD', group: 'Semis', change: 2.8 },
      { symbol: 'RKLB', group: 'Space', change: 5.4 },
      { symbol: 'PLTR', group: 'Defense', change: 4.1 },
      { symbol: 'LMT', group: 'Defense', change: 0.3 },
    ];
  });
  const [newStock, setNewStock] = useState({ symbol: '', group: '' });
  const [selectedStock, setSelectedStock] = useState('CCJ');
  const [stockView, setStockView] = useState('heatmap');

  // ===== LIVE FUNDING RATES =====
  const [liveRates, setLiveRates] = useState({});
  const [loadingRates, setLoadingRates] = useState(false);

  // ===== PERSISTENCE =====
  useEffect(() => {
    localStorage.setItem('positions_v2', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('stocks_v2', JSON.stringify(stocks));
  }, [stocks]);

  // ===== FETCH LIVE FUNDING RATES =====
  const fetchFundingRates = useCallback(async () => {
    setLoadingRates(true);
    try {
      const hlRes = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      });
      const hlData = await hlRes.json();
      
      const rates = {};
      if (hlData && hlData[0] && hlData[1]) {
        hlData[1].forEach((ctx, i) => {
          if (hlData[0].universe[i]) {
            const symbol = hlData[0].universe[i].name;
            const rate = parseFloat(ctx.funding || 0);
            const apr = rate * 3 * 365 * 100;
            rates[symbol] = { hyperliquid: apr.toFixed(2) };
          }
        });
      }
      setLiveRates(rates);
    } catch (e) {
      console.error('Error fetching rates:', e);
    }
    setLoadingRates(false);
  }, []);

  useEffect(() => {
    fetchFundingRates();
    const interval = setInterval(fetchFundingRates, 60000);
    return () => clearInterval(interval);
  }, [fetchFundingRates]);

  // ===== CALCULATIONS =====
  const totalCapital = positions.reduce((a, b) => a + Number(b.capital || 0), 0);
  const totalNotional = positions.reduce((a, b) => a + (Number(b.capital || 0) * Number(b.leverage || 1)), 0);
  const yearlyYield = positions.reduce((a, b) => {
    const notional = Number(b.capital || 0) * Number(b.leverage || 1);
    const netApr = Number(b.longApr || 0) + Number(b.shortApr || 0);
    return a + (notional * Math.abs(netApr) / 100);
  }, 0);

  // ===== HANDLERS =====
  const addPosition = () => {
    if (!newPos.pair || !newPos.capital) return;
    setPositions([...positions, { id: Date.now(), ...newPos }]);
    setNewPos({ pair: '', longPlatform: 'hyperliquid', shortPlatform: 'binance', capital: '', leverage: '10', longApr: '', shortApr: '' });
  };

  const deletePosition = (id) => setPositions(positions.filter(p => p.id !== id));

  const addStock = () => {
    if (!newStock.symbol) return;
    const symbol = newStock.symbol.toUpperCase();
    if (stocks.find(s => s.symbol === symbol)) return;
    setStocks([...stocks, { symbol, group: newStock.group || 'Other', change: (Math.random() * 10 - 5) }]);
    setNewStock({ symbol: '', group: '' });
  };

  const deleteStock = (symbol) => setStocks(stocks.filter(s => s.symbol !== symbol));

  const groups = [...new Set(stocks.map(s => s.group))];

  const getHeatColor = (change) => {
    if (change > 5) return 'bg-emerald-500';
    if (change > 2) return 'bg-emerald-600/80';
    if (change > 0) return 'bg-emerald-700/60';
    if (change > -2) return 'bg-red-700/60';
    if (change > -5) return 'bg-red-600/80';
    return 'bg-red-500';
  };

  const tabs = [
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
    { id: 'stocks', label: 'Stocks', icon: Icons.Chart },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      {/* ==================== HEADER ==================== */}
      <header className="border-b border-white/[0.06] sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Icons.Zap />
            </div>
            <span className="text-lg font-semibold">Trading</span>
          </div>
          <nav className="flex gap-1 bg-white/[0.03] p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <tab.icon />{tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ==================== FUNDING ==================== */}
        {activeTab === 'funding' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Capital', value: `$${totalCapital.toLocaleString()}` },
                { label: 'Notionnel', value: `$${totalNotional.toLocaleString()}` },
                { label: 'Yield / Jour', value: `$${(yearlyYield / 365).toFixed(2)}`, green: true },
                { label: 'Yield / An', value: `$${yearlyYield.toFixed(0)}`, green: true },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04]">
                  <div className="text-[11px] uppercase tracking-widest text-white/30 mb-1">{s.label}</div>
                  <div className={`text-2xl font-semibold tabular-nums ${s.green ? 'text-emerald-400' : ''}`}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Add Position */}
                <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04]">
                  <div className="text-[11px] uppercase tracking-widest text-white/30 mb-4">Nouvelle Position</div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        placeholder="PAIR"
                        value={newPos.pair}
                        onChange={e => setNewPos({...newPos, pair: e.target.value.toUpperCase()})}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 font-mono"
                      />
                      <input
                        placeholder="Capital $"
                        type="number"
                        value={newPos.capital}
                        onChange={e => setNewPos({...newPos, capital: e.target.value})}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                      />
                      <input
                        placeholder="Leverage"
                        type="number"
                        value={newPos.leverage}
                        onChange={e => setNewPos({...newPos, leverage: e.target.value})}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <select
                          value={newPos.longPlatform}
                          onChange={e => setNewPos({...newPos, longPlatform: e.target.value})}
                          className="flex-1 bg-white/[0.03] border border-emerald-500/30 rounded-lg px-3 py-3 text-sm focus:outline-none text-emerald-400"
                        >
                          {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id}>Long: {p.name}</option>)}
                        </select>
                        <input
                          placeholder="APR %"
                          type="number"
                          value={newPos.longApr}
                          onChange={e => setNewPos({...newPos, longApr: e.target.value})}
                          className="w-24 bg-white/[0.03] border border-emerald-500/30 rounded-lg px-3 py-3 text-sm text-emerald-400 placeholder:text-emerald-400/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={newPos.shortPlatform}
                          onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})}
                          className="flex-1 bg-white/[0.03] border border-red-500/30 rounded-lg px-3 py-3 text-sm focus:outline-none text-red-400"
                        >
                          {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id}>Short: {p.name}</option>)}
                        </select>
                        <input
                          placeholder="APR %"
                          type="number"
                          value={newPos.shortApr}
                          onChange={e => setNewPos({...newPos, shortApr: e.target.value})}
                          className="w-24 bg-white/[0.03] border border-red-500/30 rounded-lg px-3 py-3 text-sm text-red-400 placeholder:text-red-400/30 focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={addPosition}
                      className="w-full bg-white text-black rounded-lg py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[11px] uppercase tracking-widest text-white/30 border-b border-white/[0.04]">
                        <th className="text-left p-4 font-medium">Pair</th>
                        <th className="text-left p-4 font-medium">Long</th>
                        <th className="text-left p-4 font-medium">Short</th>
                        <th className="text-right p-4 font-medium">Notionnel</th>
                        <th className="text-right p-4 font-medium">Net APR</th>
                        <th className="text-right p-4 font-medium">$/Jour</th>
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map(pos => {
                        const longP = FUNDING_PLATFORMS.find(p => p.id === pos.longPlatform);
                        const shortP = FUNDING_PLATFORMS.find(p => p.id === pos.shortPlatform);
                        const notional = Number(pos.capital) * Number(pos.leverage);
                        const netApr = Math.abs(Number(pos.longApr || 0)) + Math.abs(Number(pos.shortApr || 0));
                        const daily = (notional * netApr / 100) / 365;
                        
                        return (
                          <tr key={pos.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                            <td className="p-4 font-mono font-semibold">{pos.pair}</td>
                            <td className="p-4">
                              <span style={{ color: longP?.color }}>{longP?.name}</span>
                              <span className="text-emerald-400 ml-2 text-xs">+{pos.longApr}%</span>
                            </td>
                            <td className="p-4">
                              <span style={{ color: shortP?.color }}>{shortP?.name}</span>
                              <span className="text-red-400 ml-2 text-xs">-{pos.shortApr}%</span>
                            </td>
                            <td className="p-4 text-right tabular-nums">${notional.toLocaleString()}</td>
                            <td className="p-4 text-right text-emerald-400 tabular-nums">{netApr.toFixed(1)}%</td>
                            <td className="p-4 text-right text-emerald-400 font-semibold tabular-nums">${daily.toFixed(2)}</td>
                            <td className="p-4">
                              <button onClick={() => deletePosition(pos.id)} className="text-white/10 hover:text-red-400"><Icons.Trash /></button>
                            </td>
                          </tr>
                        );
                      })}
                      {positions.length === 0 && (
                        <tr><td colSpan={7} className="p-12 text-center text-white/20">Aucune position</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Live Rates */}
                {Object.keys(liveRates).length > 0 && (
                  <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] uppercase tracking-widest text-white/30">Live Hyperliquid</span>
                      <button onClick={fetchFundingRates} className={`text-white/30 hover:text-white ${loadingRates ? 'animate-spin' : ''}`}>
                        <Icons.Refresh />
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {Object.entries(liveRates).slice(0, 12).map(([symbol, rates]) => (
                        <div key={symbol} className="bg-white/[0.03] rounded-lg p-2 text-center">
                          <div className="text-[10px] text-white/30 mb-1">{symbol}</div>
                          <div className={`text-xs font-mono ${parseFloat(rates.hyperliquid) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {rates.hyperliquid}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
                  <div className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Plateformes</div>
                  <div className="space-y-1">
                    {FUNDING_PLATFORMS.map(p => (
                      <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors">
                        <span style={{ color: p.color }} className="text-sm font-medium">{p.name}</span>
                        <Icons.External />
                      </a>
                    ))}
                  </div>
                </div>

                <a href="https://fundingview.app/dashboard" target="_blank" rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-xl p-4 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">FundingView</div>
                      <div className="text-xs text-white/40">Compare les fundings</div>
                    </div>
                    <Icons.External />
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PREDICTIONS ==================== */}
        {activeTab === 'predictions' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PREDICTION_SITES.map(site => (
              <a key={site.name} href={site.url} target="_blank" rel="noopener noreferrer"
                className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: site.color }} />
                  <Icons.External />
                </div>
                <div className="font-semibold mb-1">{site.name}</div>
                <div className="text-sm text-white/40">{site.desc}</div>
              </a>
            ))}
          </div>
        )}

        {/* ==================== STOCKS ==================== */}
        {activeTab === 'stocks' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1 bg-white/[0.03] p-1 rounded-lg">
                <button onClick={() => setStockView('heatmap')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${stockView === 'heatmap' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>
                  <span className="flex items-center gap-2"><Icons.Grid /> Heatmap</span>
                </button>
                <button onClick={() => setStockView('chart')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${stockView === 'chart' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>
                  <span className="flex items-center gap-2"><Icons.Chart /> Chart</span>
                </button>
              </div>
              
              <div className="flex gap-2">
                <input placeholder="SYMBOL" value={newStock.symbol} onChange={e => setNewStock({...newStock, symbol: e.target.value})}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm w-24 font-mono uppercase focus:outline-none" />
                <input placeholder="Group" value={newStock.group} onChange={e => setNewStock({...newStock, group: e.target.value})}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-sm w-28 focus:outline-none" />
                <button onClick={addStock} className="bg-white text-black rounded-lg px-3 py-2 text-sm font-medium"><Icons.Plus /></button>
              </div>
            </div>

            {stockView === 'heatmap' ? (
              <div className="space-y-6">
                {groups.map(group => (
                  <div key={group}>
                    <div className="text-[11px] uppercase tracking-widest text-white/30 mb-3">{group}</div>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                      {stocks.filter(s => s.group === group).map(stock => (
                        <div key={stock.symbol}
                          onClick={() => { setSelectedStock(stock.symbol); setStockView('chart'); }}
                          className={`${getHeatColor(stock.change)} rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform relative group/item`}>
                          <button onClick={(e) => { e.stopPropagation(); deleteStock(stock.symbol); }}
                            className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 text-white/60 hover:text-white">
                            <Icons.Trash />
                          </button>
                          <div className="font-mono font-bold text-lg">{stock.symbol}</div>
                          <div className="text-sm opacity-80">{stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white/[0.02] rounded-xl overflow-hidden border border-white/[0.04]" style={{ height: '600px' }}>
                  <iframe
                    src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&theme=dark&style=1&timezone=exchange&hide_side_toolbar=0&allow_symbol_change=1`}
                    className="w-full h-full border-0"
                    title="Chart"
                  />
                </div>
                <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                  {stocks.map(stock => (
                    <button key={stock.symbol} onClick={() => setSelectedStock(stock.symbol)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                        selectedStock === stock.symbol ? 'bg-white text-black' : 'bg-white/[0.02] hover:bg-white/[0.04]'
                      }`}>
                      <div>
                        <div className="font-mono font-semibold text-sm">{stock.symbol}</div>
                        <div className="text-[10px] opacity-50">{stock.group}</div>
                      </div>
                      <div className={`text-xs font-mono ${selectedStock === stock.symbol ? '' : stock.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
