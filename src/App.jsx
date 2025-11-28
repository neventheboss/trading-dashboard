import React, { useState, useEffect, useCallback } from 'react';

// ==================== ICONS ====================
const Icons = {
  Zap: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  X: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>,
  Grid: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
};

// ==================== CONFIG ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80' },
  { id: 'binance', name: 'Binance', url: 'https://www.binance.com/en/futures', color: '#f0b90b' },
  { id: 'bybit', name: 'Bybit', url: 'https://www.bybit.com/trade/usdt/BTCUSDT', color: '#f7a600' },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa' },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6' },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa' },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee' },
  { id: 'xyz', name: 'XYZ', url: 'https://trade.xyz/', color: '#facc15' },
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

const DEFAULT_WATCHLIST = [
  { symbol: 'CCJ', group: 'Uranium' },
  { symbol: 'URA', group: 'Uranium' },
  { symbol: 'URNM', group: 'Uranium' },
  { symbol: 'NXE', group: 'Uranium' },
  { symbol: 'DNN', group: 'Uranium' },
  { symbol: 'NVDA', group: 'Semis' },
  { symbol: 'ASML', group: 'Semis' },
  { symbol: 'TSM', group: 'Semis' },
  { symbol: 'AMD', group: 'Semis' },
  { symbol: 'LRCX', group: 'Semis' },
  { symbol: 'RKLB', group: 'Space' },
  { symbol: 'PL', group: 'Space' },
  { symbol: 'LUNR', group: 'Space' },
  { symbol: 'PLTR', group: 'Defense' },
  { symbol: 'LMT', group: 'Defense' },
  { symbol: 'RTX', group: 'Defense' },
  { symbol: 'AVAV', group: 'Defense' },
  { symbol: 'EWJ', group: 'Japan' },
  { symbol: 'DXJ', group: 'Japan' },
  { symbol: 'FCX', group: 'Copper' },
  { symbol: 'SCCO', group: 'Copper' },
  { symbol: 'PWR', group: 'Energy' },
  { symbol: 'ETN', group: 'Energy' },
];

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('stocks');
  
  // ===== WATCHLIST STATE =====
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist_v5');
    return saved ? JSON.parse(saved) : DEFAULT_WATCHLIST;
  });
  const [stockData, setStockData] = useState({});
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [newStock, setNewStock] = useState({ symbol: '', group: '' });
  const [selectedStock, setSelectedStock] = useState(null);
  const [viewMode, setViewMode] = useState('heatmap'); // 'heatmap' or 'chart'

  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions_v5');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPos, setNewPos] = useState({
    pair: '', longPlatform: 'hyperliquid', shortPlatform: 'binance',
    longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
    longApr: '', shortApr: '',
  });

  // ===== PERSISTENCE =====
  useEffect(() => {
    localStorage.setItem('watchlist_v5', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('positions_v5', JSON.stringify(positions));
  }, [positions]);

  // ===== FETCH STOCK DATA =====
  const fetchStockData = useCallback(async () => {
    if (watchlist.length === 0) return;
    
    setLoadingStocks(true);
    const symbols = watchlist.map(s => s.symbol).join(',');
    
    try {
      // Using Yahoo Finance via a CORS proxy
      const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`, {
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        const quotes = data?.quoteResponse?.result || [];
        const newData = {};
        quotes.forEach(q => {
          newData[q.symbol] = {
            price: q.regularMarketPrice || 0,
            change: q.regularMarketChangePercent || 0,
            name: q.shortName || q.symbol,
            marketCap: q.marketCap || 0,
          };
        });
        setStockData(newData);
        setLastUpdate(new Date());
      }
    } catch (e) {
      console.log('Direct Yahoo failed, trying proxy...');
      
      // Fallback: try with allorigins proxy
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`)}`;
        const response = await fetch(proxyUrl);
        
        if (response.ok) {
          const data = await response.json();
          const quotes = data?.quoteResponse?.result || [];
          const newData = {};
          quotes.forEach(q => {
            newData[q.symbol] = {
              price: q.regularMarketPrice || 0,
              change: q.regularMarketChangePercent || 0,
              name: q.shortName || q.symbol,
              marketCap: q.marketCap || 0,
            };
          });
          setStockData(newData);
          setLastUpdate(new Date());
        }
      } catch (e2) {
        console.error('Proxy also failed:', e2);
      }
    }
    
    setLoadingStocks(false);
  }, [watchlist]);

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchStockData]);

  // ===== FUNDING CALCULATIONS =====
  const totalCapital = positions.reduce((a, b) => a + Number(b.longCapital || 0) + Number(b.shortCapital || 0), 0);
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
  const addStock = () => {
    if (!newStock.symbol) return;
    const symbol = newStock.symbol.toUpperCase().trim();
    if (watchlist.find(s => s.symbol === symbol)) return;
    setWatchlist([...watchlist, { symbol, group: newStock.group || 'Other' }]);
    setNewStock({ symbol: '', group: '' });
    setTimeout(fetchStockData, 100);
  };

  const deleteStock = (symbol) => {
    setWatchlist(watchlist.filter(s => s.symbol !== symbol));
  };

  const addPosition = () => {
    if (!newPos.pair) return;
    setPositions([...positions, { id: Date.now(), ...newPos }]);
    setNewPos({
      pair: '', longPlatform: 'hyperliquid', shortPlatform: 'binance',
      longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
      longApr: '', shortApr: '',
    });
  };

  const deletePosition = (id) => setPositions(positions.filter(p => p.id !== id));

  // ===== COMPUTED =====
  const groups = [...new Set(watchlist.map(s => s.group))];
  
  const getColor = (change) => {
    const c = parseFloat(change) || 0;
    if (c > 5) return '#22c55e';
    if (c > 3) return '#16a34a';
    if (c > 1) return '#15803d';
    if (c > 0) return '#166534';
    if (c > -1) return '#7f1d1d';
    if (c > -3) return '#991b1b';
    if (c > -5) return '#b91c1c';
    return '#dc2626';
  };

  const tabs = [
    { id: 'stocks', label: 'Stocks', icon: Icons.Chart },
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* HEADER */}
      <header className="border-b border-white/5 sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="max-w-[1800px] mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
              <Icons.Zap />
            </div>
            <span className="font-semibold">Trading</span>
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

      <main className="max-w-[1800px] mx-auto px-4 py-4">

        {/* ==================== STOCKS ==================== */}
        {activeTab === 'stocks' && (
          <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('heatmap')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'heatmap' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Icons.Grid /> Heatmap
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'chart' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Icons.Chart /> Chart
                </button>
              </div>

              <div className="flex items-center gap-2">
                {lastUpdate && (
                  <span className="text-xs text-white/30">
                    Màj: {lastUpdate.toLocaleTimeString()}
                  </span>
                )}
                <button
                  onClick={fetchStockData}
                  className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 ${loadingStocks ? 'animate-spin' : ''}`}
                >
                  <Icons.Refresh />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  placeholder="SYMBOL"
                  value={newStock.symbol}
                  onChange={e => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                  onKeyDown={e => e.key === 'Enter' && addStock()}
                  className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:border-white/30"
                />
                <input
                  placeholder="Group"
                  value={newStock.group}
                  onChange={e => setNewStock({ ...newStock, group: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && addStock()}
                  className="w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                />
                <button onClick={addStock} className="p-2 bg-white text-black rounded-lg hover:bg-white/90">
                  <Icons.Plus />
                </button>
              </div>
            </div>

            {viewMode === 'heatmap' ? (
              /* ===== HEATMAP VIEW ===== */
              <div className="space-y-6">
                {groups.map(group => {
                  const groupStocks = watchlist.filter(s => s.group === group);
                  return (
                    <div key={group}>
                      <div className="text-xs uppercase tracking-widest text-white/30 mb-2">{group}</div>
                      <div className="flex flex-wrap gap-2">
                        {groupStocks.map(stock => {
                          const data = stockData[stock.symbol] || {};
                          const change = data.change || 0;
                          const marketCap = data.marketCap || 1;
                          // Size based on market cap (min 120px, max 250px)
                          const size = Math.max(120, Math.min(250, Math.log10(marketCap) * 20));
                          
                          return (
                            <div
                              key={stock.symbol}
                              onClick={() => { setSelectedStock(stock.symbol); setViewMode('chart'); }}
                              className="relative cursor-pointer group transition-transform hover:scale-105"
                              style={{
                                width: `${size}px`,
                                height: `${size * 0.6}px`,
                                backgroundColor: getColor(change),
                                borderRadius: '8px',
                              }}
                            >
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteStock(stock.symbol); }}
                                className="absolute top-1 right-1 p-1 rounded bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                              >
                                <Icons.X />
                              </button>
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                                <div className="font-bold text-white text-lg drop-shadow-lg">{stock.symbol}</div>
                                <div className="text-white/90 text-sm drop-shadow">
                                  {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                                </div>
                                {data.price > 0 && (
                                  <div className="text-white/60 text-xs">${data.price.toFixed(2)}</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                
                {watchlist.length === 0 && (
                  <div className="text-center py-20 text-white/30">
                    Ajoute des stocks avec le formulaire ci-dessus
                  </div>
                )}
              </div>
            ) : (
              /* ===== CHART VIEW ===== */
              <div className="grid lg:grid-cols-5 gap-4">
                {/* Chart */}
                <div className="lg:col-span-4 bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden" style={{ height: '600px' }}>
                  {selectedStock ? (
                    <iframe
                      src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&theme=dark&style=1&timezone=exchange&hide_side_toolbar=0`}
                      className="w-full h-full border-0"
                      title="Chart"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white/30">
                      Sélectionne un stock
                    </div>
                  )}
                </div>
                
                {/* Stock List */}
                <div className="space-y-1 max-h-[600px] overflow-y-auto">
                  {groups.map(group => (
                    <div key={group} className="mb-3">
                      <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1 px-2">{group}</div>
                      {watchlist.filter(s => s.group === group).map(stock => {
                        const data = stockData[stock.symbol] || {};
                        const change = data.change || 0;
                        return (
                          <button
                            key={stock.symbol}
                            onClick={() => setSelectedStock(stock.symbol)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all ${
                              selectedStock === stock.symbol 
                                ? 'bg-white text-black' 
                                : 'bg-white/[0.02] hover:bg-white/[0.05]'
                            }`}
                          >
                            <span className="font-mono font-bold text-sm">{stock.symbol}</span>
                            <span className={`text-xs font-mono ${
                              selectedStock === stock.symbol 
                                ? '' 
                                : change >= 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== FUNDING ==================== */}
        {activeTab === 'funding' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: 'Capital', value: `$${totalCapital.toLocaleString()}` },
                { label: 'Long', value: `$${totalLongNotional.toLocaleString()}`, color: 'text-emerald-400' },
                { label: 'Short', value: `$${totalShortNotional.toLocaleString()}`, color: 'text-red-400' },
                { label: '$/Jour', value: `$${(yearlyYield / 365).toFixed(2)}`, color: 'text-emerald-400' },
                { label: '$/An', value: `$${yearlyYield.toFixed(0)}`, color: 'text-emerald-400' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <div className="text-[10px] uppercase tracking-wider text-white/30">{s.label}</div>
                  <div className={`text-lg font-semibold ${s.color || ''}`}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3 space-y-4">
                {/* Add Position */}
                <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                  <div className="text-[10px] uppercase tracking-wider text-white/30 mb-3">Nouvelle Position</div>
                  <div className="space-y-2">
                    <input
                      placeholder="PAIR (BTC, ETH, EUR/USD...)"
                      value={newPos.pair}
                      onChange={e => setNewPos({...newPos, pair: e.target.value.toUpperCase()})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono placeholder:text-white/20 focus:outline-none"
                    />
                    <div className="flex gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <select value={newPos.longPlatform} onChange={e => setNewPos({...newPos, longPlatform: e.target.value})}
                        className="bg-transparent text-emerald-400 text-sm focus:outline-none flex-1">
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input placeholder="$" type="number" value={newPos.longCapital}
                        onChange={e => setNewPos({...newPos, longCapital: e.target.value})}
                        className="w-20 bg-transparent border-l border-emerald-500/30 pl-2 text-sm focus:outline-none" />
                      <input placeholder="×Lev" type="number" value={newPos.longLeverage}
                        onChange={e => setNewPos({...newPos, longLeverage: e.target.value})}
                        className="w-16 bg-transparent border-l border-emerald-500/30 pl-2 text-sm focus:outline-none" />
                      <input placeholder="APR%" type="number" value={newPos.longApr}
                        onChange={e => setNewPos({...newPos, longApr: e.target.value})}
                        className="w-20 bg-transparent border-l border-emerald-500/30 pl-2 text-sm text-emerald-400 focus:outline-none" />
                      <span className="text-emerald-400 text-xs font-bold self-center px-2">LONG</span>
                    </div>
                    <div className="flex gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                      <select value={newPos.shortPlatform} onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})}
                        className="bg-transparent text-red-400 text-sm focus:outline-none flex-1">
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input placeholder="$" type="number" value={newPos.shortCapital}
                        onChange={e => setNewPos({...newPos, shortCapital: e.target.value})}
                        className="w-20 bg-transparent border-l border-red-500/30 pl-2 text-sm focus:outline-none" />
                      <input placeholder="×Lev" type="number" value={newPos.shortLeverage}
                        onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})}
                        className="w-16 bg-transparent border-l border-red-500/30 pl-2 text-sm focus:outline-none" />
                      <input placeholder="APR%" type="number" value={newPos.shortApr}
                        onChange={e => setNewPos({...newPos, shortApr: e.target.value})}
                        className="w-20 bg-transparent border-l border-red-500/30 pl-2 text-sm text-red-400 focus:outline-none" />
                      <span className="text-red-400 text-xs font-bold self-center px-2">SHORT</span>
                    </div>
                    <button onClick={addPosition} className="w-full bg-white text-black rounded-lg py-2 text-sm font-semibold hover:bg-white/90">
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Positions */}
                <div className="bg-white/[0.03] rounded-lg border border-white/5 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-wider text-white/30 border-b border-white/5">
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
                            <td className="p-3 font-mono font-bold">{pos.pair}</td>
                            <td className="p-3 text-xs">
                              <span style={{color: longP?.color}}>{longP?.name}</span>
                              <span className="text-white/40 ml-1">${longNotional.toLocaleString()}</span>
                              <span className="text-emerald-400 ml-1">+{pos.longApr}%</span>
                            </td>
                            <td className="p-3 text-xs">
                              <span style={{color: shortP?.color}}>{shortP?.name}</span>
                              <span className="text-white/40 ml-1">${shortNotional.toLocaleString()}</span>
                              <span className="text-red-400 ml-1">-{pos.shortApr}%</span>
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
                        <tr><td colSpan={6} className="p-6 text-center text-white/20">Aucune position</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <div className="text-[10px] uppercase tracking-wider text-white/30 mb-2">Plateformes</div>
                  {FUNDING_PLATFORMS.map(p => (
                    <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded hover:bg-white/5 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: p.color}} />
                        <span>{p.name}</span>
                      </div>
                      <Icons.External />
                    </a>
                  ))}
                </div>
                <a href="https://fundingview.app/dashboard" target="_blank" rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-fuchsia-600/20 to-violet-600/20 rounded-lg p-3 border border-fuchsia-500/20 hover:border-fuchsia-500/40">
                  <div className="font-semibold text-sm">FundingView</div>
                  <div className="text-[10px] text-white/40">Compare les fundings</div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PREDICTIONS ==================== */}
        {activeTab === 'predictions' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {PREDICTION_SITES.map(site => (
              <a key={site.name} href={site.url} target="_blank" rel="noopener noreferrer"
                className="bg-white/[0.03] rounded-lg p-4 border border-white/5 hover:bg-white/[0.05] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: site.color}} />
                  <Icons.External />
                </div>
                <div className="font-semibold mb-0.5">{site.name}</div>
                <div className="text-xs text-white/40">{site.desc}</div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
