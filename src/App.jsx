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
  Football: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3l2.5 2-1 3h-3l-1-3L12 5zm-4.5 5h2l.5 3-2 2-2.5-1.5L5.5 10zm9 0l.5 2.5-2.5 1.5-2-2 .5-3h2l2 1zm-2.5 7l-2-1-2 1-1-2.5 2-2h2l2 2-1 2.5z"/></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>,
  Trophy: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2zM19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v3c0 2.2 1.8 4 4 4h.7c.5 1.2 1.5 2.2 2.8 2.7V18h-2v2h6v-2h-2v-2.3c1.3-.5 2.3-1.5 2.8-2.7h.7c2.2 0 4-1.8 4-4V6c0-1.1-.9-2-2-2zm-12 7c-1.1 0-2-.9-2-2V6h2v5zm10-2c0 1.1-.9 2-2 2V6h2v3z"/></svg>,
};

// ==================== FUNDING PLATFORMS ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80', logo: 'https://www.google.com/s2/favicons?domain=hyperliquid.xyz&sz=128', apiKey: 'hyperliquid' },
  { id: 'ostium', name: 'Ostium', url: 'https://app.ostium.com/trade', color: '#3b82f6', logo: 'https://www.google.com/s2/favicons?domain=ostium.io&sz=128', apiKey: null },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa', logo: 'https://www.google.com/s2/favicons?domain=vestmarkets.com&sz=128', apiKey: 'vest' },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6', logo: 'https://www.google.com/s2/favicons?domain=paradex.trade&sz=128', apiKey: 'paradex' },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa', logo: 'https://www.google.com/s2/favicons?domain=extended.exchange&sz=128', apiKey: 'extended' },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee', logo: 'https://www.google.com/s2/favicons?domain=lighter.xyz&sz=128', apiKey: 'lighter' },
  { id: 'xyz', name: 'XYZ', url: 'https://app.trade.xyz/trade', color: '#facc15', logo: 'https://www.google.com/s2/favicons?domain=trade.xyz&sz=128', apiKey: 'hyperliquid' }, // XYZ uses Hyperliquid
];

// ==================== PREDICTION SITES WITH USER PROFILES ====================
const PREDICTION_SITES = [
  { 
    name: 'Polymarket', 
    url: 'https://polymarket.com/', 
    profileUrl: 'https://polymarket.com/@neventheboss',
    desc: 'Leader mondial, liquidité max', 
    color: '#6366f1', 
    twitter: 'Polymarket', 
    logo: 'https://www.google.com/s2/favicons?domain=polymarket.com&sz=128' 
  },
  { 
    name: 'Myriad', 
    url: 'https://myriad.markets/earn', 
    profileUrl: 'https://myriad.markets/profile/0x5e5351219b9b9da69744A43101b9395BAdC9a2e9',
    desc: 'Earn rewards + airdrop', 
    color: '#8b5cf6', 
    twitter: 'MyriadMarkets', 
    logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' 
  },
  { 
    name: 'Myriad BNB', 
    url: 'https://bnb.myriadprotocol.com/markets', 
    profileUrl: null,
    desc: 'Version BNB Chain', 
    color: '#f0b90b', 
    twitter: 'MyriadMarkets', 
    logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' 
  },
  { 
    name: 'Limitless', 
    url: 'https://limitless.exchange/advanced', 
    profileUrl: 'https://limitless.exchange/profile/0x5e5351219b9b9da69744A43101b9395BAdC9a2e9',
    desc: 'Advanced prediction trading', 
    color: '#ec4899', 
    twitter: 'trylimitless', 
    logo: 'https://www.google.com/s2/favicons?domain=limitless.exchange&sz=128' 
  },
  { 
    name: 'PredictBase', 
    url: 'https://predictbase.app/', 
    profileUrl: null,
    desc: 'Nouvelle plateforme', 
    color: '#14b8a6', 
    twitter: 'PredictBase', 
    logo: 'https://www.google.com/s2/favicons?domain=predictbase.app&sz=128' 
  },
  { 
    name: 'Opinion', 
    url: 'https://app.opinion.trade/profile', 
    profileUrl: null,
    desc: 'Opinion-based markets', 
    color: '#f97316', 
    twitter: 'OpinionLabsXYZ', 
    logo: 'https://www.google.com/s2/favicons?domain=opinion.trade&sz=128' 
  },
  { 
    name: 'XO Market', 
    url: 'https://beta.xo.market/markets?sort=volume-high-to-low', 
    profileUrl: 'https://beta.xo.market/profile/neventheboss',
    desc: 'Beta - high volume', 
    color: '#06b6d4', 
    twitter: 'xodotmarket', 
    logo: 'https://www.google.com/s2/favicons?domain=xo.market&sz=128' 
  },
];

