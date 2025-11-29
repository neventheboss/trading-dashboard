import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ==================== ICONS ====================
const Icons = {
  Zap: () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Target: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  TrendUp: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Refresh: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  X: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>,
  Twitter: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Sparkles: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>,
};

// ==================== CONFIG ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80', hasApi: true },
  { id: 'ostium', name: 'Ostium', url: 'https://app.ostium.com/trade', color: '#3b82f6', hasApi: false },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa', hasApi: false },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6', hasApi: false },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa', hasApi: false },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee', hasApi: false },
  { id: 'xyz', name: 'XYZ', url: 'https://trade.xyz/', color: '#facc15', hasApi: false },
];

const PREDICTION_SITES = [
  { name: 'Polymarket', url: 'https://polymarket.com/', desc: 'Leader mondial', color: '#6366f1', twitter: 'Polymarket' },
  { name: 'Myriad', url: 'https://myriad.markets/earn', desc: 'Earn + airdrop', color: '#8b5cf6', twitter: 'maboroshi_myriad' },
  { name: 'Myriad BNB', url: 'https://bnb.myriadprotocol.com/markets', desc: 'BNB Chain', color: '#f0b90b', twitter: 'maboroshi_myriad' },
  { name: 'Limitless', url: 'https://limitless.exchange/advanced', desc: 'Advanced trading', color: '#ec4899', twitter: 'trylimitless' },
  { name: 'PredictBase', url: 'https://predictbase.app/', desc: 'Nouveau', color: '#14b8a6', twitter: 'predictbase_' },
  { name: 'Opinion', url: 'https://app.opinion.trade/profile', desc: 'Opinion markets', color: '#f97316', twitter: 'OpinionLabsXYZ' },
  { name: 'XO Market', url: 'https://beta.xo.market/markets?sort=volume-high-to-low', desc: 'Beta', color: '#06b6d4', twitter: 'xikimarkets' },
];

const CRYPTO_PAIRS = ['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'MATIC', 'LINK', 'UNI', 'AAVE', 'CRV', 'LDO', 'MKR', 'SNX'];
const FOREX_PAIRS = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'EUR/GBP', 'GBP/JPY'];

const DEFAULT_WATCHLIST = [
  { symbol: 'CCJ', group: 'Uranium', weight: 50 },
  { symbol: 'URA', group: 'Uranium', weight: 40 },
  { symbol: 'URNM', group: 'Uranium', weight: 30 },
  { symbol: 'NXE', group: 'Uranium', weight: 25 },
  { symbol: 'DNN', group: 'Uranium', weight: 20 },
  { symbol: 'NVDA', group: 'Semiconductors', weight: 100 },
  { symbol: 'ASML', group: 'Semiconductors', weight: 60 },
  { symbol: 'TSM', group: 'Semiconductors', weight: 70 },
  { symbol: 'AMD', group: 'Semiconductors', weight: 50 },
  { symbol: 'RKLB', group: 'Space', weight: 30 },
  { symbol: 'LUNR', group: 'Space', weight: 20 },
  { symbol: 'PLTR', group: 'Defense', weight: 55 },
  { symbol: 'LMT', group: 'Defense', weight: 60 },
  { symbol: 'RTX', group: 'Defense', weight: 50 },
  { symbol: 'EWJ', group: 'Japan', weight: 40 },
  { symbol: 'FCX', group: 'Copper', weight: 35 },
];

