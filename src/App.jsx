import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ==================== ICONS ====================
const Icons = {
  Zap: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  External: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  TrendUp: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  X: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>,
  Twitter: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Football: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2m0 2l2 3-1 2h-2l-1-2 2-3m-4 5h2l1 3-2 2-2-1v-4m8 0v4l-2 1-2-2 1-3h2m-6 7l2-2 2 2-1 3h-2l-1-3z"/></svg>,
  Trophy: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2zM19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v3c0 2.2 1.8 4 4 4h.7c.5 1.2 1.5 2.2 2.8 2.7V18h-2v2h6v-2h-2v-2.3c1.3-.5 2.3-1.5 2.8-2.7h.7c2.2 0 4-1.8 4-4V6c0-1.1-.9-2-2-2zm-12 7c-1.1 0-2-.9-2-2V6h2v5zm10-2c0 1.1-.9 2-2 2V6h2v3z"/></svg>,
  DollarSign: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  BarChart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>,
  Calendar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  Brain: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4.5a2.5 2.5 0 00-4.96-.46 2.5 2.5 0 00-1.98 3 2.5 2.5 0 00.26 4.96M12 4.5a2.5 2.5 0 014.96-.46 2.5 2.5 0 011.98 3 2.5 2.5 0 01-.26 4.96M12 4.5V19m0 0l-3-3m3 3l3-3"/></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
};

// ==================== CONSTANTS ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80', logo: 'https://www.google.com/s2/favicons?domain=hyperliquid.xyz&sz=128' },
  { id: 'ostium', name: 'Ostium', url: 'https://app.ostium.com/trade', color: '#3b82f6', logo: 'https://www.google.com/s2/favicons?domain=ostium.io&sz=128' },
  { id: 'vest', name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: '#a78bfa', logo: 'https://www.google.com/s2/favicons?domain=vestmarkets.com&sz=128' },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6', logo: 'https://www.google.com/s2/favicons?domain=paradex.trade&sz=128' },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa', logo: 'https://www.google.com/s2/favicons?domain=extended.exchange&sz=128' },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee', logo: 'https://www.google.com/s2/favicons?domain=lighter.xyz&sz=128' },
  { id: 'xyz', name: 'XYZ', url: 'https://app.trade.xyz/trade', color: '#facc15', logo: 'https://www.google.com/s2/favicons?domain=trade.xyz&sz=128' },
];

const CRYPTO_PAIRS = ['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'MATIC', 'LINK', 'UNI', 'AAVE', 'LDO', 'MKR', 'CRV', 'SNX', 'COMP', 'SUI', 'APT', 'INJ', 'SEI', 'TIA', 'STRK', 'JUP', 'WIF', 'PEPE', 'BONK', 'NEAR', 'FTM', 'ATOM', 'DOT', 'ADA', 'XRP', 'LTC', 'BCH', 'ETC', 'FIL', 'RENDER', 'TAO', 'WLD', 'PYTH'];
const FOREX_PAIRS = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'EUR/GBP', 'GBP/JPY', 'EUR/JPY', 'USD/CHF', 'NZD/USD', 'USD/MXN', 'EUR/CHF'];
const COMMODITIES = ['XAU/USD', 'XAG/USD', 'WTI', 'BRENT', 'NG', 'COPPER'];
const INDICES = ['SPX', 'NDX', 'DJI', 'VIX', 'DAX', 'FTSE', 'N225', 'HSI'];

