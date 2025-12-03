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
  Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
};

// ==================== FUNDING PLATFORMS ====================
const FUNDING_PLATFORMS = [
  { id: 'hyperliquid', name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: '#4ade80', logo: 'https://www.google.com/s2/favicons?domain=hyperliquid.xyz&sz=128' },
  { id: 'vest', name: 'Vest', url: 'https://vest.exchange/', color: '#a78bfa', logo: 'https://www.google.com/s2/favicons?domain=vest.exchange&sz=128' },
  { id: 'ostium', name: 'Ostium', url: 'https://app.ostium.com/trade', color: '#3b82f6', logo: 'https://www.google.com/s2/favicons?domain=ostium.io&sz=128' },
  { id: 'paradex', name: 'Paradex', url: 'https://www.paradex.trade/', color: '#f472b6', logo: 'https://www.google.com/s2/favicons?domain=paradex.trade&sz=128' },
  { id: 'extended', name: 'Extended', url: 'https://extended.exchange/', color: '#60a5fa', logo: 'https://www.google.com/s2/favicons?domain=extended.exchange&sz=128' },
  { id: 'lighter', name: 'Lighter', url: 'https://lighter.xyz/', color: '#22d3ee', logo: 'https://www.google.com/s2/favicons?domain=lighter.xyz&sz=128' },
  { id: 'xyz', name: 'XYZ', url: 'https://app.trade.xyz/trade', color: '#facc15', logo: 'https://www.google.com/s2/favicons?domain=trade.xyz&sz=128' },
  { id: 'vertex', name: 'Vertex', url: 'https://app.vertexprotocol.com/', color: '#8b5cf6', logo: 'https://www.google.com/s2/favicons?domain=vertexprotocol.com&sz=128' },
  { id: 'dydx', name: 'dYdX', url: 'https://trade.dydx.exchange/', color: '#6366f1', logo: 'https://www.google.com/s2/favicons?domain=dydx.exchange&sz=128' },
  { id: 'gmx', name: 'GMX', url: 'https://app.gmx.io/', color: '#3b82f6', logo: 'https://www.google.com/s2/favicons?domain=gmx.io&sz=128' },
];

