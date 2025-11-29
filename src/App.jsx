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
  ChevronDown: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>,
};

// ==================== FUNDING PLATFORMS ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80', logo: 'https://www.google.com/s2/favicons?domain=hyperliquid.xyz&sz=128', apiKey: 'hyperliquid' },
  { id: 'ostium', name: 'Ostium', url: 'https://app.ostium.com/trade', color: '#3b82f6', logo: 'https://www.google.com/s2/favicons?domain=ostium.io&sz=128', apiKey: null },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa', logo: 'https://www.google.com/s2/favicons?domain=vestmarkets.com&sz=128', apiKey: 'vest' },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6', logo: 'https://www.google.com/s2/favicons?domain=paradex.trade&sz=128', apiKey: 'paradex' },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa', logo: 'https://www.google.com/s2/favicons?domain=extended.exchange&sz=128', apiKey: 'extended' },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee', logo: 'https://www.google.com/s2/favicons?domain=lighter.xyz&sz=128', apiKey: 'lighter' },
  { id: 'vertex', name: 'Vertex', url: 'https://app.vertexprotocol.com/', color: '#8b5cf6', logo: 'https://www.google.com/s2/favicons?domain=vertexprotocol.com&sz=128', apiKey: 'vertex' },
];

// ==================== PREDICTION SITES ====================
const PREDICTION_SITES = [
  { name: 'Polymarket', url: 'https://polymarket.com/', desc: 'Leader mondial, liquidité max', color: '#6366f1', twitter: 'Polymarket', logo: 'https://www.google.com/s2/favicons?domain=polymarket.com&sz=128' },
  { name: 'Myriad', url: 'https://myriad.markets/earn', desc: 'Earn rewards + airdrop', color: '#8b5cf6', twitter: 'maboroshi_myriad', logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' },
  { name: 'Myriad BNB', url: 'https://bnb.myriadprotocol.com/markets', desc: 'Version BNB Chain', color: '#f0b90b', twitter: 'maboroshi_myriad', logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' },
  { name: 'Limitless', url: 'https://limitless.exchange/advanced', desc: 'Advanced prediction trading', color: '#ec4899', twitter: 'trylimitless', logo: 'https://www.google.com/s2/favicons?domain=limitless.exchange&sz=128' },
  { name: 'PredictBase', url: 'https://predictbase.app/', desc: 'Nouvelle plateforme', color: '#14b8a6', twitter: 'predictbase_', logo: 'https://www.google.com/s2/favicons?domain=predictbase.app&sz=128' },
  { name: 'Opinion', url: 'https://app.opinion.trade/profile', desc: 'Opinion-based markets', color: '#f97316', twitter: 'OpinionLabsXYZ', logo: 'https://www.google.com/s2/favicons?domain=opinion.trade&sz=128' },
  { name: 'XO Market', url: 'https://beta.xo.market/markets?sort=volume-high-to-low', desc: 'Beta - high volume', color: '#06b6d4', twitter: 'xikimarkets', logo: 'https://www.google.com/s2/favicons?domain=xo.market&sz=128' },
];

// ==================== STOCK LOGOS MAPPING ====================
const STOCK_LOGOS = {
  // Tech
  NVDA: 'nvidia.com', AAPL: 'apple.com', MSFT: 'microsoft.com', GOOGL: 'google.com', META: 'meta.com',
  AMZN: 'amazon.com', TSLA: 'tesla.com', AMD: 'amd.com', INTC: 'intel.com', ASML: 'asml.com',
  TSM: 'tsmc.com', AVGO: 'broadcom.com', QCOM: 'qualcomm.com', MU: 'micron.com', LRCX: 'lamresearch.com',
  // Uranium
  CCJ: 'cameco.com', URA: 'globalxetfs.com', URNM: 'sprott.com', NXE: 'nexgenenergy.ca', DNN: 'denisonmines.com',
  UEC: 'uraniumenergy.com', UUUU: 'energyfuels.com',
  // Space
  RKLB: 'rocketlabusa.com', LUNR: 'intuitivemachines.com', PL: 'planet.com', SPCE: 'virgingalactic.com',
  // Defense
  PLTR: 'palantir.com', LMT: 'lockheedmartin.com', RTX: 'rtx.com', NOC: 'northropgrumman.com',
  BA: 'boeing.com', GD: 'gd.com', AVAV: 'avinc.com', LHX: 'l3harris.com',
  // Japan
  EWJ: 'ishares.com', DXJ: 'wisdomtree.com',
  // Copper
  FCX: 'fcx.com', SCCO: 'southerncoppercorp.com', COPX: 'globalxetfs.com',
  // Energy
  PWR: 'quantaservices.com', ETN: 'eaton.com',
};

const getStockLogo = (symbol) => {
  const domain = STOCK_LOGOS[symbol];
  if (domain) return `https://logo.clearbit.com/${domain}`;
  return `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;
};

// ==================== DEFAULT WATCHLIST ====================
const DEFAULT_WATCHLIST = [
  { symbol: 'CCJ', group: 'Uranium', weight: 50 },
  { symbol: 'URA', group: 'Uranium', weight: 40 },
  { symbol: 'URNM', group: 'Uranium', weight: 30 },
  { symbol: 'NXE', group: 'Uranium', weight: 25 },
  { symbol: 'NVDA', group: 'Semiconductors', weight: 100 },
  { symbol: 'ASML', group: 'Semiconductors', weight: 60 },
  { symbol: 'TSM', group: 'Semiconductors', weight: 70 },
  { symbol: 'AMD', group: 'Semiconductors', weight: 50 },
  { symbol: 'RKLB', group: 'Space', weight: 35 },
  { symbol: 'LUNR', group: 'Space', weight: 25 },
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
  let remainingWidth = width, remainingHeight = height;
  let remainingItems = [...items].sort((a, b) => (b.weight || 1) - (a.weight || 1));
  
  while (remainingItems.length > 0) {
    const isHorizontal = remainingWidth >= remainingHeight;
    const side = isHorizontal ? remainingHeight : remainingWidth;
    let rowItems = [], rowWeight = 0;
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
    
    if (isHorizontal) { x += rowSize; remainingWidth -= rowSize; }
    else { y += rowSize; remainingHeight -= rowSize; }
    remainingItems = remainingItems.filter(item => !rowItems.includes(item));
  }
  return result;
};

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('stocks');
  
  // ===== STOCKS STATE =====
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist_v8');
    return saved ? JSON.parse(saved) : DEFAULT_WATCHLIST;
  });
  const [stockData, setStockData] = useState({});
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({ symbol: '', group: '', weight: '30' });

  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions_v8');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPos, setNewPos] = useState({
    pair: '', longPlatform: 'hyperliquid', shortPlatform: 'vest',
    longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
    longApr: '', shortApr: '',
  });
  const [allFundingRates, setAllFundingRates] = useState({});
  const [loadingFunding, setLoadingFunding] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState([]);

  // ===== PERSISTENCE =====
  useEffect(() => { localStorage.setItem('watchlist_v8', JSON.stringify(watchlist)); }, [watchlist]);
  useEffect(() => { localStorage.setItem('positions_v8', JSON.stringify(positions)); }, [positions]);

  // ===== FETCH STOCK DATA =====
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
          newData[q.symbol] = {
            price: q.regularMarketPrice || 0,
            change: q.regularMarketChangePercent || 0,
            marketCap: q.marketCap || 0,
            name: q.shortName || q.symbol,
          };
        });
        setStockData(newData);
      }
    } catch (e) { console.error('Failed to fetch stocks:', e); }
    setLoadingStocks(false);
  }, [watchlist]);

  // ===== FETCH ALL FUNDING RATES FROM LORIS =====
  const fetchFundingRates = useCallback(async () => {
    setLoadingFunding(true);
    try {
      const res = await fetch('https://loris.tools/api/funding-rates');
      if (res.ok) {
        const data = await res.json();
        setAllFundingRates(data.funding_rates || {});
        setAvailableSymbols(data.symbols || []);
      }
    } catch (e) {
      console.error('Failed to fetch funding rates:', e);
    }
    setLoadingFunding(false);
  }, []);

  useEffect(() => {
    fetchStockData();
    fetchFundingRates();
    const i1 = setInterval(fetchStockData, 60000);
    const i2 = setInterval(fetchFundingRates, 60000);
    return () => { clearInterval(i1); clearInterval(i2); };
  }, [fetchStockData, fetchFundingRates]);

  // ===== GET FUNDING RATE FOR PLATFORM + SYMBOL =====
  const getFundingRate = (platformId, symbol) => {
    const platform = FUNDING_PLATFORMS.find(p => p.id === platformId);
    if (!platform?.apiKey) return null;
    
    // Map platform IDs to Loris API keys
    const apiKeyMap = {
      'hyperliquid': 'hyperliquid',
      'vest': 'vest',
      'extended': 'extended',
      'lighter': 'lighter',
      'paradex': 'paradex',
      'vertex': 'vertex',
    };
    
    const lorisKey = apiKeyMap[platformId];
    if (!lorisKey) return null;
    
    // Try different key formats in the API response
    const possibleKeys = [
      lorisKey,
      `${lorisKey}_1_perp`,
      `${lorisKey}_perp`,
    ];
    
    for (const key of possibleKeys) {
      if (allFundingRates[key] && allFundingRates[key][symbol] !== undefined) {
        return allFundingRates[key][symbol];
      }
    }
    return null;
  };

  // ===== AUTO-FILL APR WHEN PLATFORM/PAIR CHANGES =====
  useEffect(() => {
    if (newPos.pair) {
      const longRate = getFundingRate(newPos.longPlatform, newPos.pair);
      const shortRate = getFundingRate(newPos.shortPlatform, newPos.pair);
      
      setNewPos(prev => ({
        ...prev,
        longApr: longRate !== null ? longRate.toString() : prev.longApr,
        shortApr: shortRate !== null ? shortRate.toString() : prev.shortApr,
      }));
    }
  }, [newPos.pair, newPos.longPlatform, newPos.shortPlatform, allFundingRates]);

  // ===== FUNDING CALCULATIONS =====
  // Delta Neutral: Long pays when rate positive, Short receives when rate positive
  // Net Yield = -LongRate + ShortRate (simplifié: Short - Long)
  const calculateNetYield = (longApr, shortApr, longNotional, shortNotional) => {
    const longRate = parseFloat(longApr) || 0;
    const shortRate = parseFloat(shortApr) || 0;
    
    // Pour Long: rate positif = tu paies, rate négatif = tu reçois
    // Pour Short: rate positif = tu reçois, rate négatif = tu paies
    const longYield = -longRate; // Inverse car long paie quand positif
    const shortYield = shortRate; // Short reçoit quand positif
    
    const avgNotional = (longNotional + shortNotional) / 2;
    const netApr = longYield + shortYield;
    const dailyYield = (avgNotional * netApr / 100) / 365;
    
    return { netApr, dailyYield };
  };

  const totalCapital = positions.reduce((a, b) => a + Number(b.longCapital || 0) + Number(b.shortCapital || 0), 0);
  const totalStats = positions.reduce((acc, pos) => {
    const longNotional = Number(pos.longCapital || 0) * Number(pos.longLeverage || 1);
    const shortNotional = Number(pos.shortCapital || 0) * Number(pos.shortLeverage || 1);
    const { dailyYield } = calculateNetYield(pos.longApr, pos.shortApr, longNotional, shortNotional);
    return { ...acc, dailyYield: acc.dailyYield + dailyYield };
  }, { dailyYield: 0 });

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
    if (c > 5) return '#16a34a';
    if (c > 2) return '#15803d';
    if (c > 0) return '#166534';
    if (c > -2) return '#7f1d1d';
    if (c > -5) return '#991b1b';
    return '#b91c1c';
  };

  const tabs = [
    { id: 'stocks', label: 'Markets', icon: Icons.TrendUp },
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-20 right-10 w-[200px] h-[200px] bg-pink-500/10 rounded-full blur-[80px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="pt-8 pb-6 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                    <Icons.Sparkles />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#09090b] animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                    Nexus
                  </h1>
                  <p className="text-sm text-white/30">Market Intelligence Platform</p>
                </div>
              </div>
            </div>

            <nav className="flex justify-center">
              <div className="inline-flex gap-2 p-2 bg-white/[0.03] rounded-2xl border border-white/[0.06] backdrop-blur-xl shadow-xl">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                      activeTab === tab.id ? 'text-white' : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-xl border border-white/10 shadow-lg" />
                    )}
                    <span className="relative"><tab.icon /></span>
                    <span className="relative">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">

          {/* ==================== STOCKS ==================== */}
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex items-center justify-between bg-white/[0.02] rounded-2xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchStockData}
                    disabled={loadingStocks}
                    className={`p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all ${loadingStocks ? 'animate-spin' : ''}`}
                  >
                    <Icons.Refresh />
                  </button>
                  <div>
                    <div className="text-sm font-medium">Live Market Data</div>
                    <div className="text-xs text-white/30">Auto-refresh every minute</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    placeholder="TICKER"
                    value={newStock.symbol}
                    onChange={e => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                    onKeyDown={e => e.key === 'Enter' && addStock()}
                    className="w-24 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    placeholder="Sector"
                    value={newStock.group}
                    onChange={e => setNewStock({ ...newStock, group: e.target.value })}
                    className="w-28 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50"
                  />
                  <button onClick={addStock} className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/20">
                    <Icons.Plus />
                  </button>
                </div>
              </div>

              {/* Treemap */}
              <div className="relative bg-white/[0.02] rounded-3xl border border-white/[0.06] overflow-hidden shadow-2xl" style={{ height: '550px' }}>
                {treemapData.map((item) => {
                  const data = stockData[item.symbol] || {};
                  const isSelected = selectedStock === item.symbol;
                  const change = data.change || 0;
                  
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
                        padding: '2px',
                      }}
                    >
                      <div 
                        className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-white shadow-2xl scale-[1.02]' : 'hover:brightness-110'}`}
                        style={{ backgroundColor: getColor(change) }}
                      >
                        {/* Logo background */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img 
                            src={getStockLogo(item.symbol)}
                            alt=""
                            className="w-2/3 h-2/3 object-contain opacity-20 grayscale"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        </div>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        {/* Delete button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteStock(item.symbol); }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <Icons.X />
                        </button>

                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center p-2">
                          <div className="font-bold text-white drop-shadow-lg" style={{ fontSize: item.width > 15 ? '1.25rem' : '1rem' }}>
                            {item.symbol}
                          </div>
                          <div className={`font-semibold drop-shadow ${change >= 0 ? 'text-white' : 'text-white/90'}`} style={{ fontSize: item.width > 15 ? '1rem' : '0.875rem' }}>
                            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                          </div>
                          {item.width > 18 && item.height > 18 && data.price > 0 && (
                            <div className="text-white/70 text-xs mt-1">${data.price.toFixed(2)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Stock Chart */}
              {selectedStock && (
                <div className="bg-white/[0.02] rounded-3xl border border-white/[0.06] overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                        <img 
                          src={getStockLogo(selectedStock)}
                          alt=""
                          className="w-8 h-8 object-contain"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-xl">{selectedStock}</div>
                        <div className="text-sm text-white/40">{stockData[selectedStock]?.name}</div>
                      </div>
                      {stockData[selectedStock] && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${stockData[selectedStock].change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {stockData[selectedStock].change >= 0 ? '+' : ''}{stockData[selectedStock].change?.toFixed(2)}%
                        </div>
                      )}
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
                  { label: 'Capital Total', value: `$${totalCapital.toLocaleString()}`, icon: '💰' },
                  { label: 'Yield / Day', value: `$${totalStats.dailyYield.toFixed(2)}`, color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400', icon: '📈' },
                  { label: 'Yield / Month', value: `$${(totalStats.dailyYield * 30).toFixed(0)}`, color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400', icon: '📊' },
                  { label: 'Yield / Year', value: `$${(totalStats.dailyYield * 365).toFixed(0)}`, color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400', icon: '🎯' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-xs uppercase tracking-widest text-white/30">{s.label}</span>
                    </div>
                    <div className={`text-2xl font-bold ${s.color || ''}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* Platform + Pair Selector */}
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
                    <div className="text-sm font-medium mb-4 flex items-center justify-between">
                      <span>New Delta Neutral Position</span>
                      <button onClick={fetchFundingRates} className={`text-white/30 hover:text-white ${loadingFunding ? 'animate-spin' : ''}`}>
                        <Icons.Refresh />
                      </button>
                    </div>
                    
                    {/* Symbol Selector */}
                    <div className="mb-4">
                      <label className="text-xs text-white/30 uppercase tracking-wider mb-2 block">Select Pair</label>
                      <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto">
                        {availableSymbols.slice(0, 40).map(symbol => (
                          <button
                            key={symbol}
                            onClick={() => setNewPos({ ...newPos, pair: symbol })}
                            className={`p-2 rounded-lg text-xs font-mono transition-all ${
                              newPos.pair === symbol 
                                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' 
                                : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06]'
                            }`}
                          >
                            {symbol}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Long Position */}
                    <div className="mb-3">
                      <label className="text-xs text-emerald-400 uppercase tracking-wider mb-2 block">Long Position</label>
                      <div className="flex gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-center gap-2 flex-1">
                          {FUNDING_PLATFORMS.find(p => p.id === newPos.longPlatform) && (
                            <img 
                              src={FUNDING_PLATFORMS.find(p => p.id === newPos.longPlatform)?.logo} 
                              alt="" 
                              className="w-5 h-5 rounded"
                            />
                          )}
                          <select 
                            value={newPos.longPlatform} 
                            onChange={e => setNewPos({...newPos, longPlatform: e.target.value})} 
                            className="flex-1 bg-transparent text-emerald-400 focus:outline-none"
                          >
                            {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                          </select>
                        </div>
                        <input placeholder="Capital $" type="number" value={newPos.longCapital} onChange={e => setNewPos({...newPos, longCapital: e.target.value})} className="w-24 bg-transparent border-l border-emerald-500/30 pl-3 focus:outline-none" />
                        <input placeholder="×Lev" type="number" value={newPos.longLeverage} onChange={e => setNewPos({...newPos, longLeverage: e.target.value})} className="w-16 bg-transparent border-l border-emerald-500/30 pl-3 focus:outline-none" />
                        <input placeholder="APR%" type="number" value={newPos.longApr} onChange={e => setNewPos({...newPos, longApr: e.target.value})} className="w-20 bg-transparent border-l border-emerald-500/30 pl-3 text-emerald-400 focus:outline-none" />
                      </div>
                    </div>

                    {/* Short Position */}
                    <div className="mb-4">
                      <label className="text-xs text-red-400 uppercase tracking-wider mb-2 block">Short Position</label>
                      <div className="flex gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center gap-2 flex-1">
                          {FUNDING_PLATFORMS.find(p => p.id === newPos.shortPlatform) && (
                            <img 
                              src={FUNDING_PLATFORMS.find(p => p.id === newPos.shortPlatform)?.logo} 
                              alt="" 
                              className="w-5 h-5 rounded"
                            />
                          )}
                          <select 
                            value={newPos.shortPlatform} 
                            onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})} 
                            className="flex-1 bg-transparent text-red-400 focus:outline-none"
                          >
                            {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                          </select>
                        </div>
                        <input placeholder="Capital $" type="number" value={newPos.shortCapital} onChange={e => setNewPos({...newPos, shortCapital: e.target.value})} className="w-24 bg-transparent border-l border-red-500/30 pl-3 focus:outline-none" />
                        <input placeholder="×Lev" type="number" value={newPos.shortLeverage} onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})} className="w-16 bg-transparent border-l border-red-500/30 pl-3 focus:outline-none" />
                        <input placeholder="APR%" type="number" value={newPos.shortApr} onChange={e => setNewPos({...newPos, shortApr: e.target.value})} className="w-20 bg-transparent border-l border-red-500/30 pl-3 text-red-400 focus:outline-none" />
                      </div>
                    </div>

                    {/* Add Button */}
                    <button 
                      onClick={addPosition} 
                      disabled={!newPos.pair}
                      className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Position {newPos.pair && `(${newPos.pair})`}
                    </button>
                  </div>

                  {/* Positions Table */}
                  <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs uppercase tracking-widest text-white/30 border-b border-white/[0.06]">
                          <th className="text-left p-4">Pair</th>
                          <th className="text-left p-4">Long</th>
                          <th className="text-left p-4">Short</th>
                          <th className="text-right p-4">Net APR</th>
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
                          const { netApr, dailyYield } = calculateNetYield(pos.longApr, pos.shortApr, longN, shortN);
                          
                          return (
                            <tr key={pos.id} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                              <td className="p-4">
                                <span className="font-mono font-bold text-lg">{pos.pair}</span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <img src={longP?.logo} alt="" className="w-5 h-5 rounded" />
                                  <div>
                                    <div style={{color: longP?.color}}>{longP?.name}</div>
                                    <div className="text-xs text-white/40">${longN.toLocaleString()} • {pos.longApr}%</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <img src={shortP?.logo} alt="" className="w-5 h-5 rounded" />
                                  <div>
                                    <div style={{color: shortP?.color}}>{shortP?.name}</div>
                                    <div className="text-xs text-white/40">${shortN.toLocaleString()} • {pos.shortApr}%</div>
                                  </div>
                                </div>
                              </td>
                              <td className={`p-4 text-right font-bold ${netApr >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {netApr >= 0 ? '+' : ''}{netApr.toFixed(2)}%
                              </td>
                              <td className={`p-4 text-right font-bold text-lg ${dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {dailyYield >= 0 ? '+' : ''}${dailyYield.toFixed(2)}
                              </td>
                              <td className="p-4">
                                <button onClick={() => deletePosition(pos.id)} className="text-white/20 hover:text-red-400">
                                  <Icons.Trash />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {positions.length === 0 && (
                          <tr><td colSpan={6} className="p-8 text-center text-white/20">No positions yet</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/[0.06]">
                    <div className="text-xs uppercase tracking-widest text-white/30 mb-3">Trading Platforms</div>
                    {FUNDING_PLATFORMS.map(p => (
                      <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center gap-3">
                          <img src={p.logo} alt="" className="w-6 h-6 rounded" />
                          <span className="font-medium">{p.name}</span>
                          {p.apiKey && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">LIVE</span>}
                        </div>
                        <Icons.External />
                      </a>
                    ))}
                  </div>

                  <a href="https://fundingview.app/dashboard" target="_blank" rel="noopener noreferrer" 
                    className="block bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 rounded-2xl p-4 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all group">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold">FundingView</div>
                        <div className="text-xs text-white/40">Compare all funding rates</div>
                      </div>
                      <Icons.External />
                    </div>
                  </a>

                  <a href="https://loris.tools" target="_blank" rel="noopener noreferrer" 
                    className="block bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-4 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold">Loris Tools</div>
                        <div className="text-xs text-white/40">API source for rates</div>
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
                <div key={site.name} className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
                  {/* Header */}
                  <div className="h-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${site.color}30, ${site.color}10)` }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <img src={site.logo} alt="" className="w-16 h-16 object-contain" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent" />
                  </div>
                  
                  <div className="p-5 -mt-10 relative">
                    {/* Logo */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-4 border-[#09090b] overflow-hidden" style={{ backgroundColor: site.color }}>
                      <img 
                        src={site.logo} 
                        alt={site.name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-2xl font-bold">${site.name.charAt(0)}</span>`; }}
                      />
                    </div>
                    
                    <div className="font-bold text-xl mb-1">{site.name}</div>
                    <p className="text-sm text-white/40 mb-4">{site.desc}</p>
                    
                    <div className="flex items-center gap-2">
                      <a href={site.url} target="_blank" rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: site.color }}>
                        Ouvrir <Icons.External />
                      </a>
                      <a href={`https://twitter.com/${site.twitter}`} target="_blank" rel="noopener noreferrer" 
                        className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-all">
                        <Icons.Twitter />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] py-6 mt-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-white/20 text-sm">
            Nexus • Market Intelligence Platform • Data from Yahoo Finance & Loris Tools
          </div>
        </footer>
      </div>
    </div>
  );
}