// ==================== STOCK LOGOS ====================
const STOCK_LOGOS = {
  NVDA: 'nvidia.com', AAPL: 'apple.com', MSFT: 'microsoft.com', GOOGL: 'google.com', META: 'meta.com',
  AMZN: 'amazon.com', TSLA: 'tesla.com', AMD: 'amd.com', INTC: 'intel.com', ASML: 'asml.com',
  TSM: 'tsmc.com', AVGO: 'broadcom.com', QCOM: 'qualcomm.com', MU: 'micron.com', LRCX: 'lamresearch.com',
  CCJ: 'cameco.com', URA: 'globalxetfs.com', URNM: 'sprott.com', NXE: 'nexgenenergy.ca', DNN: 'denisonmines.com',
  RKLB: 'rocketlabusa.com', LUNR: 'intuitivemachines.com', PL: 'planet.com',
  PLTR: 'palantir.com', LMT: 'lockheedmartin.com', RTX: 'rtx.com', NOC: 'northropgrumman.com',
  EWJ: 'ishares.com', DXJ: 'wisdomtree.com', FCX: 'fcx.com', SCCO: 'southerncoppercorp.com',
};

const getStockLogo = (symbol) => {
  const domain = STOCK_LOGOS[symbol];
  if (domain) return `https://logo.clearbit.com/${domain}`;
  return `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;
};

// ==================== DEFAULT DATA ====================
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

const CRYPTO_SYMBOLS = ['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'MATIC', 'LINK', 'UNI', 'AAVE', 'LDO', 'MKR', 'CRV', 'SNX', 'COMP', 'SUI', 'APT', 'INJ', 'SEI', 'TIA', 'STRK', 'JUP', 'WIF', 'PEPE', 'BONK', 'ORDI', 'NEAR', 'FTM', 'ATOM'];

// ==================== TREEMAP LAYOUT ====================
const calculateTreemap = (items, width, height) => {
  const total = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  const result = [];
  let x = 0, y = 0, remainingWidth = width, remainingHeight = height;
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
    const saved = localStorage.getItem('watchlist_v9');
    return saved ? JSON.parse(saved) : DEFAULT_WATCHLIST;
  });
  const [stockData, setStockData] = useState({});
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({ symbol: '', group: '', weight: '30' });

  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions_v9');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPos, setNewPos] = useState({
    pair: '', longPlatform: 'hyperliquid', shortPlatform: 'vest',
    longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10',
    longApr: '', shortApr: '',
  });
  const [allFundingRates, setAllFundingRates] = useState({});
  const [loadingFunding, setLoadingFunding] = useState(false);

  // ===== PERSISTENCE =====
  useEffect(() => { localStorage.setItem('watchlist_v9', JSON.stringify(watchlist)); }, [watchlist]);
  useEffect(() => { localStorage.setItem('positions_v9', JSON.stringify(positions)); }, [positions]);

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
      // Fetch from Loris Tools API
      const res = await fetch('https://loris.tools/api/funding-rates');
      if (res.ok) {
        const data = await res.json();
        console.log('Loris API response:', data);
        setAllFundingRates(data.funding_rates || {});
      }
    } catch (e) {
      console.error('Loris failed, trying Hyperliquid directly...');
      // Fallback to Hyperliquid API
      try {
        const hlRes = await fetch('https://api.hyperliquid.xyz/info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'metaAndAssetCtxs' })
        });
        const hlData = await hlRes.json();
        if (hlData?.[0]?.universe && hlData?.[1]) {
          const rates = { hyperliquid: {} };
          hlData[1].forEach((ctx, i) => {
            const symbol = hlData[0].universe[i]?.name;
            if (symbol) {
              const rate = parseFloat(ctx.funding || 0);
              rates.hyperliquid[symbol] = (rate * 3 * 365 * 100).toFixed(2);
            }
          });
          setAllFundingRates(rates);
        }
      } catch (e2) {
        console.error('Hyperliquid also failed:', e2);
      }
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

  // ===== GET FUNDING RATE =====
  const getFundingRate = (platformId, symbol) => {
    const platform = FUNDING_PLATFORMS.find(p => p.id === platformId);
    if (!platform?.apiKey) return null;
    
    const apiKey = platform.apiKey;
    
    // Try different formats
    const possibleKeys = [apiKey, `${apiKey}_1_perp`, `${apiKey}_perp`];
    
    for (const key of possibleKeys) {
      if (allFundingRates[key]?.[symbol] !== undefined) {
        return parseFloat(allFundingRates[key][symbol]);
      }
    }
    
    // Direct lookup
    if (allFundingRates[apiKey]?.[symbol] !== undefined) {
      return parseFloat(allFundingRates[apiKey][symbol]);
    }
    
    return null;
  };

  // ===== AUTO-FILL APR =====
  useEffect(() => {
    if (newPos.pair) {
      const longRate = getFundingRate(newPos.longPlatform, newPos.pair);
      const shortRate = getFundingRate(newPos.shortPlatform, newPos.pair);
      
      setNewPos(prev => ({
        ...prev,
        longApr: longRate !== null ? longRate.toFixed(2) : prev.longApr,
        shortApr: shortRate !== null ? shortRate.toFixed(2) : prev.shortApr,
      }));
    }
  }, [newPos.pair, newPos.longPlatform, newPos.shortPlatform, allFundingRates]);

  // ===== FUNDING CALCULATIONS =====
  const calculateNetYield = (longApr, shortApr, longNotional, shortNotional) => {
    const longRate = parseFloat(longApr) || 0;
    const shortRate = parseFloat(shortApr) || 0;
    
    // Long: rate positif = tu paies, rate négatif = tu reçois
    // Short: rate positif = tu reçois, rate négatif = tu paies
    const longYield = -longRate;
    const shortYield = shortRate;
    
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
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="pt-6 pb-4 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Branding */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                    <Icons.Football />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-2 border-[#0a0a0c] flex items-center justify-center text-[10px] font-bold text-black">⚽</div>
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">GOLAZO</span>
                  </h1>
                  <p className="text-xs text-white/40 uppercase tracking-[0.3em]">Trading Dashboard</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex justify-center">
              <div className="inline-flex gap-1 p-1.5 bg-white/[0.03] rounded-2xl border border-white/[0.06] backdrop-blur-xl">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                      activeTab === tab.id ? 'text-black' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl shadow-lg shadow-emerald-500/30" />
                    )}
                    <span className="relative"><tab.icon /></span>
                    <span className="relative">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-6">

          {/* ==================== STOCKS ==================== */}
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex items-center justify-between bg-white/[0.02] rounded-2xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchStockData}
                    disabled={loadingStocks}
                    className={`p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all ${loadingStocks ? 'animate-spin' : ''}`}
                  >
                    <Icons.Refresh />
                  </button>
                  <div>
                    <div className="text-sm font-semibold">Live Market Data</div>
                    <div className="text-xs text-white/30">Yahoo Finance • Auto-refresh 1min</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    placeholder="TICKER"
                    value={newStock.symbol}
                    onChange={e => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                    onKeyDown={e => e.key === 'Enter' && addStock()}
                    className="w-24 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                  />
                  <input
                    placeholder="Sector"
                    value={newStock.group}
                    onChange={e => setNewStock({ ...newStock, group: e.target.value })}
                    className="w-28 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button onClick={addStock} className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20">
                    <Icons.Plus />
                  </button>
                </div>
              </div>

              {/* Treemap */}
              <div className="relative bg-white/[0.02] rounded-3xl border border-white/[0.06] overflow-hidden shadow-2xl" style={{ height: '500px' }}>
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
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img 
                            src={getStockLogo(item.symbol)}
                            alt=""
                            className="w-1/2 h-1/2 object-contain opacity-20 grayscale"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteStock(item.symbol); }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <Icons.X />
                        </button>
                        <div className="relative h-full flex flex-col items-center justify-center p-2">
                          <div className="font-bold text-white drop-shadow-lg" style={{ fontSize: item.width > 15 ? '1.25rem' : '1rem' }}>
                            {item.symbol}
                          </div>
                          <div className="font-semibold drop-shadow" style={{ fontSize: item.width > 15 ? '1rem' : '0.875rem' }}>
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

              {/* Chart */}
              {selectedStock && (
                <div className="bg-white/[0.02] rounded-3xl border border-white/[0.06] overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={getStockLogo(selectedStock)} alt="" className="w-10 h-10 rounded-xl bg-white/10" onError={(e) => e.target.style.display = 'none'} />
                      <div>
                        <div className="font-bold text-xl">{selectedStock}</div>
                        <div className="text-sm text-white/40">{stockData[selectedStock]?.name}</div>
                      </div>
                      {stockData[selectedStock] && (
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${stockData[selectedStock].change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {stockData[selectedStock].change >= 0 ? '+' : ''}{stockData[selectedStock].change?.toFixed(2)}%
                        </div>
                      )}
                    </div>
                    <button onClick={() => setSelectedStock(null)} className="p-2 hover:bg-white/10 rounded-lg"><Icons.X /></button>
                  </div>
                  <div style={{ height: '350px' }}>
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
                  { label: 'Capital Total', value: `$${totalCapital.toLocaleString()}`, icon: '💰', color: '' },
                  { label: 'Yield / Day', value: `$${totalStats.dailyYield.toFixed(2)}`, icon: '📈', color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400' },
                  { label: 'Yield / Month', value: `$${(totalStats.dailyYield * 30).toFixed(0)}`, icon: '📊', color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400' },
                  { label: 'Yield / Year', value: `$${(totalStats.dailyYield * 365).toFixed(0)}`, icon: '🎯', color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-xs uppercase tracking-widest text-white/30">{s.label}</span>
                    </div>
                    <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* Pair Selector */}
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-semibold">Select Trading Pair</div>
                      <button onClick={fetchFundingRates} className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 ${loadingFunding ? 'animate-spin' : ''}`}>
                        <Icons.Refresh />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-10 gap-2">
                      {CRYPTO_SYMBOLS.map(symbol => {
                        const rate = getFundingRate('hyperliquid', symbol);
                        const isSelected = newPos.pair === symbol;
                        
                        return (
                          <button
                            key={symbol}
                            onClick={() => setNewPos({ ...newPos, pair: symbol })}
                            className={`p-2 rounded-xl text-center transition-all ${
                              isSelected 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold' 
                                : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06]'
                            }`}
                          >
                            <div className="font-mono font-bold text-xs">{symbol}</div>
                            {rate !== null && !isSelected && (
                              <div className={`text-[10px] ${rate > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {rate > 0 ? '+' : ''}{rate.toFixed(1)}%
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Position Form */}
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06] space-y-3">
                    <div className="text-lg font-bold flex items-center gap-2">
                      {newPos.pair ? (
                        <>
                          <span className="text-emerald-400">{newPos.pair}</span>
                          <span className="text-white/30">Position</span>
                        </>
                      ) : (
                        <span className="text-white/30">Select a pair above</span>
                      )}
                    </div>
                    
                    {/* Long */}
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-xs text-emerald-400 uppercase tracking-wider mb-2 font-bold">⬆️ Long Position</div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 flex-1 bg-black/20 rounded-lg px-3 py-2">
                          {FUNDING_PLATFORMS.find(p => p.id === newPos.longPlatform) && (
                            <img src={FUNDING_PLATFORMS.find(p => p.id === newPos.longPlatform)?.logo} alt="" className="w-5 h-5 rounded" />
                          )}
                          <select value={newPos.longPlatform} onChange={e => setNewPos({...newPos, longPlatform: e.target.value})} className="flex-1 bg-transparent text-emerald-400 focus:outline-none">
                            {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                          </select>
                        </div>
                        <input placeholder="Capital $" type="number" value={newPos.longCapital} onChange={e => setNewPos({...newPos, longCapital: e.target.value})} className="w-28 bg-black/20 rounded-lg px-3 py-2 focus:outline-none" />
                        <input placeholder="×Lev" type="number" value={newPos.longLeverage} onChange={e => setNewPos({...newPos, longLeverage: e.target.value})} className="w-20 bg-black/20 rounded-lg px-3 py-2 focus:outline-none" />
                        <input placeholder="APR%" type="number" value={newPos.longApr} onChange={e => setNewPos({...newPos, longApr: e.target.value})} className="w-24 bg-black/20 rounded-lg px-3 py-2 text-emerald-400 focus:outline-none" />
                      </div>
                    </div>

                    {/* Short */}
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="text-xs text-red-400 uppercase tracking-wider mb-2 font-bold">⬇️ Short Position</div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 flex-1 bg-black/20 rounded-lg px-3 py-2">
                          {FUNDING_PLATFORMS.find(p => p.id === newPos.shortPlatform) && (
                            <img src={FUNDING_PLATFORMS.find(p => p.id === newPos.shortPlatform)?.logo} alt="" className="w-5 h-5 rounded" />
                          )}
                          <select value={newPos.shortPlatform} onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})} className="flex-1 bg-transparent text-red-400 focus:outline-none">
                            {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                          </select>
                        </div>
                        <input placeholder="Capital $" type="number" value={newPos.shortCapital} onChange={e => setNewPos({...newPos, shortCapital: e.target.value})} className="w-28 bg-black/20 rounded-lg px-3 py-2 focus:outline-none" />
                        <input placeholder="×Lev" type="number" value={newPos.shortLeverage} onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})} className="w-20 bg-black/20 rounded-lg px-3 py-2 focus:outline-none" />
                        <input placeholder="APR%" type="number" value={newPos.shortApr} onChange={e => setNewPos({...newPos, shortApr: e.target.value})} className="w-24 bg-black/20 rounded-lg px-3 py-2 text-red-400 focus:outline-none" />
                      </div>
                    </div>

                    <button 
                      onClick={addPosition} 
                      disabled={!newPos.pair}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
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
                              <td className="p-4 font-mono font-bold text-lg">{pos.pair}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <img src={longP?.logo} alt="" className="w-5 h-5 rounded" />
                                  <div>
                                    <div style={{color: longP?.color}} className="text-sm font-medium">{longP?.name}</div>
                                    <div className="text-xs text-white/40">${longN.toLocaleString()} • {pos.longApr}%</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <img src={shortP?.logo} alt="" className="w-5 h-5 rounded" />
                                  <div>
                                    <div style={{color: shortP?.color}} className="text-sm font-medium">{shortP?.name}</div>
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
                                <button onClick={() => deletePosition(pos.id)} className="text-white/20 hover:text-red-400"><Icons.Trash /></button>
                              </td>
                            </tr>
                          );
                        })}
                        {positions.length === 0 && (
                          <tr><td colSpan={6} className="p-8 text-center text-white/20">No positions yet. Select a pair and add your first position!</td></tr>
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
                          {p.apiKey && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">API</span>}
                        </div>
                        <Icons.External />
                      </a>
                    ))}
                  </div>

                  <a href="https://fundingview.app/dashboard" target="_blank" rel="noopener noreferrer" 
                    className="block bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 rounded-2xl p-4 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all">
                    <div className="font-bold">FundingView</div>
                    <div className="text-xs text-white/40">Compare all funding rates</div>
                  </a>

                  <a href="https://loris.tools" target="_blank" rel="noopener noreferrer" 
                    className="block bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-4 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                    <div className="font-bold">Loris Tools</div>
                    <div className="text-xs text-white/40">API source for rates</div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PREDICTIONS ==================== */}
          {activeTab === 'predictions' && (
            <div className="space-y-6">
              {/* My Profiles Section */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-5 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Icons.User />
                  </div>
                  <div>
                    <div className="font-bold text-lg">My Profiles</div>
                    <div className="text-xs text-white/40">Track your performance across platforms</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  {PREDICTION_SITES.filter(s => s.profileUrl).map(site => (
                    <a 
                      key={site.name}
                      href={site.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all"
                    >
                      <img src={site.logo} alt="" className="w-8 h-8 rounded-lg" />
                      <div>
                        <div className="font-medium text-sm">{site.name}</div>
                        <div className="text-xs text-white/40">View Profile</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Platforms Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PREDICTION_SITES.map(site => (
                  <div key={site.name} className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
                    <div className="h-16 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${site.color}30, ${site.color}10)` }}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <img src={site.logo} alt="" className="w-12 h-12 object-contain" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
                    </div>
                    
                    <div className="p-5 -mt-8 relative">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border-4 border-[#0a0a0c] overflow-hidden shadow-lg" style={{ backgroundColor: site.color }}>
                        <img src={site.logo} alt={site.name} className="w-9 h-9 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      
                      <div className="font-bold text-xl mb-1">{site.name}</div>
                      <p className="text-sm text-white/40 mb-4">{site.desc}</p>
                      
                      <div className="flex items-center gap-2">
                        <a href={site.url} target="_blank" rel="noopener noreferrer" 
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: site.color }}>
                          Open <Icons.External />
                        </a>
                        {site.profileUrl && (
                          <a href={site.profileUrl} target="_blank" rel="noopener noreferrer" 
                            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-all" title="My Profile">
                            <Icons.User />
                          </a>
                        )}
                        <a href={`https://twitter.com/${site.twitter}`} target="_blank" rel="noopener noreferrer" 
                          className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-all">
                          <Icons.Twitter />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] py-6 mt-6">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white/20 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚽</span>
              <span>Golazo Trading Dashboard</span>
            </div>
            <div>Data: Yahoo Finance • Loris Tools • Hyperliquid</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