// ==================== TREEMAP LAYOUT ====================
const calculateTreemap = (items, width, height) => {
  const total = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  const result = [];
  
  let x = 0, y = 0;
  let remainingWidth = width;
  let remainingHeight = height;
  let remainingItems = [...items].sort((a, b) => (b.weight || 1) - (a.weight || 1));
  
  while (remainingItems.length > 0) {
    const isHorizontal = remainingWidth >= remainingHeight;
    const side = isHorizontal ? remainingHeight : remainingWidth;
    
    // Find how many items fit in this row
    let rowItems = [];
    let rowWeight = 0;
    const remainingTotal = remainingItems.reduce((sum, item) => sum + (item.weight || 1), 0);
    
    for (let i = 0; i < remainingItems.length; i++) {
      const item = remainingItems[i];
      const itemWeight = item.weight || 1;
      const testRowWeight = rowWeight + itemWeight;
      const rowSize = (testRowWeight / remainingTotal) * (isHorizontal ? remainingWidth : remainingHeight);
      
      if (rowSize > side * 0.8 && rowItems.length > 0) break;
      
      rowItems.push(item);
      rowWeight = testRowWeight;
      
      if (rowItems.length >= 4) break;
    }
    
    if (rowItems.length === 0) rowItems = [remainingItems[0]];
    
    // Layout row
    const rowSize = (rowWeight / remainingTotal) * (isHorizontal ? remainingWidth : remainingHeight);
    let offset = 0;
    
    rowItems.forEach(item => {
      const itemWeight = item.weight || 1;
      const itemSize = (itemWeight / rowWeight) * side;
      
      result.push({
        ...item,
        x: isHorizontal ? x : x + offset,
        y: isHorizontal ? y + offset : y,
        width: isHorizontal ? rowSize : itemSize,
        height: isHorizontal ? itemSize : rowSize,
      });
      
      offset += itemSize;
    });
    
    // Update remaining space
    if (isHorizontal) {
      x += rowSize;
      remainingWidth -= rowSize;
    } else {
      y += rowSize;
      remainingHeight -= rowSize;
    }
    
    remainingItems = remainingItems.filter(item => !rowItems.includes(item));
  }
  
  return result;
};

