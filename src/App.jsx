import React, { useState, useEffect } from 'react';

// ==================== ICONS ====================
const Icons = {
  Zap: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  ExternalLink: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  TrendingUp: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  DollarSign: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2}/><circle cx="12" cy="12" r="6" strokeWidth={2}/><circle cx="12" cy="12" r="2" strokeWidth={2}/></svg>,
  BarChart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Save: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
};

// ==================== FUNDING PLATFORMS ====================
const FUNDING_PLATFORMS = [
  { name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/trade', color: 'text-green-400' },
  { name: 'Vest', url: 'https://alpha.vestmarkets.com/', color: 'text-purple-400' },
  { name: 'Paradex', url: 'https://www.paradex.trade/', color: 'text-pink-400' },
  { name: 'Extended', url: 'https://extended.exchange/', color: 'text-blue-400' },
  { name: 'Lighter', url: 'https://lighter.xyz/', color: 'text-cyan-400' },
  { name: 'XYZ', url: 'https://trade.xyz/', color: 'text-yellow-400' },
];

// ==================== PREDICTION SITES ====================
const PREDICTION_SITES = [
  { name: 'Polymarket', url: 'https://polymarket.com/', desc: 'Le plus gros, liquidité max' },
  { name: 'Myriad', url: 'https://myriad.markets/earn', desc: 'Earn + airdrops potentiel' },
  { name: 'Myriad BNB', url: 'https://bnb.myriadprotocol.com/markets', desc: 'Version BNB Chain' },
  { name: 'Limitless', url: 'https://limitless.exchange/advanced', desc: 'Advanced trading' },
  { name: 'PredictBase', url: 'https://predictbase.app/', desc: 'Nouveau, à explorer' },
  { name: 'Opinion Trade', url: 'https://app.opinion.trade/profile', desc: 'Opinion markets' },
  { name: 'XO Market', url: 'https://beta.xo.market/markets?sort=volume-high-to-low', desc: 'Beta, volume sorted' },
];

// ==================== MAIN APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('funding');
  
  // ===== FUNDING STATE =====
  const [fundingPositions, setFundingPositions] = useState(() => {
    const saved = localStorage.getItem('fundingPositions');
    return saved ? JSON.parse(saved) : [
      { id: 1, pair: 'EUR/USD', platform: 'Vest', capital: 7000, leverage: 15, apr: 5 },
      { id: 2, pair: 'BTC', platform: 'Hyperliquid', capital: 3000, leverage: 5, apr: 12 },
    ];
  });
  const [newPosition, setNewPosition] = useState({ pair: '', platform: 'Hyperliquid', capital: '', leverage: '', apr: '' });

  // ===== STOCKS STATE =====
  const [stockGroups, setStockGroups] = useState(() => {
    const saved = localStorage.getItem('stockGroups');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Uranium', symbols: ['CCJ', 'URA', 'URNM', 'NXE'] },
      { id: 2, name: 'Semiconductors', symbols: ['NVDA', 'ASML', 'TSM', 'AMD'] },
      { id: 3, name: 'Japan', symbols: ['EWJ', 'DXJ', 'MUFG'] },
      { id: 4, name: 'Defense', symbols: ['LMT', 'RTX', 'PLTR'] },
    ];
  });
  const [newGroup, setNewGroup] = useState({ name: '', symbols: '' });
  const [selectedStock, setSelectedStock] = useState('CCJ');

  // ===== SAVE TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem('fundingPositions', JSON.stringify(fundingPositions));
  }, [fundingPositions]);

  useEffect(() => {
    localStorage.setItem('stockGroups', JSON.stringify(stockGroups));
  }, [stockGroups]);

  // ===== FUNDING CALCULATIONS =====
  const totalCapital = fundingPositions.reduce((a, b) => a + Number(b.capital), 0);
  const totalNotional = fundingPositions.reduce((a, b) => a + (Number(b.capital) * Number(b.leverage)), 0);
  const yearlyYield = fundingPositions.reduce((a, b) => {
    const notional = Number(b.capital) * Number(b.leverage);
    return a + (notional * Number(b.apr) / 100);
  }, 0);
  const dailyYield = yearlyYield / 365;
  const monthlyYield = yearlyYield / 12;

  // ===== HANDLERS =====
  const addFundingPosition = () => {
    if (!newPosition.pair || !newPosition.capital) return;
    setFundingPositions([...fundingPositions, {
      id: Date.now(),
      ...newPosition,
      capital: Number(newPosition.capital),
      leverage: Number(newPosition.leverage) || 1,
      apr: Number(newPosition.apr) || 0,
    }]);
    setNewPosition({ pair: '', platform: 'Hyperliquid', capital: '', leverage: '', apr: '' });
  };

  const deleteFundingPosition = (id) => {
    setFundingPositions(fundingPositions.filter(p => p.id !== id));
  };

  const addStockGroup = () => {
    if (!newGroup.name || !newGroup.symbols) return;
    setStockGroups([...stockGroups, {
      id: Date.now(),
      name: newGroup.name,
      symbols: newGroup.symbols.split(',').map(s => s.trim().toUpperCase()),
    }]);
    setNewGroup({ name: '', symbols: '' });
  };

  const deleteStockGroup = (id) => {
    setStockGroups(stockGroups.filter(g => g.id !== id));
  };

  const tabs = [
    { id: 'funding', label: 'Funding', icon: Icons.Zap },
    { id: 'predictions', label: 'Predictions', icon: Icons.Target },
    { id: 'stocks', label: 'Stocks', icon: Icons.BarChart },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="text-yellow-400"><Icons.Zap /></span>
              Trading Dashboard
            </h1>
          </div>
          <nav className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                  activeTab === tab.id ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <tab.icon />{tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* ==================== FUNDING TAB ==================== */}
        {activeTab === 'funding' && (
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left: Positions */}
            <div className="lg:col-span-2 space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase">Capital</div>
                  <div className="text-2xl font-bold">${totalCapital.toLocaleString()}</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase">Notionnel</div>
                  <div className="text-2xl font-bold">${totalNotional.toLocaleString()}</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase">Yield/Jour</div>
                  <div className="text-2xl font-bold text-green-400">${dailyYield.toFixed(2)}</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase">Yield/An</div>
                  <div className="text-2xl font-bold text-green-400">${yearlyYield.toFixed(0)}</div>
                  <div className="text-xs text-gray-500">{((yearlyYield / totalCapital) * 100).toFixed(1)}% ROI</div>
                </div>
              </div>

              {/* Add Position Form */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icons.Plus />
                  Ajouter une position
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                  <input
                    type="text"
                    placeholder="Pair (BTC, EUR/USD...)"
                    value={newPosition.pair}
                    onChange={e => setNewPosition({...newPosition, pair: e.target.value})}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <select
                    value={newPosition.platform}
                    onChange={e => setNewPosition({...newPosition, platform: e.target.value})}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  >
                    {FUNDING_PLATFORMS.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Capital $"
                    value={newPosition.capital}
                    onChange={e => setNewPosition({...newPosition, capital: e.target.value})}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Leverage"
                    value={newPosition.leverage}
                    onChange={e => setNewPosition({...newPosition, leverage: e.target.value})}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="APR %"
                    value={newPosition.apr}
                    onChange={e => setNewPosition({...newPosition, apr: e.target.value})}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={addFundingPosition}
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm font-medium"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Positions Table */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3">Mes Positions</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-800">
                      <th className="text-left pb-2">Pair</th>
                      <th className="text-left pb-2">Platform</th>
                      <th className="text-right pb-2">Capital</th>
                      <th className="text-right pb-2">Leverage</th>
                      <th className="text-right pb-2">Notionnel</th>
                      <th className="text-right pb-2">APR</th>
                      <th className="text-right pb-2">Yield/Jour</th>
                      <th className="text-right pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundingPositions.map(pos => {
                      const notional = pos.capital * pos.leverage;
                      const daily = (notional * pos.apr / 100) / 365;
                      const platform = FUNDING_PLATFORMS.find(p => p.name === pos.platform);
                      return (
                        <tr key={pos.id} className="border-b border-gray-800/50">
                          <td className="py-2 font-mono font-bold">{pos.pair}</td>
                          <td className={`py-2 ${platform?.color || ''}`}>{pos.platform}</td>
                          <td className="py-2 text-right">${pos.capital.toLocaleString()}</td>
                          <td className="py-2 text-right">x{pos.leverage}</td>
                          <td className="py-2 text-right">${notional.toLocaleString()}</td>
                          <td className="py-2 text-right text-green-400">{pos.apr}%</td>
                          <td className="py-2 text-right text-green-400">${daily.toFixed(2)}</td>
                          <td className="py-2 text-right">
                            <button onClick={() => deleteFundingPosition(pos.id)} className="text-red-400 hover:text-red-300">
                              <Icons.Trash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Platforms Links */}
            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3">Plateformes Funding</h3>
                <div className="space-y-2">
                  {FUNDING_PLATFORMS.map(platform => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <span className={`font-medium ${platform.color}`}>{platform.name}</span>
                      <Icons.ExternalLink />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3">📊 FundingView</h3>
                <a
                  href="https://www.fundingview.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-900/50 to-purple-900/50 rounded-lg hover:from-pink-900 hover:to-purple-900 transition-colors"
                >
                  <span className="font-medium">Ouvrir FundingView</span>
                  <Icons.ExternalLink />
                </a>
                <p className="text-xs text-gray-500 mt-2">Compare les fundings entre toutes les plateformes</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3">💰 Résumé</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Positions</span>
                    <span>{fundingPositions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Yield mensuel</span>
                    <span className="text-green-400">${monthlyYield.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI sur capital</span>
                    <span className="text-green-400">{((yearlyYield / totalCapital) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PREDICTIONS TAB ==================== */}
        {activeTab === 'predictions' && (
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icons.Target />
                Prediction Markets
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PREDICTION_SITES.map(site => (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700 hover:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">{site.name}</span>
                      <Icons.ExternalLink />
                    </div>
                    <p className="text-sm text-gray-400">{site.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <h3 className="font-semibold mb-3">💡 Stratégies</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="font-medium text-green-400 mb-1">Bets Haute Probabilité</div>
                  <p className="text-gray-400">Cherche les marchés à 85%+ de probabilité pour du rendement quasi-sûr</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="font-medium text-yellow-400 mb-1">Farming Airdrops</div>
                  <p className="text-gray-400">Volume sur Myriad et nouveaux sites pour potentiels airdrops</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="font-medium text-blue-400 mb-1">Arbitrage</div>
                  <p className="text-gray-400">Compare les prix entre Polymarket et autres pour des opportunités</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="font-medium text-purple-400 mb-1">Earn Programs</div>
                  <p className="text-gray-400">LP et earn sur Myriad pour du yield + exposure aux marchés</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== STOCKS TAB ==================== */}
        {activeTab === 'stocks' && (
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left: Groups & Chart */}
            <div className="lg:col-span-2 space-y-4">
              {/* Chart */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3">📈 Chart - {selectedStock}</h3>
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&theme=dark&style=1&timezone=exchange&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=1&details=1&calendar=0`}
                    className="w-full h-full border-0"
                    title="TradingView Chart"
                  />
                </div>
              </div>

              {/* Add Group Form */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icons.Plus />
                  Ajouter un groupe
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Nom du groupe"
                    value={newGroup.name}
                    onChange={e => setNewGroup({...newGroup, name: e.target.value})}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Symbols (CCJ, URA, URNM...)"
                    value={newGroup.symbols}
                    onChange={e => setNewGroup({...newGroup, symbols: e.target.value})}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={addStockGroup}
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm font-medium"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Watchlists */}
            <div className="space-y-4">
              {stockGroups.map(group => (
                <div key={group.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{group.name}</h3>
                    <button onClick={() => deleteStockGroup(group.id)} className="text-red-400 hover:text-red-300">
                      <Icons.Trash />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.symbols.map(symbol => (
                      <button
                        key={symbol}
                        onClick={() => setSelectedStock(symbol)}
                        className={`px-3 py-1 rounded-lg text-sm font-mono transition-colors ${
                          selectedStock === symbol 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        {symbol}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3">🔗 Liens rapides</h3>
                <div className="space-y-2">
                  <a href="https://finviz.com/map.ashx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800">
                    <span>Finviz Heatmap</span>
                    <Icons.ExternalLink />
                  </a>
                  <a href="https://www.tradingview.com/screener/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800">
                    <span>TradingView Screener</span>
                    <Icons.ExternalLink />
                  </a>
                  <a href="https://www.barchart.com/stocks/performance/percent-change/advances" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800">
                    <span>Barchart Top Gainers</span>
                    <Icons.ExternalLink />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-gray-800 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          Données sauvegardées localement • Dashboard personnel
        </div>
      </footer>
    </div>
  );
}