const PREDICTION_PLATFORMS = [
  { id: 'polymarket', name: 'Polymarket', url: 'https://polymarket.com/', profileUrl: 'https://polymarket.com/@neventheboss', color: '#6366f1', twitter: 'Polymarket', logo: 'https://www.google.com/s2/favicons?domain=polymarket.com&sz=128' },
  { id: 'myriad', name: 'Myriad', url: 'https://myriad.markets/earn', profileUrl: 'https://myriad.markets/profile/0x5e5351219b9b9da69744A43101b9395BAdC9a2e9', color: '#8b5cf6', twitter: 'MyriadMarkets', logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' },
  { id: 'myriadbnb', name: 'Myriad BNB', url: 'https://bnb.myriadprotocol.com/markets', profileUrl: null, color: '#f0b90b', twitter: 'MyriadMarkets', logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' },
  { id: 'limitless', name: 'Limitless', url: 'https://limitless.exchange/advanced', profileUrl: 'https://limitless.exchange/profile/0x5e5351219b9b9da69744A43101b9395BAdC9a2e9', color: '#ec4899', twitter: 'trylimitless', logo: 'https://www.google.com/s2/favicons?domain=limitless.exchange&sz=128' },
  { id: 'predictbase', name: 'PredictBase', url: 'https://predictbase.app/', profileUrl: null, color: '#14b8a6', twitter: 'PredictBase', logo: 'https://www.google.com/s2/favicons?domain=predictbase.app&sz=128' },
  { id: 'opinion', name: 'Opinion', url: 'https://app.opinion.trade/profile', profileUrl: null, color: '#f97316', twitter: 'OpinionLabsXYZ', logo: 'https://www.google.com/s2/favicons?domain=opinion.trade&sz=128' },
  { id: 'xomarket', name: 'XO Market', url: 'https://beta.xo.market/markets', profileUrl: 'https://beta.xo.market/profile/neventheboss', color: '#06b6d4', twitter: 'xodotmarket', logo: 'https://www.google.com/s2/favicons?domain=xo.market&sz=128' },
];

const STOCK_LOGOS = {
  NVDA: 'nvidia.com', AAPL: 'apple.com', MSFT: 'microsoft.com', GOOGL: 'google.com', META: 'meta.com',
  AMZN: 'amazon.com', TSLA: 'tesla.com', AMD: 'amd.com', INTC: 'intel.com', ASML: 'asml.com',
  TSM: 'tsmc.com', AVGO: 'broadcom.com', CCJ: 'cameco.com', URA: 'globalxetfs.com', URNM: 'sprott.com',
  NXE: 'nexgenenergy.ca', RKLB: 'rocketlabusa.com', LUNR: 'intuitivemachines.com',
  PLTR: 'palantir.com', LMT: 'lockheedmartin.com', RTX: 'rtx.com', EWJ: 'ishares.com', FCX: 'fcx.com',
};

const getStockLogo = (symbol) => STOCK_LOGOS[symbol] ? `https://logo.clearbit.com/${STOCK_LOGOS[symbol]}` : `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;

const DEFAULT_WATCHLIST = [
  { symbol: 'CCJ', group: 'Uranium', weight: 50 }, { symbol: 'URA', group: 'Uranium', weight: 40 },
  { symbol: 'URNM', group: 'Uranium', weight: 30 }, { symbol: 'NVDA', group: 'Semiconductors', weight: 100 },
  { symbol: 'ASML', group: 'Semiconductors', weight: 60 }, { symbol: 'TSM', group: 'Semiconductors', weight: 70 },
  { symbol: 'AMD', group: 'Semiconductors', weight: 50 }, { symbol: 'RKLB', group: 'Space', weight: 35 },
  { symbol: 'LUNR', group: 'Space', weight: 25 }, { symbol: 'PLTR', group: 'Defense', weight: 55 },
  { symbol: 'LMT', group: 'Defense', weight: 60 }, { symbol: 'RTX', group: 'Defense', weight: 50 },
  { symbol: 'EWJ', group: 'Japan', weight: 40 }, { symbol: 'FCX', group: 'Copper', weight: 35 },
];

// ==================== TREEMAP ====================
const calculateTreemap = (items, width, height) => {
  const result = [];
  let x = 0, y = 0, remainingWidth = width, remainingHeight = height;
  let remainingItems = [...items].sort((a, b) => (b.weight || 1) - (a.weight || 1));
  
  while (remainingItems.length > 0) {
    const isHorizontal = remainingWidth >= remainingHeight;
    const side = isHorizontal ? remainingHeight : remainingWidth;
    let rowItems = [], rowWeight = 0;
    const remainingTotal = remainingItems.reduce((sum, item) => sum + (item.weight || 1), 0);
    
    for (let i = 0; i < remainingItems.length && rowItems.length < 4; i++) {
      const item = remainingItems[i];
      const itemWeight = item.weight || 1;
      rowItems.push(item);
      rowWeight += itemWeight;
      const rowSize = (rowWeight / remainingTotal) * (isHorizontal ? remainingWidth : remainingHeight);
      if (rowSize > side * 0.8 && rowItems.length > 1) break;
    }
    
    const rowSize = (rowWeight / remainingTotal) * (isHorizontal ? remainingWidth : remainingHeight);
    let offset = 0;
    
    rowItems.forEach(item => {
      const itemWeight = item.weight || 1;
      const itemSize = (itemWeight / rowWeight) * side;
      result.push({ ...item, x: isHorizontal ? x : x + offset, y: isHorizontal ? y + offset : y, width: isHorizontal ? rowSize : itemSize, height: isHorizontal ? itemSize : rowSize });
      offset += itemSize;
    });
    
    if (isHorizontal) { x += rowSize; remainingWidth -= rowSize; }
    else { y += rowSize; remainingHeight -= rowSize; }
    remainingItems = remainingItems.filter(item => !rowItems.includes(item));
  }
  return result;
};

const getColor = (change) => {
  const c = parseFloat(change) || 0;
  if (c > 5) return '#16a34a';
  if (c > 2) return '#15803d';
  if (c > 0) return '#166534';
  if (c > -2) return '#7f1d1d';
  if (c > -5) return '#991b1b';
  return '#b91c1c';
};

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('funding');
  
  // ===== STOCKS STATE =====
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('watchlist_v10') || 'null') || DEFAULT_WATCHLIST);
  const [stockData, setStockData] = useState({});
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({ symbol: '', group: '', weight: '30' });
  const [timeframe, setTimeframe] = useState('1D');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [sectorAnalysis, setSectorAnalysis] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // ===== FUNDING STATE =====
  const [positions, setPositions] = useState(() => JSON.parse(localStorage.getItem('positions_v10') || '[]'));
  const [selectedPair, setSelectedPair] = useState(null);
  const [pairCategory, setPairCategory] = useState('crypto');
  const [newPos, setNewPos] = useState({ longPlatform: 'hyperliquid', shortPlatform: 'vest', longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10', longApr: '', shortApr: '' });
  const [allFundingRates, setAllFundingRates] = useState({});
  const [loadingFunding, setLoadingFunding] = useState(false);
  const [realCapital, setRealCapital] = useState(() => JSON.parse(localStorage.getItem('realCapital_v10') || '{"total": 10000, "available": 5000}'));
  const [editingCapital, setEditingCapital] = useState(false);

  // ===== PREDICTIONS STATE =====
  const [predictionStats, setPredictionStats] = useState(() => JSON.parse(localStorage.getItem('predictionStats_v10') || 'null') || {
    polymarket: { rank: 1250, volume: 15420, pnl: 2340, positions: 12 },
    myriad: { rank: 89, volume: 8500, pnl: 1250, positions: 8 },
    limitless: { rank: 156, volume: 4200, pnl: 680, positions: 5 },
    xomarket: { rank: 45, volume: 2100, pnl: 320, positions: 3 },
  });
  const [editingPrediction, setEditingPrediction] = useState(null);

  // ===== PERSISTENCE =====
  useEffect(() => { localStorage.setItem('watchlist_v10', JSON.stringify(watchlist)); }, [watchlist]);
  useEffect(() => { localStorage.setItem('positions_v10', JSON.stringify(positions)); }, [positions]);
  useEffect(() => { localStorage.setItem('realCapital_v10', JSON.stringify(realCapital)); }, [realCapital]);
  useEffect(() => { localStorage.setItem('predictionStats_v10', JSON.stringify(predictionStats)); }, [predictionStats]);

  // ===== FETCH FUNCTIONS =====
  const fetchStockData = useCallback(async () => {
    if (watchlist.length === 0) return;
    setLoadingStocks(true);
    try {
      const symbols = watchlist.map(s => s.symbol).join(',');
      const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`)}`);
      if (res.ok) {
        const data = await res.json();
        const newData = {};
        (data?.quoteResponse?.result || []).forEach(q => {
          newData[q.symbol] = { price: q.regularMarketPrice || 0, change: q.regularMarketChangePercent || 0, marketCap: q.marketCap || 0, name: q.shortName || q.symbol };
        });
        setStockData(newData);
      }
    } catch (e) { console.error('Stock fetch failed:', e); }
    setLoadingStocks(false);
  }, [watchlist]);

  const fetchFundingRates = useCallback(async () => {
    setLoadingFunding(true);
    try {
      const res = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'metaAndAssetCtxs' })
      });
      const data = await res.json();
      if (data?.[0]?.universe && data?.[1]) {
        const rates = {};
        data[1].forEach((ctx, i) => {
          const symbol = data[0].universe[i]?.name;
          if (symbol) rates[symbol] = (parseFloat(ctx.funding || 0) * 3 * 365 * 100);
        });
        setAllFundingRates(rates);
      }
    } catch (e) { console.error('Funding fetch failed:', e); }
    setLoadingFunding(false);
  }, []);

  useEffect(() => {
    fetchStockData();
    fetchFundingRates();
    const i1 = setInterval(fetchStockData, 60000);
    const i2 = setInterval(fetchFundingRates, 30000);
    return () => { clearInterval(i1); clearInterval(i2); };
  }, [fetchStockData, fetchFundingRates]);

  // ===== SECTOR ANALYSIS WITH CLAUDE =====
  const analyzeSector = async () => {
    if (!selectedStock) return;
    setLoadingAnalysis(true);
    const stock = watchlist.find(s => s.symbol === selectedStock);
    const sector = stock?.group || 'Unknown';
    const sectorStocks = watchlist.filter(s => s.group === sector);
    
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [{
            role: "user",
            content: `Tu es un analyste financier. Donne une analyse TRÈS COURTE (3-4 phrases max) du secteur "${sector}" avec ces stocks: ${sectorStocks.map(s => s.symbol).join(', ')}. 
            