// ==================== SPARKLINE ====================
const Sparkline = ({ data, color, width = 100, height = 30 }) => {
  if (!data || data.length < 2) return null;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width={width} height={height} className="opacity-50">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('stocks');
  
  // ===== STOCKS STATE =====
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist_v7');
    return saved ? JSON.parse(saved) : DEFAULT_WATCHLIST;
  });
  const [stockData, setStockData] = useState({});
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({ symbol: '', group: '', weight: '30' });

  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions_v7');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPos, setNewPos] = useState({
    pair: '', longPlatform: 'hyperliquid', shortPlatform: 'vest',
    longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
    longApr: '', shortApr: '',
  });
  const [liveRates, setLiveRates] = useState({});
  const [pairType, setPairType] = useState('crypto');

  // ===== PERSISTENCE =====
  useEffect(() => { localStorage.setItem('watchlist_v7', JSON.stringify(watchlist)); }, [watchlist]);
  useEffect(() => { localStorage.setItem('positions_v7', JSON.stringify(positions)); }, [positions]);

  // ===== FETCH DATA =====
  const fetchStockData = useCallback(async () => {
    if (watchlist.length === 0) return;
    setLoadingStocks(true);
    const symbols = watchlist.map(s => s.symbol).join(',');
    
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`)}`;
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const data = await res.json();
        const quotes = data?.quoteResponse?.result || [];
        const newData = {};
        quotes.forEach(q => {
          // Generate fake sparkline data based on current price
          const basePrice = q.regularMarketPrice || 100;
          const sparkline = Array(20).fill(0).map((_, i) => 
            basePrice * (1 + (Math.random() - 0.5) * 0.1)
          );
          sparkline.push(basePrice);
          
          newData[q.symbol] = {
            price: q.regularMarketPrice || 0,
            change: q.regularMarketChangePercent || 0,
            marketCap: q.marketCap || 0,
            name: q.shortName || q.symbol,
            sparkline,
          };
        });
        setStockData(newData);
      }
    } catch (e) {
      console.error('Failed to fetch:', e);
    }
    setLoadingStocks(false);
  }, [watchlist]);

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
          if (symbol) rates[symbol] = (parseFloat(ctx.funding || 0) * 3 * 365 * 100).toFixed(2);
        });
        setLiveRates(rates);
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    fetchStockData();
    fetchFundingRates();
    const i1 = setInterval(fetchStockData, 60000);
    const i2 = setInterval(fetchFundingRates, 30000);
    return () => { clearInterval(i1); clearInterval(i2); };
  }, [fetchStockData, fetchFundingRates]);

  // ===== CALCULATIONS =====
  const totalCapital = positions.reduce((a, b) => a + Number(b.longCapital || 0) + Number(b.shortCapital || 0), 0);
  const yearlyYield = positions.reduce((a, b) => {
    const avgNotional = ((Number(b.longCapital || 0) * Number(b.longLeverage || 1)) + (Number(b.shortCapital || 0) * Number(b.shortLeverage || 1))) / 2;
    return a + (avgNotional * (Math.abs(Number(b.longApr || 0)) + Math.abs(Number(b.shortApr || 0))) / 100);
  }, 0);

  // ===== HANDLERS =====
  const addStock = () => {
    if (!newStock.symbol) return;
    const symbol = newStock.symbol.toUpperCase().trim();
    if (watchlist.find(s => s.symbol === symbol)) return;
    setWatchlist([...watchlist, { symbol, group: newStock.group || 'Other', weight: Number(newStock.weight) || 30 }]);
    setNewStock({ symbol: '', group: '', weight: '30' });
    setTimeout(fetchStockData, 500);
  };

  const deleteStock = (symbol) => setWatchlist(watchlist.filter(s => s.symbol !== symbol));

  const addPosition = () => {
    if (!newPos.pair) return;
    setPositions([...positions, { id: Date.now(), ...newPos }]);
    setNewPos({ pair: '', longPlatform: 'hyperliquid', shortPlatform: 'vest', longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10', longApr: '', shortApr: '' });
  };

  const deletePosition = (id) => setPositions(positions.filter(p => p.id !== id));

  const selectPair = (pair) => {
    const rate = liveRates[pair] || '';
    setNewPos({ ...newPos, pair, longApr: rate, shortApr: rate });
  };

  // ===== TREEMAP =====
  const treemapData = useMemo(() => {
    const itemsWithData = watchlist.map(item => ({
      ...item,
      ...stockData[item.symbol],
      weight: stockData[item.symbol]?.marketCap ? Math.log10(stockData[item.symbol].marketCap) * 10 : (item.weight || 30),
    }));
    return calculateTreemap(itemsWithData, 100, 100);
  }, [watchlist, stockData]);

  const getColor = (change) => {
    const c = parseFloat(change) || 0;
    if (c > 5) return 'rgb(22, 163, 74)';
    if (c > 2) return 'rgb(21, 128, 61)';
    if (c > 0) return 'rgb(20, 83, 45)';
    if (c > -2) return 'rgb(127, 29, 29)';
    if (c > -5) return 'rgb(153, 27, 27)';
    return 'rgb(185, 28, 28)';
  };

  const tabs = [
    { id: 'stocks', label: 'Markets', icon: Icons.TrendUp },
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="pt-10 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Branding */}
            <div className="flex justify-center mb-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                    <Icons.Sparkles />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#09090b]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                    Nexus
                  </h1>
                  <p className="text-sm text-white/30">Market Intelligence</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex justify-center">
              <div className="inline-flex gap-2 p-2 bg-white/[0.03] rounded-2xl border border-white/[0.06] backdrop-blur-xl">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'text-white' 
                        : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-xl border border-white/10" />
                    )}
                    <span className="relative"><tab.icon /></span>
                    <span className="relative">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pb-16">

          {/* ==================== STOCKS ==================== */}
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchStockData}
                    disabled={loadingStocks}
                    className={`p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all ${loadingStocks ? 'animate-spin' : ''}`}
                  >
                    <Icons.Refresh />
                  </button>
                  <span className="text-sm text-white/20">Live data • Auto-refresh 1min</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    placeholder="TICKER"
                    value={newStock.symbol}
                    onChange={e => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                    onKeyDown={e => e.key === 'Enter' && addStock()}
                    className="w-24 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    placeholder="Sector"
                    value={newStock.group}
                    onChange={e => setNewStock({ ...newStock, group: e.target.value })}
                    className="w-28 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    placeholder="Size"
                    type="number"
                    value={newStock.weight}
                    onChange={e => setNewStock({ ...newStock, weight: e.target.value })}
                    className="w-20 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                  />
                  <button onClick={addStock} className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/20">
                    <Icons.Plus />
                  </button>
                </div>
              </div>

              {/* Treemap */}
              <div className="relative bg-white/[0.02] rounded-3xl border border-white/[0.06] overflow-hidden" style={{ height: '600px' }}>
                {treemapData.map((item, i) => {
                  const data = stockData[item.symbol] || {};
                  const isSelected = selectedStock === item.symbol;
                  
                  return (
                    <div
                      key={item.symbol}
                      onClick={() => setSelectedStock(isSelected ? null : item.symbol)}
                      className={`absolute cursor-pointer transition-all duration-300 group ${isSelected ? 'z-20' : 'z-10'}`}
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        width: `${item.width}%`,
                        height: `${item.height}%`,
                        padding: '3px',
                      }}
                    >
                      <div 
                        className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-white shadow-2xl scale-[1.02]' : 'hover:scale-[1.01]'}`}
                        style={{ backgroundColor: getColor(data.change || 0) }}
                      >
                        {/* Logo background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <img 
                            src={`https://logo.clearbit.com/${item.symbol.toLowerCase()}.com`}
                            alt=""
                            className="w-3/4 h-3/4 object-contain"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteStock(item.symbol); }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <Icons.X />
                        </button>

                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center p-3">
                          <div className="font-bold text-white text-xl drop-shadow-lg">{item.symbol}</div>
                          <div className={`text-lg font-semibold ${data.change >= 0 ? 'text-white' : 'text-white/90'}`}>
                            {data.change >= 0 ? '+' : ''}{(data.change || 0).toFixed(2)}%
                          </div>
                          {item.width > 15 && item.height > 15 && data.price > 0 && (
                            <div className="text-white/60 text-sm mt-1">${data.price.toFixed(2)}</div>
                          )}
                          {item.width > 20 && item.height > 20 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                              <Sparkline 
                                data={data.sparkline} 
                                color={data.change >= 0 ? '#fff' : '#fff'}
                                width={Math.min(80, item.width * 5)}
                                height={20}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Stock Detail */}
              {selectedStock && (
                <div className="bg-white/[0.02] rounded-3xl border border-white/[0.06] overflow-hidden">
                  <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={`https://logo.clearbit.com/${selectedStock.toLowerCase()}.com`}
                        alt=""
                        className="w-10 h-10 rounded-lg bg-white/10"
                        onError={(e) => e.target.src = ''}
                      />
                      <div>
                        <div className="font-bold text-xl">{selectedStock}</div>
                        <div className="text-sm text-white/40">{stockData[selectedStock]?.name}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedStock(null)} className="p-2 hover:bg-white/10 rounded-lg">
                      <Icons.X />
                    </button>
                  </div>
                  <div style={{ height: '400px' }}>
                    <iframe
                      src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&theme=dark&style=3&hide_top_toolbar=1&hide_legend=1&save_image=0&hide_volume=1`}
                      className="w-full h-full border-0"
                      title="Chart"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== FUNDING ==================== */}
          {activeTab === 'funding' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Capital', value: `$${totalCapital.toLocaleString()}` },
                  { label: 'Daily', value: `$${(yearlyYield / 365).toFixed(2)}`, color: 'text-emerald-400' },
                  { label: 'Monthly', value: `$${(yearlyYield / 12).toFixed(0)}`, color: 'text-emerald-400' },
                  { label: 'Yearly', value: `$${yearlyYield.toFixed(0)}`, color: 'text-emerald-400' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
                    <div className="text-xs uppercase tracking-widest text-white/30 mb-1">{s.label}</div>
                    <div className={`text-2xl font-bold ${s.color || ''}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* Pair Selector */}
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
                    <div className="flex gap-2 mb-4">
                      {['crypto', 'forex'].map(type => (
                        <button
                          key={type}
                          onClick={() => setPairType(type)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            pairType === type ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {(pairType === 'crypto' ? CRYPTO_PAIRS : FOREX_PAIRS).map(pair => (
                        <button
                          key={pair}
                          onClick={() => selectPair(pair)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            newPos.pair === pair ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]'
                          }`}
                        >
                          <div className="font-mono font-bold">{pair}</div>
                          {liveRates[pair] && pairType === 'crypto' && (
                            <div className={`text-xs mt-1 ${parseFloat(liveRates[pair]) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {liveRates[pair]}%
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06] space-y-3">
                    <div className="text-lg font-bold mb-2">{newPos.pair || 'Select a pair'}</div>
                    
                    <div className="flex gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <select value={newPos.longPlatform} onChange={e => setNewPos({...newPos, longPlatform: e.target.value})} className="flex-1 bg-transparent text-emerald-400 focus:outline-none">
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input placeholder="$" type="number" value={newPos.longCapital} onChange={e => setNewPos({...newPos, longCapital: e.target.value})} className="w-24 bg-transparent border-l border-emerald-500/30 pl-3 focus:outline-none" />
                      <input placeholder="×" type="number" value={newPos.longLeverage} onChange={e => setNewPos({...newPos, longLeverage: e.target.value})} className="w-16 bg-transparent border-l border-emerald-500/30 pl-3 focus:outline-none" />
                      <input placeholder="%" type="number" value={newPos.longApr} onChange={e => setNewPos({...newPos, longApr: e.target.value})} className="w-20 bg-transparent border-l border-emerald-500/30 pl-3 text-emerald-400 focus:outline-none" />
                      <span className="text-emerald-400 font-bold self-center">LONG</span>
                    </div>

                    <div className="flex gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <select value={newPos.shortPlatform} onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})} className="flex-1 bg-transparent text-red-400 focus:outline-none">
                        {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                      </select>
                      <input placeholder="$" type="number" value={newPos.shortCapital} onChange={e => setNewPos({...newPos, shortCapital: e.target.value})} className="w-24 bg-transparent border-l border-red-500/30 pl-3 focus:outline-none" />
                      <input placeholder="×" type="number" value={newPos.shortLeverage} onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})} className="w-16 bg-transparent border-l border-red-500/30 pl-3 focus:outline-none" />
                      <input placeholder="%" type="number" value={newPos.shortApr} onChange={e => setNewPos({...newPos, shortApr: e.target.value})} className="w-20 bg-transparent border-l border-red-500/30 pl-3 text-red-400 focus:outline-none" />
                      <span className="text-red-400 font-bold self-center">SHORT</span>
                    </div>

                    <button onClick={addPosition} className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-500/20">
                      Add Position
                    </button>
                  </div>

                  {/* Table */}
                  <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs uppercase tracking-widest text-white/30 border-b border-white/[0.06]">
                          <th className="text-left p-4">Pair</th>
                          <th className="text-left p-4">Long</th>
                          <th className="text-left p-4">Short</th>
                          <th className="text-right p-4">APR</th>
                          <th className="text-right p-4">Daily</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map(pos => {
                          const longP = FUNDING_PLATFORMS.find(p => p.id === pos.longPlatform);
                          const shortP = FUNDING_PLATFORMS.find(p => p.id === pos.shortPlatform);
                          const longN = Number(pos.longCapital || 0) * Number(pos.longLeverage || 1);
                          const shortN = Number(pos.shortCapital || 0) * Number(pos.shortLeverage || 1);
                          const netApr = Math.abs(Number(pos.longApr || 0)) + Math.abs(Number(pos.shortApr || 0));
                          const daily = ((longN + shortN) / 2 * netApr / 100) / 365;
                          
                          return (
                            <tr key={pos.id} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                              <td className="p-4 font-mono font-bold text-lg">{pos.pair}</td>
                              <td className="p-4">
                                <div style={{color: longP?.color}}>{longP?.name}</div>
                                <div className="text-xs text-white/40">${longN.toLocaleString()} • +{pos.longApr}%</div>
                              </td>
                              <td className="p-4">
                                <div style={{color: shortP?.color}}>{shortP?.name}</div>
                                <div className="text-xs text-white/40">${shortN.toLocaleString()} • -{pos.shortApr}%</div>
                              </td>
                              <td className="p-4 text-right text-emerald-400 font-bold">{netApr.toFixed(1)}%</td>
                              <td className="p-4 text-right text-emerald-400 font-bold text-lg">${daily.toFixed(2)}</td>
                              <td className="p-4">
                                <button onClick={() => deletePosition(pos.id)} className="text-white/20 hover:text-red-400"><Icons.Trash /></button>
                              </td>
                            </tr>
                          );
                        })}
                        {positions.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-white/20">No positions</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/[0.06]">
                    <div className="text-xs uppercase tracking-widest text-white/30 mb-3">Platforms</div>
                    {FUNDING_PLATFORMS.map(p => (
                      <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}} />
                          <span className="font-medium">{p.name}</span>
                        </div>
                        <Icons.External />
                      </a>
                    ))}
                  </div>

                  <a href="https://fundingview.app/dashboard" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 rounded-2xl p-4 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all">
                    <div className="font-bold">FundingView</div>
                    <div className="text-xs text-white/40">Compare all funding rates</div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PREDICTIONS ==================== */}
          {activeTab === 'predictions' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PREDICTION_SITES.map(site => (
                <div key={site.name} className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
                  <div className="h-24 relative overflow-hidden" style={{ backgroundColor: site.color + '20' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold opacity-10" style={{ color: site.color }}>
                      {site.name.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent" />
                  </div>
                  
                  <div className="p-5 -mt-8 relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold mb-3 border-4 border-[#09090b]" style={{ backgroundColor: site.color }}>
                      {site.name.charAt(0)}
                    </div>
                    
                    <div className="font-bold text-xl mb-1">{site.name}</div>
                    <p className="text-sm text-white/40 mb-3">{site.desc}</p>
                    
                    <div className="flex items-center gap-3">
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-all font-medium">
                        Open <Icons.External />
                      </a>
                      <a href={`https://twitter.com/${site.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-all">
                        <Icons.Twitter />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