// ==================== PAIRS BY PLATFORM ====================
const PAIRS_BY_PLATFORM = {
  hyperliquid: {
    crypto: ['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'MATIC', 'LINK', 'UNI', 'AAVE', 'LDO', 'MKR', 'CRV', 'SNX', 'SUI', 'APT', 'INJ', 'SEI', 'TIA', 'STRK', 'JUP', 'WIF', 'PEPE', 'BONK', 'NEAR', 'FTM', 'ATOM', 'DOT', 'ADA', 'XRP', 'LTC', 'HYPE', 'RENDER', 'TAO', 'WLD', 'PYTH', 'JTO', 'ONDO'],
    forex: [], commodities: [], indices: [], stocks: [],
  },
  vest: {
    crypto: ['BTC', 'ETH', 'SOL', 'ARB', 'AVAX', 'DOGE', 'LINK', 'UNI', 'AAVE', 'SUI', 'APT', 'INJ', 'SEI', 'WIF', 'PEPE', 'BONK', 'NEAR', 'FTM'],
    forex: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'EUR/GBP', 'GBP/JPY', 'EUR/JPY', 'USD/CHF', 'NZD/USD'],
    commodities: ['XAU/USD', 'XAG/USD'],
    indices: [],
    stocks: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'AMD', 'NFLX', 'COIN', 'MSTR', 'GME', 'AMC'],
  },
  ostium: {
    crypto: ['BTC', 'ETH'],
    forex: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'EUR/GBP', 'GBP/JPY', 'USD/MXN', 'EUR/CHF'],
    commodities: ['XAU/USD', 'XAG/USD', 'WTI', 'BRENT', 'NG', 'COPPER'],
    indices: ['SPX', 'NDX', 'DJI', 'DAX', 'FTSE', 'N225', 'HSI'],
    stocks: [],
  },
  paradex: { crypto: ['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'LINK', 'SUI', 'APT', 'STRK'], forex: [], commodities: [], indices: [], stocks: [] },
  extended: { crypto: ['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'LINK', 'UNI', 'AAVE'], forex: [], commodities: [], indices: [], stocks: [] },
  lighter: { crypto: ['BTC', 'ETH', 'SOL', 'ARB', 'AVAX', 'LINK'], forex: [], commodities: [], indices: [], stocks: [] },
  xyz: { crypto: ['BTC', 'ETH', 'SOL', 'HYPE'], forex: [], commodities: [], indices: [], stocks: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'AMD', 'COIN', 'MSTR'] },
  vertex: { crypto: ['BTC', 'ETH', 'SOL', 'ARB', 'OP', 'AVAX', 'DOGE', 'LINK', 'UNI', 'AAVE', 'SUI', 'APT', 'INJ', 'SEI'], forex: [], commodities: [], indices: [], stocks: [] },
  dydx: { crypto: ['BTC', 'ETH', 'SOL', 'AVAX', 'DOGE', 'LINK', 'UNI', 'AAVE', 'NEAR', 'ATOM', 'DOT', 'ADA', 'XRP', 'LTC'], forex: [], commodities: [], indices: [], stocks: [] },
  gmx: { crypto: ['BTC', 'ETH', 'SOL', 'ARB', 'AVAX', 'DOGE', 'LINK', 'UNI', 'NEAR', 'ATOM'], forex: [], commodities: [], indices: [], stocks: [] },
};

// ==================== PREDICTIONS ====================
const PREDICTION_PLATFORMS = [
  { id: 'polymarket', name: 'Polymarket', url: 'https://polymarket.com/', profileUrl: 'https://polymarket.com/@Burlakinho', color: '#6366f1', twitter: 'Polymarket', logo: 'https://www.google.com/s2/favicons?domain=polymarket.com&sz=128' },
  { id: 'myriad', name: 'Myriad', url: 'https://myriad.markets/earn', profileUrl: 'https://myriad.markets/profile/0x5e5351219b9b9da69744A43101b9395BAdC9a2e9', color: '#8b5cf6', twitter: 'MyriadMarkets', logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' },
  { id: 'myriadbnb', name: 'Myriad BNB', url: 'https://bnb.myriadprotocol.com/markets', profileUrl: 'https://bnb.myriadprotocol.com/profile/0x5e5351219b9b9da69744A43101b9395BAdC9a2e9', color: '#f0b90b', twitter: 'MyriadMarkets', logo: 'https://www.google.com/s2/favicons?domain=myriad.markets&sz=128' },
  { id: 'limitless', name: 'Limitless', url: 'https://limitless.exchange/advanced', profileUrl: 'https://limitless.exchange/profile/0x5e5351219b9b9da69744A43101b9395BAdC9a2e9', color: '#ec4899', twitter: 'trylimitless', logo: 'https://www.google.com/s2/favicons?domain=limitless.exchange&sz=128' },
  { id: 'xomarket', name: 'XO Market', url: 'https://beta.xo.market/markets', profileUrl: 'https://beta.xo.market/profile/neventheboss', color: '#06b6d4', twitter: 'xodotmarket', logo: 'https://www.google.com/s2/favicons?domain=xo.market&sz=128' },
  { id: 'predictbase', name: 'PredictBase', url: 'https://predictbase.app/', profileUrl: null, color: '#14b8a6', twitter: 'PredictBase', logo: 'https://www.google.com/s2/favicons?domain=predictbase.app&sz=128' },
  { id: 'opinion', name: 'Opinion', url: 'https://app.opinion.trade/profile', profileUrl: null, color: '#f97316', twitter: 'OpinionLabsXYZ', logo: 'https://www.google.com/s2/favicons?domain=opinion.trade&sz=128' },
];

// ==================== STOCKS ====================
const STOCK_LOGOS = { NVDA: 'nvidia.com', AAPL: 'apple.com', MSFT: 'microsoft.com', GOOGL: 'google.com', META: 'meta.com', AMZN: 'amazon.com', TSLA: 'tesla.com', AMD: 'amd.com', INTC: 'intel.com', ASML: 'asml.com', TSM: 'tsmc.com', CCJ: 'cameco.com', URA: 'globalxetfs.com', URNM: 'sprott.com', NXE: 'nexgenenergy.ca', DNN: 'denisonmines.com', RKLB: 'rocketlabusa.com', LUNR: 'intuitivemachines.com', PLTR: 'palantir.com', LMT: 'lockheedmartin.com', RTX: 'rtx.com', EWJ: 'ishares.com', FCX: 'fcx.com' };
const getStockLogo = (s) => STOCK_LOGOS[s] ? `https://logo.clearbit.com/${STOCK_LOGOS[s]}` : `https://logo.clearbit.com/${s.toLowerCase()}.com`;

const SECTORS = ['All', 'Uranium', 'Semiconductors', 'Space', 'Defense', 'Japan', 'Copper', 'Other'];
const DEFAULT_WATCHLIST = [
  { symbol: 'CCJ', group: 'Uranium', weight: 50 }, { symbol: 'URA', group: 'Uranium', weight: 40 }, { symbol: 'URNM', group: 'Uranium', weight: 30 }, { symbol: 'NXE', group: 'Uranium', weight: 25 },
  { symbol: 'NVDA', group: 'Semiconductors', weight: 100 }, { symbol: 'ASML', group: 'Semiconductors', weight: 60 }, { symbol: 'TSM', group: 'Semiconductors', weight: 70 }, { symbol: 'AMD', group: 'Semiconductors', weight: 50 },
  { symbol: 'RKLB', group: 'Space', weight: 35 }, { symbol: 'LUNR', group: 'Space', weight: 25 },
  { symbol: 'PLTR', group: 'Defense', weight: 55 }, { symbol: 'LMT', group: 'Defense', weight: 60 }, { symbol: 'RTX', group: 'Defense', weight: 50 },
  { symbol: 'EWJ', group: 'Japan', weight: 40 }, { symbol: 'FCX', group: 'Copper', weight: 35 },
];

// ==================== TREEMAP ====================
const calculateTreemap = (items, w, h) => {
  if (!items.length) return [];
  const res = []; let x = 0, y = 0, rW = w, rH = h;
  let rem = [...items].sort((a, b) => (b.weight || 1) - (a.weight || 1));
  while (rem.length) {
    const isH = rW >= rH, side = isH ? rH : rW;
    let row = [], rWeight = 0, total = rem.reduce((s, i) => s + (i.weight || 1), 0);
    for (let i = 0; i < rem.length && row.length < 4; i++) {
      row.push(rem[i]); rWeight += rem[i].weight || 1;
      if ((rWeight / total) * (isH ? rW : rH) > side * 0.8 && row.length > 1) break;
    }
    const rowSize = (rWeight / total) * (isH ? rW : rH); let off = 0;
    row.forEach(item => {
      const iSize = ((item.weight || 1) / rWeight) * side;
      res.push({ ...item, x: isH ? x : x + off, y: isH ? y + off : y, width: isH ? rowSize : iSize, height: isH ? iSize : rowSize });
      off += iSize;
    });
    if (isH) { x += rowSize; rW -= rowSize; } else { y += rowSize; rH -= rowSize; }
    rem = rem.filter(i => !row.includes(i));
  }
  return res;
};

const getColor = (c) => { const v = parseFloat(c) || 0; return v > 5 ? '#16a34a' : v > 2 ? '#15803d' : v > 0 ? '#166534' : v > -2 ? '#7f1d1d' : v > -5 ? '#991b1b' : '#b91c1c'; };

// ==================== FETCH HOOKS ====================

// Simulates fetching Prediction Stats from a hypothetical public API
const useFetchPredictionStats = (setPredictionStats) => {
  const fetchStats = useCallback(async () => {
    // --- SIMULATION API AVEC VOS DONNÉES EN DIRECT ---
    await new Promise(resolve => setTimeout(resolve, 500)); 
    const simulatedData = {
      polymarket: { rank: 45, pnl: 21500, positions: 68, volume: 450000 }, // Données Burlakinho simulées
      myriad: { rank: 8, pnl: 8900, positions: 14, volume: 85000 },
      myriadbnb: { rank: 3, pnl: 12000, positions: 9, volume: 60000 },
      limitless: { rank: 18, pnl: 2500, positions: 32, volume: 120000 },
      xomarket: { rank: 5, pnl: 15000, positions: 18, volume: 250000 },
    };
    // --------------------------
    setPredictionStats(prev => {
        // Garde les données manuelles non simulées, écrase celles qui le sont.
        const manualStats = Object.keys(prev).reduce((acc, key) => {
            if (!simulatedData[key]) {
                 acc[key] = prev[key];
            }
            return acc;
        }, {});
        return {...manualStats, ...simulatedData};
    });
  }, [setPredictionStats]);

  return fetchStats;
};

// ==================== MAIN ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('funding');
  
  // Stocks
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('golazo_watchlist') || 'null') || DEFAULT_WATCHLIST);
  const [stockData, setStockData] = useState({});
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newStock, setNewStock] = useState({ symbol: '', group: 'Other' });
  const [sectorFilter, setSectorFilter] = useState('All');
  const [timeframe, setTimeframe] = useState('D');

  // Funding
  const [positions, setPositions] = useState(() => JSON.parse(localStorage.getItem('golazo_positions') || '[]'));
  const [longPlatform, setLongPlatform] = useState('hyperliquid');
  const [shortPlatform, setShortPlatform] = useState('vest');
  const [pairCategory, setPairCategory] = useState('crypto');
  const [selectedPair, setSelectedPair] = useState(null);
  const [newPos, setNewPos] = useState({ longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10', longApr: '', shortApr: '' });
  const [fundingRates, setFundingRates] = useState({});
  const [loadingAprId, setLoadingAprId] = useState(null); 

  // Predictions
  const [predictionStats, setPredictionStats] = useState(() => JSON.parse(localStorage.getItem('golazo_predictions') || 'null') || {});
  const [editingPrediction, setEditingPrediction] = useState(null);
  const fetchPredictionStats = useFetchPredictionStats(setPredictionStats); 

  // Persistence
  useEffect(() => { localStorage.setItem('golazo_watchlist', JSON.stringify(watchlist)); }, [watchlist]);
  useEffect(() => { localStorage.setItem('golazo_positions', JSON.stringify(positions)); }, [positions]);
  useEffect(() => { localStorage.setItem('golazo_predictions', JSON.stringify(predictionStats)); }, [predictionStats]);

  // Fetch funding rates from Hyperliquid (as a common source for now)
  const fetchFundingRates = useCallback(async () => {
    try {
      const res = await fetch('https://api.hyperliquid.xyz/info', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'metaAndAssetCtxs' }) });
      const data = await res.json();
      if (data?.[0]?.universe && data?.[1]) {
        const rates = {};
        data[1].forEach((ctx, i) => { 
          const sym = data[0].universe[i]?.name; 
          // Funding rate * 3 (every 8 hours) * 365 days * 100 to get APR %
          if (sym) rates[sym] = parseFloat(ctx.funding || 0) * 3 * 365 * 100; 
        });
        setFundingRates(rates);
        return rates; 
      }
    } catch (e) { 
      console.error("Erreur de récupération des taux de financement:", e); 
      return {};
    }
    return {};
  }, []);
  
  // Update APR for a specific position (using Hyperliquid rates for now)
  const updatePositionApr = useCallback(async (id, pair) => {
    setLoadingAprId(id);
    const rates = await fetchFundingRates();
    const newRate = rates[pair];

    if (newRate !== undefined) {
        setPositions(prevPositions => 
            prevPositions.map(p => 
                p.id === id 
                ? { 
                    ...p, 
                    // Mise à jour de l'APR Long et Short avec le nouveau taux Hyperliquid
                    longApr: newRate.toFixed(2), 
                    shortApr: newRate.toFixed(2) 
                  }
                : p
            )
        );
    }
    setLoadingAprId(null);
  }, [fetchFundingRates]);

  // Fetch stocks
  const fetchStockData = useCallback(async () => {
    if (!watchlist.length) return;
    setLoadingStocks(true);
    try {
      const symbols = watchlist.map(s => s.symbol).join(',');
      const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`)}`);
      if (res.ok) {
        const data = await res.json();
        const newData = {};
        (data?.quoteResponse?.result || []).forEach(q => { newData[q.symbol] = { price: q.regularMarketPrice || 0, change: q.regularMarketChangePercent || 0, marketCap: q.marketCap || 0, name: q.shortName || q.symbol }; });
        setStockData(newData);
      }
    } catch (e) { console.error(e); }
    setLoadingStocks(false);
  }, [watchlist]);

  // Initial and recurring data fetching
  useEffect(() => { 
    fetchStockData(); 
    fetchFundingRates(); 
    fetchPredictionStats();
    
    const i1 = setInterval(fetchStockData, 60000); 
    const i2 = setInterval(fetchFundingRates, 30000); 
    
    return () => { 
      clearInterval(i1); 
      clearInterval(i2); 
    }; 
  }, [fetchStockData, fetchFundingRates, fetchPredictionStats]);

  // Helpers
  const getAvailablePairs = () => {
    const lP = PAIRS_BY_PLATFORM[longPlatform]?.[pairCategory] || [];
    const sP = PAIRS_BY_PLATFORM[shortPlatform]?.[pairCategory] || [];
    const lSet = new Set(lP);
    return sP.filter(p => lSet.has(p));
  };

  const selectPair = (pair) => {
    setSelectedPair(pair);
    const rate = fundingRates[pair];
    setNewPos(prev => ({ 
        ...prev, 
        longApr: rate !== undefined ? rate.toFixed(2) : prev.longApr, 
        shortApr: rate !== undefined ? rate.toFixed(2) : prev.shortApr 
    }));
  };

  const addPosition = () => {
    if (!selectedPair) return;
    setPositions([...positions, { id: Date.now(), pair: selectedPair, longPlatform, shortPlatform, ...newPos }]);
    setNewPos({ longCapital: '', shortCapital: '', longLeverage: '10', shortLeverage: '10', longApr: '', shortApr: '' });
    setSelectedPair(null);
  };

  const addStock = () => {
    if (!newStock.symbol) return;
    const sym = newStock.symbol.toUpperCase().trim();
    if (!watchlist.find(s => s.symbol === sym)) { setWatchlist([...watchlist, { symbol: sym, group: newStock.group, weight: 30 }]); setNewStock({ symbol: '', group: 'Other' }); setTimeout(fetchStockData, 500); }
  };

  const calcYield = (lA, sA, lN, sN) => { const net = -parseFloat(lA || 0) + parseFloat(sA || 0); return { net, daily: ((lN + sN) / 2 * net / 100) / 365 }; };

  const totalStats = positions.reduce((acc, p) => {
    const lN = Number(p.longCapital || 0) * Number(p.longLeverage || 1);
    const sN = Number(p.shortCapital || 0) * Number(p.shortLeverage || 1);
    const { daily } = calcYield(p.longApr, p.shortApr, lN, sN);
    return { daily: acc.daily + daily };
  }, { daily: 0 });

  const filtered = sectorFilter === 'All' ? watchlist : watchlist.filter(s => s.group === sectorFilter);
  const treemapData = useMemo(() => {
    const items = filtered.map(i => ({ ...i, ...stockData[i.symbol], weight: stockData[i.symbol]?.marketCap ? Math.log10(stockData[i.symbol].marketCap) * 10 : (i.weight || 30) }));
    return calculateTreemap(items, 100, 100);
  }, [filtered, stockData]);

  const tabs = [{ id: 'funding', label: 'Funding', icon: Icons.Zap }, { id: 'stocks', label: 'Markets', icon: Icons.TrendUp }, { id: 'predictions', label: 'Predictions', icon: Icons.Target }];

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative flex">
        {/* Sidebar */}
        <aside className="w-60 min-h-screen border-r border-white/[0.06] bg-black/30 backdrop-blur-xl flex flex-col">
          <div className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"><Icons.Football /></div>
              <div><h1 className="text-lg font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">GOLAZO</h1><p className="text-[10px] text-white/30 uppercase tracking-widest">Trading Hub</p></div>
            </div>
          </div>
          <nav className="p-3 space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'}`}>
                <tab.icon />{tab.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-white/[0.06]">
            <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Platforms</div>
            <div className="space-y-1 max-h-[280px] overflow-y-auto">
              {FUNDING_PLATFORMS.map(p => (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] text-xs text-white/50 hover:text-white transition-all">
                  <img src={p.logo} alt="" className="w-4 h-4 rounded" />{p.name}<Icons.External />
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-auto">
          
          {/* FUNDING */}
          {activeTab === 'funding' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                {[{ l: 'Daily', v: totalStats.daily }, { l: 'Weekly', v: totalStats.daily * 7 }, { l: 'Monthly', v: totalStats.daily * 30 }, { l: 'Yearly', v: totalStats.daily * 365 }].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
                    <div className={`text-2xl font-bold ${s.v >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>${s.v.toFixed(i === 0 ? 2 : 0)}</div>
                    <div className="text-xs text-white/30">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/20">
                    <div className="text-xs text-emerald-400 uppercase tracking-wider mb-2 font-bold">⬆️ Long Platform</div>
                    <select value={longPlatform} onChange={e => { setLongPlatform(e.target.value); setSelectedPair(null); }} className="w-full bg-black/30 border border-emerald-500/30 rounded-lg px-3 py-2 text-emerald-400 focus:outline-none">
                      {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20">
                    <div className="text-xs text-red-400 uppercase tracking-wider mb-2 font-bold">⬇️ Short Platform</div>
                    <select value={shortPlatform} onChange={e => { setShortPlatform(e.target.value); setSelectedPair(null); }} className="w-full bg-black/30 border border-red-500/30 rounded-lg px-3 py-2 text-red-400 focus:outline-none">
                      {FUNDING_PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Asset Type</div>
                    <div className="grid grid-cols-2 gap-1">
                      {['crypto', 'forex', 'commodities', 'indices', 'stocks'].map(cat => (
                        <button key={cat} onClick={() => { setPairCategory(cat); setSelectedPair(null); }} className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${pairCategory === cat ? 'bg-emerald-500 text-black' : 'bg-white/5 hover:bg-white/10'}`}>{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/40 uppercase tracking-wider">Pairs</span>
                      <span className="text-xs text-emerald-400">{getAvailablePairs().length}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 max-h-[200px] overflow-y-auto">
                      {getAvailablePairs().map(pair => {
                        const rate = fundingRates[pair];
                        return (
                          <button key={pair} onClick={() => selectPair(pair)} className={`p-2 rounded-lg text-xs text-center ${selectedPair === pair ? 'bg-emerald-500 text-black font-bold' : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04]'}`}>
                            <div className="font-mono font-bold">{pair}</div>
                            {rate !== undefined && selectedPair !== pair && <div className={`text-[10px] ${rate > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{rate > 0 ? '+' : ''}{rate.toFixed(1)}%</div>}
                          </button>
                        );
                      })}
                      {!getAvailablePairs().length && <div className="col-span-3 text-center text-white/30 py-4 text-xs">No common pairs</div>}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.06]">
                    <div className="text-lg font-bold mb-4">{selectedPair ? <><span className="text-emerald-400 text-2xl">{selectedPair}</span> <span className="text-white/30">Position</span></> : <span className="text-white/30">← Select a pair</span>}</div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-xs text-emerald-400 mb-2 font-bold flex items-center gap-2"><img src={FUNDING_PLATFORMS.find(p => p.id === longPlatform)?.logo} alt="" className="w-4 h-4 rounded" />{FUNDING_PLATFORMS.find(p => p.id === longPlatform)?.name} (Long)</div>
                        <div className="space-y-2">
                          <input placeholder="Capital $" type="number" value={newPos.longCapital} onChange={e => setNewPos({...newPos, longCapital: e.target.value})} className="w-full bg-black/30 rounded-lg px-3 py-2 text-sm focus:outline-none border border-emerald-500/20" />
                          <div className="flex gap-2">
                            <input placeholder="×Lev" type="number" value={newPos.longLeverage} onChange={e => setNewPos({...newPos, longLeverage: e.target.value})} className="flex-1 bg-black/30 rounded-lg px-3 py-2 text-sm focus:outline-none border border-emerald-500/20" />
                            <input placeholder="APR%" type="number" value={newPos.longApr} onChange={e => setNewPos({...newPos, longApr: e.target.value})} className="flex-1 bg-black/30 rounded-lg px-3 py-2 text-sm text-emerald-400 focus:outline-none border border-emerald-500/20" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div className="text-xs text-red-400 mb-2 font-bold flex items-center gap-2"><img src={FUNDING_PLATFORMS.find(p => p.id === shortPlatform)?.logo} alt="" className="w-4 h-4 rounded" />{FUNDING_PLATFORMS.find(p => p.id === shortPlatform)?.name} (Short)</div>
                        <div className="space-y-2">
                          <input placeholder="Capital $" type="number" value={newPos.shortCapital} onChange={e => setNewPos({...newPos, shortCapital: e.target.value})} className="w-full bg-black/30 rounded-lg px-3 py-2 text-sm focus:outline-none border border-red-500/20" />
                          <div className="flex gap-2">
                            <input placeholder="×Lev" type="number" value={newPos.shortLeverage} onChange={e => setNewPos({...newPos, shortLeverage: e.target.value})} className="flex-1 bg-black/30 rounded-lg px-3 py-2 text-sm focus:outline-none border border-red-500/20" />
                            <input placeholder="APR%" type="number" value={newPos.shortApr} onChange={e => setNewPos({...newPos, shortApr: e.target.value})} className="flex-1 bg-black/30 rounded-lg px-3 py-2 text-sm text-red-400 focus:outline-none border border-red-500/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button onClick={addPosition} disabled={!selectedPair} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-bold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed">Add Position</button>
                  </div>

                  <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] overflow-hidden">
                    <table className="w-full">
                      <thead><tr className="text-xs uppercase tracking-wider text-white/30 border-b border-white/[0.06]"><th className="text-left p-3">Pair</th><th className="text-left p-3">Long</th><th className="text-left p-3">Short</th><th className="text-right p-3">Net</th><th className="text-right p-3">Daily</th><th className="p-3"></th></tr></thead>
                      <tbody>
                        {positions.map(pos => {
                          const lP = FUNDING_PLATFORMS.find(p => p.id === pos.longPlatform);
                          const sP = FUNDING_PLATFORMS.find(p => p.id === pos.shortPlatform);
                          const lN = Number(pos.longCapital || 0) * Number(pos.longLeverage || 1);
                          const sN = Number(pos.shortCapital || 0) * Number(pos.shortLeverage || 1);
                          const { net, daily } = calcYield(pos.longApr, pos.shortApr, lN, sN);
                          const isRefreshing = loadingAprId === pos.id;
                          return (
                            <tr key={pos.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                              <td className="p-3 font-mono font-bold">
                                {pos.pair}
                                {pos.pair && PAIRS_BY_PLATFORM.hyperliquid.crypto.includes(pos.pair) && ( // Seulement rafraîchir pour les pairs Hyperliquid
                                    <button onClick={() => updatePositionApr(pos.id, pos.pair)} disabled={isRefreshing} className={`ml-2 p-1 rounded-full text-white/30 hover:text-emerald-400 transition-all ${isRefreshing ? 'animate-spin' : ''}`} title="Refresh APR">
                                        <Icons.Refresh />
                                    </button>
                                )}
                              </td>
                              <td className="p-3"><div className="flex items-center gap-2"><img src={lP?.logo} alt="" className="w-4 h-4 rounded" /><div className="text-xs"><div style={{color: lP?.color}}>{lP?.name}</div><div className="text-white/40">${lN.toLocaleString()} • {pos.longApr}%</div></div></div></td>
                              <td className="p-3"><div className="flex items-center gap-2"><img src={sP?.logo} alt="" className="w-4 h-4 rounded" /><div className="text-xs"><div style={{color: sP?.color}}>{sP?.name}</div><div className="text-white/40">${sN.toLocaleString()} • {pos.shortApr}%</div></div></div></td>
                              <td className={`p-3 text-right font-bold ${net >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{net >= 0 ? '+' : ''}{net.toFixed(2)}%</td>
                              <td className={`p-3 text-right font-bold ${daily >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>${daily.toFixed(2)}</td>
                              <td className="p-3"><button onClick={() => setPositions(positions.filter(p => p.id !== pos.id))} className="text-white/20 hover:text-red-400"><Icons.Trash /></button></td>
                            </tr>
                          );
                        })}
                        {!positions.length && <tr><td colSpan={6} className="p-8 text-center text-white/20">No positions yet</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STOCKS */}
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={fetchStockData} disabled={loadingStocks} className={`p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 ${loadingStocks ? 'animate-spin' : ''}`}><Icons.Refresh /></button>
                  <div className="flex gap-1 bg-white/[0.02] rounded-xl p-1 border border-white/[0.06]">
                    {SECTORS.map(s => <button key={s} onClick={() => setSectorFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${sectorFilter === s ? 'bg-emerald-500 text-black' : 'hover:bg-white/10'}`}>{s}</button>)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input placeholder="TICKER" value={newStock.symbol} onChange={e => setNewStock({...newStock, symbol: e.target.value.toUpperCase()})} onKeyDown={e => e.key === 'Enter' && addStock()} className="w-20 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-sm font-mono focus:outline-none" />
                  <select value={newStock.group} onChange={e => setNewStock({...newStock, group: e.target.value})} className="bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-sm">{SECTORS.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}</select>
                  <button onClick={addStock} className="p-2 bg-emerald-500 rounded-lg hover:bg-emerald-600"><Icons.Plus /></button>
                </div>
              </div>

              <div className="relative bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden" style={{ height: '450px' }}>
                {!treemapData.length ? <div className="absolute inset-0 flex items-center justify-center text-white/30">No stocks in this sector</div> : treemapData.map((item) => {
                  const data = stockData[item.symbol] || {};
                  const change = data.change || 0;
                  return (
                    <div key={item.symbol} onClick={() => setSelectedStock(item.symbol)} className={`absolute cursor-pointer transition-all group ${selectedStock === item.symbol ? 'z-20 ring-2 ring-white' : 'z-10 hover:brightness-110'}`} style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%`, height: `${item.height}%`, padding: '2px' }}>
                      <div className="relative w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: getColor(change) }}>
                        <div className="absolute inset-0 flex items-center justify-center"><img src={getStockLogo(item.symbol)} alt="" className="w-1/2 h-1/2 object-contain opacity-15 grayscale" onError={e => e.target.style.display = 'none'} /></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <button onClick={e => { e.stopPropagation(); setWatchlist(watchlist.filter(s => s.symbol !== item.symbol)); }} className="absolute top-1 right-1 p-1 rounded bg-black/40 opacity-0 group-hover:opacity-100 z-10"><Icons.X /></button>
                        <div className="relative h-full flex flex-col items-center justify-center">
                          <div className="font-bold drop-shadow-lg" style={{ fontSize: item.width > 12 ? '1rem' : '0.75rem' }}>{item.symbol}</div>
                          <div className="font-semibold text-sm">{change >= 0 ? '+' : ''}{change.toFixed(2)}%</div>
                          {item.width > 15 && data.price > 0 && <div className="text-xs text-white/60">${data.price.toFixed(2)}</div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedStock && (
                <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] overflow-hidden">
                  <div className="p-3 border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={getStockLogo(selectedStock)} alt="" className="w-8 h-8 rounded-lg bg-white/10" onError={e => e.target.style.display = 'none'} />
                      <div><div className="font-bold">{selectedStock}</div><div className="text-xs text-white/40">{stockData[selectedStock]?.name}</div></div>
                      {stockData[selectedStock] && <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${stockData[selectedStock].change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{stockData[selectedStock].change >= 0 ? '+' : ''}{stockData[selectedStock].change?.toFixed(2)}%</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {['1', '5', 'D', 'W', 'M'].map(tf => <button key={tf} onClick={() => setTimeframe(tf)} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${timeframe === tf ? 'bg-emerald-500 text-black' : 'bg-white/5 hover:bg-white/10'}`}>{tf}</button>)}
                      <button onClick={() => setSelectedStock(null)} className="p-1.5 hover:bg-white/10 rounded-lg ml-2"><Icons.X /></button>
                    </div>
                  </div>
                  <iframe src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=${timeframe}&theme=dark&style=3&hide_top_toolbar=1&hide_legend=1&save_image=0&hide_volume=1`} className="w-full h-[350px] border-0" title="Chart" />
                </div>
              )}
            </div>
          )}

          {/* PREDICTIONS */}
          {activeTab === 'predictions' && (
            <div className="space-y-6">
              <div className="text-sm text-white/40 mb-4">📊 Mets à jour tes stats manuellement ou clique sur le bouton de rafraîchissement. **Polymarket est mis à jour en direct (simulé).**</div>
              <button onClick={fetchPredictionStats} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 mb-4">
                <Icons.Refresh /> Rafraîchir les stats automatiques
              </button>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {PREDICTION_PLATFORMS.map(platform => {
                  const stats = predictionStats[platform.id] || {};
                  const isEditing = editingPrediction === platform.id;
                  
                  // Définir la section du titre comme un lien
                  const TitleLink = () => (
                    <a href={platform.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
                        <img src={platform.logo} alt="" className="w-6 h-6 rounded-lg" />
                        <span>{platform.name}</span>
                        <Icons.External />
                    </a>
                  );
                  
                  return (
                    <div key={platform.id} className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
                      <div className="h-14 relative flex items-center justify-between px-4" style={{ background: `linear-gradient(135deg, ${platform.color}40, ${platform.color}10)` }}>
                        <TitleLink />
                        <button onClick={() => setEditingPrediction(isEditing ? null : platform.id)} className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40">{isEditing ? <Icons.Check /> : <Icons.Edit />}</button>
                      </div>
                      <div className="p-4">
                        {isEditing ? (
                          <div className="space-y-2">
                            {['rank', 'pnl', 'positions', 'volume'].map(f => (
                              <div key={f} className="flex items-center gap-2">
                                <span className="text-xs text-white/40 w-16 capitalize">{f === 'pnl' ? 'PnL $' : f}</span>
                                <input 
                                    type="number" 
                                    placeholder={f === 'rank' ? '#' : '0'} 
                                    value={stats[f] || ''} 
                                    onChange={e => setPredictionStats({...predictionStats, [platform.id]: {...stats, [f]: e.target.value ? Number(e.target.value) : null}})} 
                                    className="flex-1 bg-black/30 rounded-lg px-2 py-1.5 text-sm focus:outline-none border border-white/10" 
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {platform.profileUrl && (
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-white/40">Rank (All Time)</span>
                                    <span className="text-xl font-bold" style={{ color: platform.color }}>{stats.rank ? `#${stats.rank}` : '-'}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center"><span className="text-xs text-white/40">PnL</span><span className={`text-lg font-bold ${(stats.pnl || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{stats.pnl != null ? `$${stats.pnl.toLocaleString()}` : '-'}</span></div>
                            <div className="flex justify-between items-center"><span className="text-xs text-white/40">Positions</span><span className="text-lg font-bold text-blue-400">{stats.positions ?? '-'}</span></div>
                            <div className="flex justify-between items-center"><span className="text-xs text-white/40">Volume</span><span className="text-lg font-bold text-yellow-400">{stats.volume != null ? `$${stats.volume.toLocaleString()}` : '-'}</span></div>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                          {platform.profileUrl && <a href={platform.profileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-xl text-center text-xs font-medium hover:opacity-90" style={{ backgroundColor: platform.color }}>Mon Profil</a>}
                          <a href={`https://twitter.com/${platform.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><Icons.Twitter /></a>
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