Inclus: tendance actuelle, catalyseurs potentiels, et un avis bullish/bearish. Sois direct et concis. Réponds en français.`
          }]
        })
      });
      const data = await response.json();
      setSectorAnalysis(data.content?.[0]?.text || 'Analyse non disponible');
    } catch (e) {
      setSectorAnalysis('Erreur lors de l\'analyse. Réessayez.');
    }
    setLoadingAnalysis(false);
    setShowAnalysis(true);
  };

  // ===== CALCULATIONS =====
  const calculateNetYield = (longApr, shortApr, longNotional, shortNotional) => {
    const netApr = -parseFloat(longApr || 0) + parseFloat(shortApr || 0);
    const dailyYield = ((longNotional + shortNotional) / 2 * netApr / 100) / 365;
    return { netApr, dailyYield };
  };

  const totalDeployed = positions.reduce((a, b) => a + Number(b.longCapital || 0) + Number(b.shortCapital || 0), 0);
  const totalStats = positions.reduce((acc, pos) => {
    const { dailyYield } = calculateNetYield(pos.longApr, pos.shortApr, Number(pos.longCapital || 0) * Number(pos.longLeverage || 1), Number(pos.shortCapital || 0) * Number(pos.shortLeverage || 1));
    return { dailyYield: acc.dailyYield + dailyYield };
  }, { dailyYield: 0 });

  // ===== HANDLERS =====
  const addStock = () => {
    if (!newStock.symbol) return;
    const symbol = newStock.symbol.toUpperCase().trim();
    if (!watchlist.find(s => s.symbol === symbol)) {
      setWatchlist([...watchlist, { symbol, group: newStock.group || 'Other', weight: Number(newStock.weight) || 30 }]);
      setNewStock({ symbol: '', group: '', weight: '30' });
      setTimeout(fetchStockData, 500);
    }
  };

  const addPosition = () => {
    if (!selectedPair) return;
    setPositions([...positions, { id: Date.now(), pair: selectedPair, ...newPos }]);
    setNewPos({ longPlatform: 'hyperliquid', shortPlatform: 'vest', longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10', longApr: '', shortApr: '' });
  };

  const selectPair = (pair) => {
    setSelectedPair(pair);
    const rate = allFundingRates[pair];
    if (rate !== undefined) {
      setNewPos(prev => ({ ...prev, longApr: rate.toFixed(2), shortApr: rate.toFixed(2) }));
    }
  };

  // ===== TREEMAP DATA =====
  const treemapData = useMemo(() => {
    const items = watchlist.map(item => ({
      ...item, ...stockData[item.symbol],
      weight: stockData[item.symbol]?.marketCap ? Math.log10(stockData[item.symbol].marketCap) * 10 : (item.weight || 30),
    }));
    return calculateTreemap(items, 100, 100);
  }, [watchlist, stockData]);

  const totalPredictionPnl = Object.values(predictionStats).reduce((a, b) => a + (b.pnl || 0), 0);
  const totalPredictionVolume = Object.values(predictionStats).reduce((a, b) => a + (b.volume || 0), 0);

  const getPairs = () => {
    switch(pairCategory) {
      case 'forex': return FOREX_PAIRS;
      case 'commodities': return COMMODITIES;
      case 'indices': return INDICES;
      default: return CRYPTO_PAIRS;
    }
  };

  const tabs = [
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'stocks', label: 'Markets', icon: Icons.TrendUp },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen border-r border-white/[0.06] bg-black/20 backdrop-blur-xl flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Icons.Football />
              </div>
              <div>
                <h1 className="text-lg font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">GOLAZO</h1>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Trading Hub</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Capital Section */}
          <div className="mt-auto p-4 border-t border-white/[0.06]">
            <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40 uppercase tracking-wider">Capital</span>
                <button onClick={() => setEditingCapital(!editingCapital)} className="text-white/30 hover:text-white">
                  {editingCapital ? <Icons.Check /> : <Icons.Edit />}
                </button>
              </div>
              
              {editingCapital ? (
                <div className="space-y-2">
                  <input type="number" value={realCapital.total} onChange={e => setRealCapital({...realCapital, total: Number(e.target.value)})} 
                    className="w-full bg-black/30 rounded-lg px-3 py-2 text-sm focus:outline-none border border-white/10" placeholder="Total" />
                  <input type="number" value={realCapital.available} onChange={e => setRealCapital({...realCapital, available: Number(e.target.value)})} 
                    className="w-full bg-black/30 rounded-lg px-3 py-2 text-sm focus:outline-none border border-white/10" placeholder="Available" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-emerald-400">${realCapital.total.toLocaleString()}</div>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-white/40">Deployed</span>
                    <span className="text-amber-400">${totalDeployed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/40">Available</span>
                    <span className="text-emerald-400">${(realCapital.total - totalDeployed).toLocaleString()}</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{width: `${Math.min(100, (totalDeployed / realCapital.total) * 100)}%`}} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Platforms Links */}
          <div className="p-4 border-t border-white/[0.06]">
            <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Platforms</div>
            <div className="space-y-1">
              {FUNDING_PLATFORMS.slice(0, 4).map(p => (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] text-xs text-white/50 hover:text-white/80 transition-all">
                  <img src={p.logo} alt="" className="w-4 h-4 rounded" />
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          
          {/* ==================== FUNDING ==================== */}
          {activeTab === 'funding' && (
            <div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-5 gap-4">
                {[
                  { label: 'Daily Yield', value: `$${totalStats.dailyYield.toFixed(2)}`, color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400', icon: '📈' },
                  { label: 'Weekly', value: `$${(totalStats.dailyYield * 7).toFixed(0)}`, color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400', icon: '📊' },
                  { label: 'Monthly', value: `$${(totalStats.dailyYield * 30).toFixed(0)}`, color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400', icon: '🗓️' },
                  { label: 'Yearly', value: `$${(totalStats.dailyYield * 365).toFixed(0)}`, color: totalStats.dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400', icon: '🎯' },
                  { label: 'APR', value: `${totalDeployed > 0 ? ((totalStats.dailyYield * 365 / totalDeployed) * 100).toFixed(1) : 0}%`, color: 'text-purple-400', icon: '💎' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
                    <div className="text-lg mb-1">{s.icon}</div>
                    <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-white/30">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Pair Selector */}
                <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
                  <div className="p-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">Select Pair</span>
                      <button onClick={fetchFundingRates} className={`p-1.5 rounded-lg bg-white/5 hover:bg-white/10 ${loadingFunding ? 'animate-spin' : ''}`}>
                        <Icons.Refresh />
                      </button>
                    </div>
                    <div className="flex gap-1">
                      {['crypto', 'forex', 'commodities', 'indices'].map(cat => (
                        <button key={cat} onClick={() => setPairCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${pairCategory === cat ? 'bg-emerald-500 text-black' : 'bg-white/5 hover:bg-white/10'}`}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 max-h-[400px] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-1.5">
                      {getPairs().map(pair => {
                        const rate = allFundingRates[pair];
                        const isSelected = selectedPair === pair;
                        return (
                          <button key={pair} onClick={() => selectPair(pair)}
                            className={`p-2 rounded-lg text-center transition-all ${isSelected ? 'bg-emerald-500 text-black font-bold' : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04]'}`}>
                            <div className="font-mono text-xs font-bold">{pair}</div>
                            {rate !== undefined && !isSelected && (
                              <div className={`text-[10px] ${rate > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {rate > 0 ? '+' : ''}{rate.toFixed(1)}%
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Position Form */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.06]">
                    <div className="text-lg font-bold mb-4 flex items-center gap-2">
                      {selectedPair ? (
                        <><span className="text-emerald-400 text-2xl">{selectedPair}</span><span className="text-white/30">Delta Neutral</span></>
                      ) : (
                        <span className="text-white/30">← Select a pair</span>
                      )}
                    </div>
                    
                    {/* Long */}
                    <div className="mb-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-xs text-emerald-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                        <span>⬆️</span> Long Position
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <select value={newPos.longPlatform} onChange={e => setNewPos({...newPos, longPlatform: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 text-emerald-400 focus:outline-none border border-emerald-500/20">
                          {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                        </select>
                        <input placeholder="Capital $" type="number" value={newPos.longCapital} onChange={e => setNewPos({...newPos, longCapital: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 focus:outline-none border border-emerald-500/20" />
                        <input placeholder="×Lev" type="number" value={newPos.longLeverage} onChange={e => setNewPos({...newPos, longLeverage: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 focus:outline-none border border-emerald-500/20" />
                        <input placeholder="APR%" type="number" value={newPos.longApr} onChange={e => setNewPos({...newPos, longApr: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 text-emerald-400 focus:outline-none border border-emerald-500/20" />
                      </div>
                    </div>

                    {/* Short */}
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="text-xs text-red-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                        <span>⬇️</span> Short Position
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <select value={newPos.shortPlatform} onChange={e => setNewPos({...newPos, shortPlatform: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 text-red-400 focus:outline-none border border-red-500/20">
                          {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                        </select>
                        <input placeholder="Capital $" type="number" value={newPos.shortCapital} onChange={e => setNewPos({...newPos, shortCapital: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 focus:outline-none border border-red-500/20" />
                        <input placeholder="×Lev" type="number" value={newPos.shortLeverage} onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 focus:outline-none border border-red-500/20" />
                        <input placeholder="APR%" type="number" value={newPos.shortApr} onChange={e => setNewPos({...newPos, shortApr: e.target.value})} 
                          className="bg-black/30 rounded-lg px-3 py-2.5 text-red-400 focus:outline-none border border-red-500/20" />
                      </div>
                    </div>

                    <button onClick={addPosition} disabled={!selectedPair}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed">
                      Add Position
                    </button>
                  </div>

                  {/* Positions Table */}
                  <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs uppercase tracking-wider text-white/30 border-b border-white/[0.06]">
                          <th className="text-left p-3">Pair</th>
                          <th className="text-left p-3">Long</th>
                          <th className="text-left p-3">Short</th>
                          <th className="text-right p-3">Net APR</th>
                          <th className="text-right p-3">Daily</th>
                          <th className="p-3"></th>
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
                            <tr key={pos.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                              <td className="p-3 font-mono font-bold">{pos.pair}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <img src={longP?.logo} alt="" className="w-4 h-4 rounded" />
                                  <div className="text-xs">
                                    <div style={{color: longP?.color}}>{longP?.name}</div>
                                    <div className="text-white/40">${longN.toLocaleString()} • {pos.longApr}%</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <img src={shortP?.logo} alt="" className="w-4 h-4 rounded" />
                                  <div className="text-xs">
                                    <div style={{color: shortP?.color}}>{shortP?.name}</div>
                                    <div className="text-white/40">${shortN.toLocaleString()} • {pos.shortApr}%</div>
                                  </div>
                                </div>
                              </td>
                              <td className={`p-3 text-right font-bold ${netApr >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {netApr >= 0 ? '+' : ''}{netApr.toFixed(2)}%
                              </td>
                              <td className={`p-3 text-right font-bold ${dailyYield >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {dailyYield >= 0 ? '+' : ''}${dailyYield.toFixed(2)}
                              </td>
                              <td className="p-3">
                                <button onClick={() => setPositions(positions.filter(p => p.id !== pos.id))} className="text-white/20 hover:text-red-400">
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
              </div>
            </div>
          )}

          {/* ==================== STOCKS ==================== */}
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={fetchStockData} disabled={loadingStocks}
                    className={`p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 ${loadingStocks ? 'animate-spin' : ''}`}>
                    <Icons.Refresh />
                  </button>
                  <div>
                    <div className="text-sm font-semibold">Market Heatmap</div>
                    <div className="text-xs text-white/30">Yahoo Finance • Live</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input placeholder="TICKER" value={newStock.symbol} onChange={e => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })} onKeyDown={e => e.key === 'Enter' && addStock()}
                    className="w-20 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-emerald-500/50" />
                  <input placeholder="Sector" value={newStock.group} onChange={e => setNewStock({ ...newStock, group: e.target.value })}
                    className="w-24 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50" />
                  <button onClick={addStock} className="p-2 bg-emerald-500 rounded-lg hover:bg-emerald-600"><Icons.Plus /></button>
                </div>
              </div>

              {/* Treemap */}
              <div className="relative bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden" style={{ height: '400px' }}>
                {treemapData.map((item) => {
                  const data = stockData[item.symbol] || {};
                  const change = data.change || 0;
                  return (
                    <div key={item.symbol} onClick={() => { setSelectedStock(item.symbol); setShowAnalysis(false); }}
                      className={`absolute cursor-pointer transition-all group ${selectedStock === item.symbol ? 'z-20 ring-2 ring-white' : 'z-10 hover:brightness-110'}`}
                      style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%`, height: `${item.height}%`, padding: '2px' }}>
                      <div className="relative w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: getColor(change) }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img src={getStockLogo(item.symbol)} alt="" className="w-1/2 h-1/2 object-contain opacity-15 grayscale" onError={e => e.target.style.display = 'none'} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <button onClick={e => { e.stopPropagation(); setWatchlist(watchlist.filter(s => s.symbol !== item.symbol)); }}
                          className="absolute top-1 right-1 p-1 rounded bg-black/40 opacity-0 group-hover:opacity-100 z-10"><Icons.X /></button>
                        <div className="relative h-full flex flex-col items-center justify-center">
                          <div className="font-bold drop-shadow-lg" style={{ fontSize: item.width > 12 ? '1rem' : '0.75rem' }}>{item.symbol}</div>
                          <div className="font-semibold text-sm">{change >= 0 ? '+' : ''}{change.toFixed(2)}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stock Detail */}
              {selectedStock && (
                <div className="grid lg:grid-cols-3 gap-4">
                  {/* Chart */}
                  <div className="lg:col-span-2 bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
                    <div className="p-3 border-b border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={getStockLogo(selectedStock)} alt="" className="w-8 h-8 rounded-lg bg-white/10" onError={e => e.target.style.display = 'none'} />
                        <div>
                          <div className="font-bold">{selectedStock}</div>
                          <div className="text-xs text-white/40">{stockData[selectedStock]?.name}</div>
                        </div>
                        {stockData[selectedStock] && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${stockData[selectedStock].change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {stockData[selectedStock].change >= 0 ? '+' : ''}{stockData[selectedStock].change?.toFixed(2)}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(tf => (
                          <button key={tf} onClick={() => setTimeframe(tf)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${timeframe === tf ? 'bg-emerald-500 text-black' : 'bg-white/5 hover:bg-white/10'}`}>
                            {tf}
                          </button>
                        ))}
                        <button onClick={() => setSelectedStock(null)} className="p-1.5 hover:bg-white/10 rounded-lg ml-2"><Icons.X /></button>
                      </div>
                    </div>
                    <iframe
                      src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=${timeframe === '1D' ? 'D' : timeframe === '1W' ? 'W' : timeframe === '1M' ? 'M' : 'D'}&theme=dark&style=3&hide_top_toolbar=1&hide_legend=1&save_image=0&hide_volume=1`}
                      className="w-full h-[300px] border-0" title="Chart" />
                  </div>

                  {/* Analysis Panel */}
                  <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Icons.Brain />
                      <span className="font-semibold">Sector Analysis</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs text-white/40 mb-1">Sector</div>
                      <div className="text-lg font-bold text-emerald-400">{watchlist.find(s => s.symbol === selectedStock)?.group || 'Unknown'}</div>
                    </div>

                    <button onClick={analyzeSector} disabled={loadingAnalysis}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 mb-4">
                      {loadingAnalysis ? 'Analyzing...' : '🤖 Get Claude Analysis'}
                    </button>

                    {showAnalysis && (
                      <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <div className="text-xs text-purple-400 mb-2 font-medium">AI Analysis</div>
                        <p className="text-sm text-white/80 leading-relaxed">{sectorAnalysis}</p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-white/[0.06]">
                      <div className="text-xs text-white/40 mb-2">Related Stocks</div>
                      <div className="flex flex-wrap gap-1">
                        {watchlist.filter(s => s.group === watchlist.find(w => w.symbol === selectedStock)?.group && s.symbol !== selectedStock).map(s => (
                          <button key={s.symbol} onClick={() => { setSelectedStock(s.symbol); setShowAnalysis(false); }}
                            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono">{s.symbol}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== PREDICTIONS ==================== */}
          {activeTab === 'predictions' && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-5 border border-emerald-500/20">
                  <div className="text-3xl font-bold text-emerald-400">${totalPredictionPnl.toLocaleString()}</div>
                  <div className="text-sm text-white/40">Total PnL</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-5 border border-blue-500/20">
                  <div className="text-3xl font-bold text-blue-400">${totalPredictionVolume.toLocaleString()}</div>
                  <div className="text-sm text-white/40">Total Volume</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-2xl p-5 border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-400">{Object.values(predictionStats).reduce((a, b) => a + (b.positions || 0), 0)}</div>
                  <div className="text-sm text-white/40">Active Positions</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20">
                  <div className="text-3xl font-bold text-amber-400">{totalPredictionPnl > 0 ? ((totalPredictionPnl / totalPredictionVolume) * 100).toFixed(1) : 0}%</div>
                  <div className="text-sm text-white/40">Win Rate</div>
                </div>
              </div>

              {/* Platform Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {PREDICTION_PLATFORMS.map(platform => {
                  const stats = predictionStats[platform.id] || { rank: '-', volume: 0, pnl: 0, positions: 0 };
                  const isEditing = editingPrediction === platform.id;
                  
                  return (
                    <div key={platform.id} className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/[0.1] transition-all">
                      {/* Header */}
                      <div className="h-12 relative" style={{ background: `linear-gradient(135deg, ${platform.color}40, ${platform.color}10)` }}>
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                          <div className="flex items-center gap-2">
                            <img src={platform.logo} alt="" className="w-6 h-6 rounded-lg" />
                            <span className="font-bold">{platform.name}</span>
                          </div>
                          <button onClick={() => setEditingPrediction(isEditing ? null : platform.id)} 
                            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40">
                            {isEditing ? <Icons.Check /> : <Icons.Edit />}
                          </button>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="p-4">
                        {isEditing ? (
                          <div className="space-y-2">
                            {['rank', 'volume', 'pnl', 'positions'].map(field => (
                              <div key={field} className="flex items-center gap-2">
                                <span className="text-xs text-white/40 w-16 capitalize">{field}</span>
                                <input type="number" value={stats[field] || ''} 
                                  onChange={e => setPredictionStats({...predictionStats, [platform.id]: {...stats, [field]: Number(e.target.value)}})}
                                  className="flex-1 bg-black/30 rounded-lg px-2 py-1.5 text-sm focus:outline-none border border-white/10" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-2xl font-bold" style={{ color: platform.color }}>#{stats.rank}</div>
                              <div className="text-xs text-white/40">Rank</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-emerald-400">${stats.pnl?.toLocaleString()}</div>
                              <div className="text-xs text-white/40">PnL</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-blue-400">${stats.volume?.toLocaleString()}</div>
                              <div className="text-xs text-white/40">Volume</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-400">{stats.positions}</div>
                              <div className="text-xs text-white/40">Positions</div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                          <a href={platform.url} target="_blank" rel="noopener noreferrer" 
                            className="flex-1 py-2 rounded-xl text-center text-xs font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: platform.color }}>
                            Trade
                          </a>
                          {platform.profileUrl && (
                            <a href={platform.profileUrl} target="_blank" rel="noopener noreferrer" 
                              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs">
                              Profile
                            </a>
                          )}
                          <a href={`https://twitter.com/${platform.twitter}`} target="_blank" rel="noopener noreferrer" 
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10">
                            <Icons.Twitter />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
