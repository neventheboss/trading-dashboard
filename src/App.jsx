import React, { useState, useEffect, useCallback } from 'react';

// ==================== ICONS ====================
const Icons = {
  Zap: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Target: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Chart: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Refresh: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  X: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>,
  Twitter: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// ==================== FUNDING PLATFORMS ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80', hasApi: true },
  { id: 'ostium', name: 'Ostium', url: 'https://app.ostium.com/trade', color: '#3b82f6', hasApi: false },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa', hasApi: false },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6', hasApi: false },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa', hasApi: false },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee', hasApi: false },
  { id: 'xyz', name: 'XYZ', url: 'https://trade.xyz/', color: '#facc15', hasApi: false },
];

// ==================== PREDICTION SITES ====================
const PREDICTION_SITES = [
  { 
    name: 'Polymarket', 
    url: 'https://polymarket.com/', 
    desc: 'Leader mondial, max liquidité',
    color: '#6366f1',
    twitter: 'Polymarket',
    logo: 'https://polymarket.com/favicon.ico'
  },
  { 
    name: 'Myriad', 
    url: 'https://myriad.markets/earn', 
    desc: 'Earn rewards + potential airdrop',
    color: '#8b5cf6',
    twitter: 'maboroshi_myriad',
    logo: 'https://myriad.markets/favicon.ico'
  },
  { 
    name: 'Myriad BNB', 
    url: 'https://bnb.myriadprotocol.com/markets', 
    desc: 'Version BNB Chain',
    color: '#f0b90b',
    twitter: 'maboroshi_myriad',
    logo: 'https://myriad.markets/favicon.ico'
  },
  { 
    name: 'Limitless', 
    url: 'https://limitless.exchange/advanced', 
    desc: 'Advanced prediction trading',
    color: '#ec4899',
    twitter: 'trylimitless',
    logo: 'https://limitless.exchange/favicon.ico'
  },
  { 
    name: 'PredictBase', 
    url: 'https://predictbase.app/', 
    desc: 'New platform to explore',
    color: '#14b8a6',
    twitter: 'predictbase_',
    logo: 'https://predictbase.app/favicon.ico'
  },
  { 
    name: 'Opinion', 
    url: 'https://app.opinion.trade/profile', 
    desc: 'Opinion-based markets',
    color: '#f97316',
    twitter: 'OpinionLabsXYZ',
    logo: 'https://app.opinion.trade/favicon.ico'
  },
  { 
    name: 'XO Market', 
    url: 'https://beta.xo.market/markets?sort=volume-high-to-low', 
    desc: 'Beta - sorted by volume',
    color: '#06b6d4',
    twitter: 'xikimarkets',
    logo: 'https://beta.xo.market/favicon.ico'
  },
];

// ==================== FOREX PAIRS FOR FUNDING ====================
const FOREX_PAIRS = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'USD/CHF', 'NZD/USD',
  'EUR/GBP', 'EUR/JPY', 'GBP/JPY', 'EUR/AUD', 'GBP/AUD',
];

const CRYPTO_PAIRS = [
  'BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'MATIC', 'LINK', 'UNI',
  'AAVE', 'CRV', 'LDO', 'MKR', 'SNX', 'COMP', 'SUSHI', 'YFI',
];

