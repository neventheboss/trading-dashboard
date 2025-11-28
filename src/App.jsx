import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ==================== ICONS ====================
const Icons = {
  Zap: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  X: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>,
};

// ==================== CONFIG ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80', hasApi: true },
  { id: 'binance', name: 'Binance', url: 'https://www.binance.com/en/futures', color: '#f0b90b', hasApi: true },
  { id: 'bybit', name: 'Bybit', url: 'https://www.bybit.com/trade/usdt/BTCUSDT', color: '#f7a600', hasApi: true },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa', hasApi: false },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6', hasApi: false },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa', hasApi: false },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee', hasApi: false },
  { id: 'xyz', name: 'XYZ', url: 'https://trade.xyz/', color: '#facc15', hasApi: false },
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

// ==================== TREEMAP COMPONENT ====================
const Treemap = ({ data, onSelect, onDelete }) => {
  const total = data.reduce((a, b) => a + (b.value || 1), 0);
  
  // Simple treemap layout
  const layout = useMemo(() => {
    const sorted = [...data].sort((a, b) => (b.value || 1) - (a.value || 1));
    const items = [];
    let currentRow = [];
    let currentRowWidth = 0;
    let y = 0;
    const rowHeight = 100 / Math.ceil(Math.sqrt(data.length));
    
    sorted.forEach((item, i) => {
      const width = Math.max(10, ((item.value || 1) / total) * 100 * 2);
      
      if (currentRowWidth + width > 100 || currentRow.length >= 4) {
        // Normalize row
        const scale = 100 / currentRowWidth;
        let x = 0;
        currentRow.forEach(r => {
          r.x = x;
          r.y = y;
          r.width = r.tempWidth * scale;
          r.height = rowHeight;
          x += r.width;
          items.push(r);
        });
        y += rowHeight;
        currentRow = [];
        currentRowWidth = 0;
      }
      
      currentRow.push({ ...item, tempWidth: width });
      currentRowWidth += width;
    });
    
    // Last row
    if (currentRow.length > 0) {
      const scale = 100 / currentRowWidth;
      let x = 0;
      currentRow.forEach(r => {
        r.x = x;
        r.y = y;
        r.width = r.tempWidth * scale;
        r.height = rowHeight;
        x += r.width;
        items.push(r);
      });
    }
    
    return items;
  }, [data, total]);

  const getColor = (change) => {
    const c = parseFloat(change) || 0;
    if (c > 5) return 'rgb(34, 197, 94)';
    if (c > 3) return 'rgb(22, 163, 74)';
    if (c > 1) return 'rgb(21, 128, 61)';
    if (c > 0) return 'rgb(20, 83, 45)';
    if (c > -1) return 'rgb(127, 29, 29)';
    if (c > -3) return 'rgb(153, 27, 27)';
    if (c > -5) return 'rgb(185, 28, 28)';
    return 'rgb(220, 38, 38)';
  };

  return (
    <div className="relative w-full" style={{ height: '500px' }}>
      {layout.map((item, i) => (
        <div
          key={item.symbol}
          onClick={() => onSelect(item.symbol)}
          className="absolute cursor-pointer transition-all duration-200 hover:z-10 hover:scale-[1.02] group"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: `${item.width}%`,
            height: `${item.height}%`,
            backgroundColor: getColor(item.change),
            padding: '2px',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center relative border border-black/20 rounded-sm">
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(item.symbol); }}
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-white/60 hover:text-white bg-black/30 rounded p-0.5"
            >
              <Icons.X />
            </button>
            <div className="font-bold text-white text-lg drop-shadow-lg">{item.symbol}</div>
            <div className="text-white/90 text-sm drop-shadow">
              {item.change > 0 ? '+' : ''}{item.change?.toFixed(2) || 0}%
            </div>
            <div className="text-white/60 text-xs">{item.group}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('funding');
  
  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions_v3');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newPos, setNewPos] = useState({
    pair: '',
    longPlatform: 'hyperliquid',
    shortPlatform: 'binance',
    longCapital: '',
    shortCapital: '',
    longLeverage: '10',
    shortLeverage: '10',
    longApr: '',
    shortApr: '',
  });

  // ===== STOCKS STATE =====
  const [stocks, setStocks] = useState(() => {
    const saved = localStorage.getItem('stocks_v3');
    return saved ? JSON.parse(saved) : [
      { symbol: 'CCJ', group: 'Uranium', change: 2.4, value: 50 },
      { symbol: 'URA', group: 'Uranium', change: 1.8, value: 40 },
      { symbol: 'URNM', group: 'Uranium', change: -0.5, value: 30 },
      { symbol: 'NXE', group: 'Uranium', change: 3.2, value: 25 },
      { symbol: 'NVDA', group: 'Semis', change: 4.2, value: 100 },
      { symbol: 'ASML', group: 'Semis', change: 1.1, value: 60 },
      { symbol: 'TSM', group: 'Semis', change: -1.2, value: 70 },
      { symbol: 'AMD', group: 'Semis', change: 2.8, value: 50 },
      { symbol: 'RKLB', group: 'Space', change: 5.4, value: 20 },
      { symbol: 'PLTR', group: 'Defense', change: 4.1, value: 45 },
      { symbol: 'LMT', group: 'Defense', change: 0.3, value: 55 },
      { symbol: 'RTX', group: 'Defense', change: -0.8, value: 40 },
      { symbol: 'EWJ', group: 'Japan', change: 1.5, value: 35 },
      { symbol: 'FCX', group: 'Copper', change: -2.1, value: 30 },
    ];
  });
  const [newStock, setNewStock] = useState({ symbol: '', group: '', value: '50' });
  const [selectedStock, setSelectedStock] = useState('CCJ');
  const [showChart, setShowChart] = useState(false);

  // ===== LIVE FUNDING RATES =====
  const [liveRates, setLiveRates] = useState({});
  const [loadingRates, setLoadingRates] = useState(false);

  // ===== PERSISTENCE =====
  useEffect(() => {
    localStorage.setItem('positions_v3', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('stocks_v3', JSON.stringify(stocks));
  }, [stocks]);

  // ===== FETCH ALL FUNDING RATES =====
  const fetchFundingRates = useCallback(async () => {
    setLoadingRates(true);
    const rates = {};

    try {
      // Hyperliquid
      const hlRes = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      });
      const hlData = await hlRes.json();
      if (hlData?.[0]?.universe && hlData?.[1]) {
        hlData[1].forEach((ctx, i) => {
          const symbol = hlData[0].universe[i]?.name;
          if (symbol) {
            const rate = parseFloat(ctx.funding || 0);
            const apr = (rate * 3 * 365 * 100).toFixed(2);
            if (!rates[symbol]) rates[symbol] = {};
            rates[symbol].hyperliquid = apr;
          }
        });
      }
    } catch (e) { console.error('Hyperliquid error:', e); }

    try {
      // Binance
      const bnRes = await fetch('https://fapi.binance.com/fapi/v1/premiumIndex');
      const bnData = await bnRes.json();
      bnData.forEach(item => {
        const symbol = item.symbol.replace('USDT', '');
        const rate = parseFloat(item.lastFundingRate || 0);
        const apr = (rate * 3 * 365 * 100).toFixed(2);
        if (!rates[symbol]) rates[symbol] = {};
        rates[symbol].binance = apr;
      });
    } catch (e) { console.error('Binance error:', e); }

    try {
      // Bybit
      const byRes = await fetch('https://api.bybit.com/v5/market/tickers?category=linear');
      const byData = await byRes.json();
      if (byData?.result?.list) {
        byData.result.list.forEach(item => {
          if (item.symbol.endsWith('USDT')) {
            const symbol = item.symbol.replace('USDT', '');
            const rate = parseFloat(item.fundingRate || 0);
            const apr = (rate * 3 * 365 * 100).toFixed(2);
            if (!rates[symbol]) rates[symbol] = {};
            rates[symbol].bybit = apr;
          }
        });
      }
    } catch (e) { console.error('Bybit error:', e); }

    setLiveRates(rates);
    setLoadingRates(false);
  }, []);

  useEffect(() => {
    fetchFundingRates();
    const interval = setInterval(fetchFundingRates, 60000);
    return () => clearInterval(interval);
  }, [fetchFundingRates]);

  // ===== AUTO-FILL APR =====
  const getAprForPlatform = (pair, platformId) => {
    const symbol = pair.toUpperCase().replace('/', '').replace('USDT', '').replace('USD', '').replace('PERP', '');
    const rates = liveRates[symbol];
    if (!rates) return '';
    return rates[platformId] || '';
  };

  // Update APR when pair or platform changes
  useEffect(() => {
    if (newPos.pair) {
      const longApr = getAprForPlatform(newPos.pair, newPos.longPlatform);
      const shortApr = getAprForPlatform(newPos.pair, newPos.shortPlatform);
      setNewPos(prev => ({
        ...prev,
        longApr: longApr || prev.longApr,
        shortApr: shortApr || prev.shortApr,
      }));
    }
  }, [newPos.pair, newPos.longPlatform, newPos.shortPlatform, liveRates]);

  // ===== CALCULATIONS =====
  const totalLongCapital = positions.reduce((a, b) => a + Number(b.longCapital || 0), 0);
  const totalShortCapital = positions.reduce((a, b) => a + Number(b.shortCapital || 0), 0);
  const totalCapital = totalLongCapital + totalShortCapital;
  
  const totalLongNotional = positions.reduce((a, b) => a + (Number(b.longCapital || 0) * Number(b.longLeverage || 1)), 0);
  const totalShortNotional = positions.reduce((a, b) => a + (Number(b.shortCapital || 0) * Number(b.shortLeverage || 1)), 0);
  
  const yearlyYield = positions.reduce((a, b) => {
    const longNotional = Number(b.longCapital || 0) * Number(b.longLeverage || 1);
    const shortNotional = Number(b.shortCapital || 0) * Number(b.shortLeverage || 1);
    const avgNotional = (longNotional + shortNotional) / 2;
    const netApr = Math.abs(Number(b.longApr || 0)) + Math.abs(Number(b.shortApr || 0));
    return a + (avgNotional * netApr / 100);
  }, 0);

  // ===== HANDLERS =====
  const addPosition = () => {
    if (!newPos.pair || (!newPos.longCapital && !newPos.shortCapital)) return;
    setPositions([...positions, { id: Date.now(), ...newPos }]);
    setNewPos({
      pair: '', longPlatform: 'hyperliquid', shortPlatform: 'binance',
      longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
      longApr: '', shortApr: '',
    });
  };

  const deletePosition = (id) => setPositions(positions.filter(p => p.id !== id));

  const addStock = () => {
    if (!newStock.symbol) return;
    const symbol = newStock.symbol.toUpperCase();
    if (stocks.find(s => s.symbol === symbol)) return;
    setStocks([...stocks, { 
      symbol, 
      group: newStock.group || 'Other', 
      change: (Math.random() * 10 - 5),
      value: Number(newStock.value) || 50
    }]);
    setNewStock({ symbol: '', group: '', value: '50' });
  };

  const deleteStock = (symbol) => setStocks(stocks.filter(s => s.symbol !== symbol));

  const tabs = [
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
    { id: 'stocks', label: 'Stocks', icon: Icons.Chart },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* HEADER */}
      <header className="border-b border-white/5 sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
              <Icons.Zap />
            </div>
            <span className="font-semibold text-lg">Trading</span>
          </div>
          <nav className="flex gap-1 bg-white/5 p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                <tab.icon />{tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6">

        {/* ==================== FUNDING ==================== */}
        {activeTab === 'funding' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: 'Capital Total', value: `$${totalCapital.toLocaleString()}` },
                { label: 'Long Notional', value: `$${totalLongNotional.toLocaleString()}`, color: 'text-emerald-400' },
                { label: 'Short Notional', value: `$${totalShortNotional.toLocaleString()}`, color: 'text-red-400' },
                { label: 'Yield/Jour', value: `$${(yearlyYield / 365).toFixed(2)}`, color: 'text-emerald-400' },
                { label: 'Yield/An', value: `$${yearlyYield.toFixed(0)}`, color: 'text-emerald-400' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{s.label}</div>
                  <div className={`text-xl font-semibold ${s.color || ''}`}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-4">
                {/* Add Position */}
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Nouvelle Position Delta Neutre</div>
                  
                  {/* Row 1: Pair */}
                  <div className="mb-3">
                    <input
                      placeholder="PAIR (ex: BTC, ETH, SOL...)"
                      value={newPos.pair}
                      onChange={e => setNewPos({...newPos, pair: e.target.value.toUpperCase()})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Row 2: Long */}
                  <div className="flex gap-2 mb-2">
                    <div className="flex-1 flex gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      <select
                        value={newPos.longPlatform}
                        onChange={e => setNewPos({...newPos, longPlatform: e.target.value})}
                        className="flex-1 bg-transparent text-emerald-400 text-sm focus:outline-none"
                      >
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input
                        placeholder="Capital $"
                        type="number"
                        value={newPos.longCapital}
                        onChange={e => setNewPos({...newPos, longCapital: e.target.value})}
                        className="w-28 bg-transparent border-l border-emerald-500/20 pl-3 text-sm placeholder:text-emerald-400/30 focus:outline-none"
                      />
                      <input
                        placeholder="Lev"
                        type="number"
                        value={newPos.longLeverage}
                        onChange={e => setNewPos({...newPos, longLeverage: e.target.value})}
                        className="w-16 bg-transparent border-l border-emerald-500/20 pl-3 text-sm placeholder:text-emerald-400/30 focus:outline-none"
                      />
                      <input
                        placeholder="APR%"
                        type="number"
                        value={newPos.longApr}
                        onChange={e => setNewPos({...newPos, longApr: e.target.value})}
                        className="w-20 bg-transparent border-l border-emerald-500/20 pl-3 text-sm text-emerald-400 placeholder:text-emerald-400/30 focus:outline-none"
                      />
                      <span className="text-emerald-400 text-sm font-medium self-center">LONG</span>
                    </div>
                  </div>

                  {/* Row 3: Short */}
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 flex gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                      <select
                        value={newPos.shortPlatform}
                        onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})}
                        className="flex-1 bg-transparent text-red-400 text-sm focus:outline-none"
                      >
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input
                        placeholder="Capital $"
                        type="number"
                        value={newPos.shortCapital}
                        onChange={e => setNewPos({...newPos, shortCapital: e.target.value})}
                        className="w-28 bg-transparent border-l border-red-500/20 pl-3 text-sm placeholder:text-red-400/30 focus:outline-none"
                      />
                      <input
                        placeholder="Lev"
                        type="number"
                        value={newPos.shortLeverage}
                        onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})}
                        className="w-16 bg-transparent border-l border-red-500/20 pl-3 text-sm placeholder:text-red-400/30 focus:outline-none"
                      />
                      <input
                        placeholder="APR%"
                        type="number"
                        value={newPos.shortApr}
                        onChange={e => setNewPos({...newPos, shortApr: e.target.value})}
                        className="w-20 bg-transparent border-l border-red-500/20 pl-3 text-sm text-red-400 placeholder:text-red-400/30 focus:outline-none"
                      />
                      <span className="text-red-400 text-sm font-medium self-center">SHORT</span>
                    </div>
                  </div>

                  <button onClick={addPosition} className="w-full bg-white text-black rounded-lg py-2.5 text-sm font-semibold hover:bg-white/90">
                    Ajouter Position
                  </button>
                </div>

                {/* Table */}
                <div className="bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                        <th className="text-left p-3">Pair</th>
                        <th className="text-left p-3">Long</th>
                        <th className="text-left p-3">Short</th>
                        <th className="text-right p-3">Net APR</th>
                        <th className="text-right p-3">$/Jour</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map(pos => {
                        const longP = FUNDING_PLATFORMS.find(p => p.id === pos.longPlatform);
                        const shortP = FUNDING_PLATFORMS.find(p => p.id === pos.shortPlatform);
                        const longNotional = Number(pos.longCapital || 0) * Number(pos.longLeverage || 1);
                        const shortNotional = Number(pos.shortCapital || 0) * Number(pos.shortLeverage || 1);
                        const avgNotional = (longNotional + shortNotional) / 2;
                        const netApr = Math.abs(Number(pos.longApr || 0)) + Math.abs(Number(pos.shortApr || 0));
                        const daily = (avgNotional * netApr / 100) / 365;
                        
                        return (
                          <tr key={pos.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                            <td className="p-3 font-mono font-bold text-lg">{pos.pair}</td>
                            <td className="p-3">
                              <div className="text-emerald-400 text-xs">{longP?.name}</div>
                              <div className="text-white/60 text-xs">${pos.longCapital} × {pos.longLeverage} = ${longNotional.toLocaleString()}</div>
                              <div className="text-emerald-400 text-xs">+{pos.longApr}%</div>
                            </td>
                            <td className="p-3">
                              <div className="text-red-400 text-xs">{shortP?.name}</div>
                              <div className="text-white/60 text-xs">${pos.shortCapital} × {pos.shortLeverage} = ${shortNotional.toLocaleString()}</div>
                              <div className="text-red-400 text-xs">-{pos.shortApr}%</div>
                            </td>
                            <td className="p-3 text-right text-emerald-400 font-semibold">{netApr.toFixed(1)}%</td>
                            <td className="p-3 text-right text-emerald-400 font-bold">${daily.toFixed(2)}</td>
                            <td className="p-3">
                              <button onClick={() => deletePosition(pos.id)} className="text-white/20 hover:text-red-400">
                                <Icons.Trash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {positions.length === 0 && (
                        <tr><td colSpan={6} className="p-8 text-center text-white/20">Aucune position</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Live Rates */}
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-white/30">Live Funding APR</span>
                    <button onClick={fetchFundingRates} className={`text-white/30 hover:text-white ${loadingRates ? 'animate-spin' : ''}`}>
                      <Icons.Refresh />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'DOGE', 'AVAX', 'MATIC'].map(symbol => (
                      <div key={symbol} className="bg-white/5 rounded-lg p-2">
                        <div className="font-mono font-bold mb-1">{symbol}</div>
                        <div className="space-y-0.5">
                          {liveRates[symbol]?.hyperliquid && (
                            <div className="flex justify-between">
                              <span className="text-white/40">HL</span>
                              <span className={parseFloat(liveRates[symbol].hyperliquid) > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                {liveRates[symbol].hyperliquid}%
                              </span>
                            </div>
                          )}
                          {liveRates[symbol]?.binance && (
                            <div className="flex justify-between">
                              <span className="text-white/40">BN</span>
                              <span className={parseFloat(liveRates[symbol].binance) > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                {liveRates[symbol].binance}%
                              </span>
                            </div>
                          )}
                          {liveRates[symbol]?.bybit && (
                            <div className="flex justify-between">
                              <span className="text-white/40">BB</span>
                              <span className={parseFloat(liveRates[symbol].bybit) > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                {liveRates[symbol].bybit}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Plateformes</div>
                  {FUNDING_PLATFORMS.map(p => (
                    <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-sm">{p.name}</span>
                        {p.hasApi && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">API</span>}
                      </div>
                      <Icons.External />
                    </a>
                  ))}
                </div>

                <a href="https://fundingview.app/dashboard" target="_blank" rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-fuchsia-600/20 to-violet-600/20 rounded-xl p-4 border border-fuchsia-500/20 hover:border-fuchsia-500/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">FundingView</div>
                      <div className="text-xs text-white/40">Compare tous les fundings</div>
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
                className="bg-white/[0.02] rounded-xl p-5 border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: site.color }} />
                  <Icons.External />
                </div>
                <div className="font-semibold text-lg mb-1">{site.name}</div>
                <div className="text-sm text-white/40">{site.desc}</div>
              </a>
            ))}
          </div>
        )}

        {/* ==================== STOCKS ==================== */}
        {activeTab === 'stocks' && (
          <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <input placeholder="SYMBOL" value={newStock.symbol} onChange={e => setNewStock({...newStock, symbol: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm w-24 font-mono uppercase focus:outline-none" />
                <input placeholder="Group" value={newStock.group} onChange={e => setNewStock({...newStock, group: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none" />
                <input placeholder="Size" type="number" value={newStock.value} onChange={e => setNewStock({...newStock, value: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm w-20 focus:outline-none" />
                <button onClick={addStock} className="bg-white text-black rounded-lg px-4 py-2 text-sm font-medium">
                  <Icons.Plus />
                </button>
              </div>
              {showChart && (
                <button onClick={() => setShowChart(false)} className="text-white/40 hover:text-white text-sm">
                  ← Back to Heatmap
                </button>
              )}
            </div>

            {/* Heatmap or Chart */}
            {!showChart ? (
              <div className="bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
                <Treemap 
                  data={stocks} 
                  onSelect={(symbol) => { setSelectedStock(symbol); setShowChart(true); }}
                  onDelete={deleteStock}
                />
              </div>
            ) : (
              <div className="grid lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3 bg-white/[0.02] rounded-xl overflow-hidden border border-white/5" style={{ height: '600px' }}>
                  <iframe
                    src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&theme=dark&style=1&timezone=exchange`}
                    className="w-full h-full border-0"
                    title="Chart"
                  />
                </div>
                <div className="space-y-1 max-h-[600px] overflow-y-auto">
                  {stocks.map(stock => (
                    <button key={stock.symbol} onClick={() => setSelectedStock(stock.symbol)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                        selectedStock === stock.symbol ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                      }`}>
                      <div className="font-mono font-bold">{stock.symbol}</div>
                      <div className={`text-sm ${selectedStock === stock.symbol ? '' : stock.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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