// ==================== DEFAULT WATCHLIST ====================
const DEFAULT_WATCHLIST = [
  { symbol: 'CCJ', group: 'Uranium' },
  { symbol: 'URA', group: 'Uranium' },
  { symbol: 'URNM', group: 'Uranium' },
  { symbol: 'NXE', group: 'Uranium' },
  { symbol: 'NVDA', group: 'Semiconductors' },
  { symbol: 'ASML', group: 'Semiconductors' },
  { symbol: 'TSM', group: 'Semiconductors' },
  { symbol: 'AMD', group: 'Semiconductors' },
  { symbol: 'RKLB', group: 'Space' },
  { symbol: 'PLTR', group: 'Defense' },
  { symbol: 'LMT', group: 'Defense' },
  { symbol: 'EWJ', group: 'Japan' },
  { symbol: 'FCX', group: 'Copper' },
];

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('stocks');
  
  // ===== STOCKS STATE =====
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist_v6');
    return saved ? JSON.parse(saved) : DEFAULT_WATCHLIST;
  });
  const [stockData, setStockData] = useState({});
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({ symbol: '', group: '' });

  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions_v6');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPos, setNewPos] = useState({
    pair: '', longPlatform: 'hyperliquid', shortPlatform: 'vest',
    longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
    longApr: '', shortApr: '',
  });
  const [liveRates, setLiveRates] = useState({});
  const [selectedPairType, setSelectedPairType] = useState('crypto');

  // ===== PERSISTENCE =====
  useEffect(() => {
    localStorage.setItem('watchlist_v6', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('positions_v6', JSON.stringify(positions));
  }, [positions]);

  // ===== FETCH STOCK DATA =====
  const fetchStockData = useCallback(async () => {
    if (watchlist.length === 0) return;
    setLoadingStocks(true);
    
    const symbols = watchlist.map(s => s.symbol).join(',');
    
    try {
      // Try direct Yahoo Finance
      const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`);
      if (res.ok) {
        const data = await res.json();
        const quotes = data?.quoteResponse?.result || [];
        const newData = {};
        quotes.forEach(q => {
          newData[q.symbol] = {
            price: q.regularMarketPrice || 0,
            change: q.regularMarketChangePercent || 0,
            marketCap: q.marketCap || 0,
          };
        });
        setStockData(newData);
      }
    } catch (e) {
      // Fallback proxy
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`)}`;
        const res = await fetch(proxyUrl);
        if (res.ok) {
          const data = await res.json();
          const quotes = data?.quoteResponse?.result || [];
          const newData = {};
          quotes.forEach(q => {
            newData[q.symbol] = {
              price: q.regularMarketPrice || 0,
              change: q.regularMarketChangePercent || 0,
              marketCap: q.marketCap || 0,
            };
          });
          setStockData(newData);
        }
      } catch (e2) {
        console.error('Failed to fetch stock data');
      }
    }
    setLoadingStocks(false);
  }, [watchlist]);

  // ===== FETCH FUNDING RATES =====
  const fetchFundingRates = useCallback(async () => {
    try {
      const res = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      });
      const data = await res.json();
      
      if (data?.[0]?.universe && data?.[1]) {
        const rates = {};
        data[1].forEach((ctx, i) => {
          const symbol = data[0].universe[i]?.name;
          if (symbol) {
            const rate = parseFloat(ctx.funding || 0);
            rates[symbol] = (rate * 3 * 365 * 100).toFixed(2);
          }
        });
        setLiveRates(rates);
      }
    } catch (e) {
      console.error('Failed to fetch funding rates');
    }
  }, []);

  useEffect(() => {
    fetchStockData();
    fetchFundingRates();
    const stockInterval = setInterval(fetchStockData, 60000);
    const fundingInterval = setInterval(fetchFundingRates, 30000);
    return () => {
      clearInterval(stockInterval);
      clearInterval(fundingInterval);
    };
  }, [fetchStockData, fetchFundingRates]);

  // ===== CALCULATIONS =====
  const totalCapital = positions.reduce((a, b) => a + Number(b.longCapital || 0) + Number(b.shortCapital || 0), 0);
  const yearlyYield = positions.reduce((a, b) => {
    const longNotional = Number(b.longCapital || 0) * Number(b.longLeverage || 1);
    const shortNotional = Number(b.shortCapital || 0) * Number(b.shortLeverage || 1);
    const avgNotional = (longNotional + shortNotional) / 2;
    const netApr = Math.abs(Number(b.longApr || 0)) + Math.abs(Number(b.shortApr || 0));
    return a + (avgNotional * netApr / 100);
  }, 0);

  // ===== HANDLERS =====
  const addStock = () => {
    if (!newStock.symbol) return;
    const symbol = newStock.symbol.toUpperCase().trim();
    if (watchlist.find(s => s.symbol === symbol)) return;
    setWatchlist([...watchlist, { symbol, group: newStock.group || 'Other' }]);
    setNewStock({ symbol: '', group: '' });
    setTimeout(fetchStockData, 500);
  };

  const deleteStock = (symbol) => setWatchlist(watchlist.filter(s => s.symbol !== symbol));

  const addPosition = () => {
    if (!newPos.pair) return;
    setPositions([...positions, { id: Date.now(), ...newPos }]);
    setNewPos({
      pair: '', longPlatform: 'hyperliquid', shortPlatform: 'vest',
      longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
      longApr: '', shortApr: '',
    });
  };

  const deletePosition = (id) => setPositions(positions.filter(p => p.id !== id));

  const selectPair = (pair) => {
    const rate = liveRates[pair] || '';
    setNewPos({ ...newPos, pair, longApr: rate, shortApr: rate });
  };

  // ===== COMPUTED =====
  const groups = [...new Set(watchlist.map(s => s.group))];

  const getColor = (change) => {
    const c = parseFloat(change) || 0;
    if (c > 5) return '#22c55e';
    if (c > 2) return '#16a34a';
    if (c > 0) return '#15803d';
    if (c > -2) return '#991b1b';
    if (c > -5) return '#b91c1c';
    return '#dc2626';
  };

  const tabs = [
    { id: 'stocks', label: 'Stocks', icon: Icons.Chart },
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0f] via-[#0a0a0f] to-[#0c0c12] text-white">
      
      {/* ==================== HEADER ==================== */}
      <header className="pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Icons.Zap />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Trading Dashboard
              </span>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex justify-center">
            <div className="inline-flex gap-2 p-2 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-white to-white/90 text-black shadow-lg shadow-white/20' 
                      : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">

        {/* ==================== STOCKS ==================== */}
        {activeTab === 'stocks' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchStockData}
                  className={`p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all ${loadingStocks ? 'animate-spin' : ''}`}
                >
                  <Icons.Refresh />
                </button>
                <span className="text-sm text-white/30">Auto-refresh 1min</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  placeholder="SYMBOL"
                  value={newStock.symbol}
                  onChange={e => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                  onKeyDown={e => e.key === 'Enter' && addStock()}
                  className="w-28 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono uppercase focus:outline-none focus:border-white/20"
                />
                <input
                  placeholder="Group"
                  value={newStock.group}
                  onChange={e => setNewStock({ ...newStock, group: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && addStock()}
                  className="w-32 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20"
                />
                <button onClick={addStock} className="p-3 bg-white text-black rounded-xl hover:bg-white/90 transition-all">
                  <Icons.Plus />
                </button>
              </div>
            </div>

            {/* Heatmap + Chart Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Heatmap */}
              <div className="lg:col-span-2 space-y-6">
                {groups.map(group => (
                  <div key={group}>
                    <div className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">{group}</div>
                    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                      {watchlist.filter(s => s.group === group).map(stock => {
                        const data = stockData[stock.symbol] || {};
                        const change = data.change || 0;
                        const isSelected = selectedStock === stock.symbol;
                        
                        return (
                          <div
                            key={stock.symbol}
                            onClick={() => setSelectedStock(stock.symbol)}
                            className={`relative cursor-pointer rounded-xl p-4 transition-all duration-200 hover:scale-105 group ${
                              isSelected ? 'ring-2 ring-white shadow-lg' : ''
                            }`}
                            style={{ backgroundColor: getColor(change) }}
                          >
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteStock(stock.symbol); }}
                              className="absolute top-1 right-1 p-1 rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Icons.X />
                            </button>
                            <div className="text-center">
                              <div className="font-bold text-white text-lg drop-shadow">{stock.symbol}</div>
                              <div className="text-white/90 text-sm">
                                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                              </div>
                              {data.price > 0 && (
                                <div className="text-white/60 text-xs mt-1">${data.price.toFixed(2)}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Panel */}
              <div className="bg-white/[0.02] rounded-2xl border border-white/[0.05] overflow-hidden" style={{ height: '500px' }}>
                {selectedStock ? (
                  <iframe
                    src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&theme=dark&style=1&timezone=exchange&hide_side_toolbar=1`}
                    className="w-full h-full border-0"
                    title="Chart"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white/20">
                    Clique sur un stock pour voir le chart
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== FUNDING ==================== */}
        {activeTab === 'funding' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Capital Total', value: `$${totalCapital.toLocaleString()}`, color: '' },
                { label: 'Yield / Jour', value: `$${(yearlyYield / 365).toFixed(2)}`, color: 'text-emerald-400' },
                { label: 'Yield / Mois', value: `$${(yearlyYield / 12).toFixed(0)}`, color: 'text-emerald-400' },
                { label: 'Yield / An', value: `$${yearlyYield.toFixed(0)}`, color: 'text-emerald-400' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                  <div className="text-xs uppercase tracking-widest text-white/30 mb-1">{s.label}</div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Form + Table */}
              <div className="lg:col-span-2 space-y-4">
                {/* Pair Selector */}
                <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                  <div className="text-xs uppercase tracking-widest text-white/30 mb-4">Sélectionner une paire</div>
                  
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setSelectedPairType('crypto')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPairType === 'crypto' ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:text-white'
                      }`}
                    >
                      Crypto
                    </button>
                    <button
                      onClick={() => setSelectedPairType('forex')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPairType === 'forex' ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:text-white'
                      }`}
                    >
                      Forex
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {(selectedPairType === 'crypto' ? CRYPTO_PAIRS : FOREX_PAIRS).map(pair => {
                      const rate = liveRates[pair];
                      return (
                        <button
                          key={pair}
                          onClick={() => selectPair(pair)}
                          className={`p-2 rounded-lg text-center transition-all ${
                            newPos.pair === pair 
                              ? 'bg-white text-black' 
                              : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05]'
                          }`}
                        >
                          <div className="font-mono font-bold text-sm">{pair}</div>
                          {rate && selectedPairType === 'crypto' && (
                            <div className={`text-xs ${parseFloat(rate) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {rate}%
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add Position Form */}
                <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                  <div className="text-xs uppercase tracking-widest text-white/30 mb-4">
                    Position: {newPos.pair || 'Sélectionne une paire'}
                  </div>
                  
                  <div className="space-y-3">
                    {/* Long */}
                    <div className="flex gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <select
                        value={newPos.longPlatform}
                        onChange={e => setNewPos({...newPos, longPlatform: e.target.value})}
                        className="flex-1 bg-transparent text-emerald-400 text-sm focus:outline-none"
                      >
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input placeholder="Capital $" type="number" value={newPos.longCapital}
                        onChange={e => setNewPos({...newPos, longCapital: e.target.value})}
                        className="w-24 bg-transparent border-l border-emerald-500/30 pl-3 text-sm focus:outline-none" />
                      <input placeholder="Lev" type="number" value={newPos.longLeverage}
                        onChange={e => setNewPos({...newPos, longLeverage: e.target.value})}
                        className="w-16 bg-transparent border-l border-emerald-500/30 pl-3 text-sm focus:outline-none" />
                      <input placeholder="APR%" type="number" value={newPos.longApr}
                        onChange={e => setNewPos({...newPos, longApr: e.target.value})}
                        className="w-20 bg-transparent border-l border-emerald-500/30 pl-3 text-sm text-emerald-400 focus:outline-none" />
                      <span className="text-emerald-400 text-sm font-bold self-center">LONG</span>
                    </div>

                    {/* Short */}
                    <div className="flex gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <select
                        value={newPos.shortPlatform}
                        onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})}
                        className="flex-1 bg-transparent text-red-400 text-sm focus:outline-none"
                      >
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input placeholder="Capital $" type="number" value={newPos.shortCapital}
                        onChange={e => setNewPos({...newPos, shortCapital: e.target.value})}
                        className="w-24 bg-transparent border-l border-red-500/30 pl-3 text-sm focus:outline-none" />
                      <input placeholder="Lev" type="number" value={newPos.shortLeverage}
                        onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})}
                        className="w-16 bg-transparent border-l border-red-500/30 pl-3 text-sm focus:outline-none" />
                      <input placeholder="APR%" type="number" value={newPos.shortApr}
                        onChange={e => setNewPos({...newPos, shortApr: e.target.value})}
                        className="w-20 bg-transparent border-l border-red-500/30 pl-3 text-sm text-red-400 focus:outline-none" />
                      <span className="text-red-400 text-sm font-bold self-center">SHORT</span>
                    </div>

                    <button onClick={addPosition} className="w-full bg-white text-black rounded-xl py-3 text-sm font-bold hover:bg-white/90 transition-all">
                      Ajouter Position
                    </button>
                  </div>
                </div>

                {/* Positions Table */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.05] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-widest text-white/30 border-b border-white/[0.05]">
                        <th className="text-left p-4">Pair</th>
                        <th className="text-left p-4">Long</th>
                        <th className="text-left p-4">Short</th>
                        <th className="text-right p-4">Net APR</th>
                        <th className="text-right p-4">$/Jour</th>
                        <th className="p-4"></th>
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
                          <tr key={pos.id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                            <td className="p-4 font-mono font-bold text-lg">{pos.pair}</td>
                            <td className="p-4">
                              <div style={{color: longP?.color}} className="font-medium">{longP?.name}</div>
                              <div className="text-white/40 text-xs">${longNotional.toLocaleString()} • +{pos.longApr}%</div>
                            </td>
                            <td className="p-4">
                              <div style={{color: shortP?.color}} className="font-medium">{shortP?.name}</div>
                              <div className="text-white/40 text-xs">${shortNotional.toLocaleString()} • -{pos.shortApr}%</div>
                            </td>
                            <td className="p-4 text-right text-emerald-400 font-bold">{netApr.toFixed(1)}%</td>
                            <td className="p-4 text-right text-emerald-400 font-bold text-lg">${daily.toFixed(2)}</td>
                            <td className="p-4">
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
              </div>

              {/* Right: Platforms */}
              <div className="space-y-4">
                <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.05]">
                  <div className="text-xs uppercase tracking-widest text-white/30 mb-3">Plateformes</div>
                  {FUNDING_PLATFORMS.map(p => (
                    <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}} />
                        <span className="font-medium">{p.name}</span>
                      </div>
                      <Icons.External />
                    </a>
                  ))}
                </div>

                <a href="https://fundingview.app/dashboard" target="_blank" rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 rounded-2xl p-4 border border-fuchsia-500/30 hover:border-fuchsia-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">FundingView</div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PREDICTION_SITES.map(site => (
              <div key={site.name} className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: site.color }}
                    >
                      {site.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{site.name}</div>
                      <a 
                        href={`https://twitter.com/${site.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60"
                        onClick={e => e.stopPropagation()}
                      >
                        <Icons.Twitter />
                        @{site.twitter}
                      </a>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-white/50 mb-4">{site.desc}</p>
                
                <a 
                  href={site.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-all text-sm font-medium"
                >
                  Ouvrir <Icons.External />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
