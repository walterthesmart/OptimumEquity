const fs = require('fs');

const txs = JSON.parse(fs.readFileSync('./src/data/transactions.json', 'utf8'));

const targets = {
  "IDEV": 120631.97,
  "MSFT": 8936.43,
  "VOT": 37545.83,
  "VTV": 30008.15,
  "NVDA": 11750.87,
  "FEZ": 10480.39,
  "JPM": 10095.31,
  "AMZN": 15066.68,
  "LITE": 18240.00,
  "CIEN": 20094.00,
  "PDFS": 49258.00,
  "ON": 24400.00,
  "TXN": 38733.00,
  "BOXX": 285118.74,
  "DGXX": 31076.40,
  "URTH": 242099.47,
  "WOLF": 42513.86
};

function calculatePositions(transactions) {
  const positionsMap = {};
  const sortedTxs = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sortedTxs.forEach(tx => {
    const amount = (tx.shares * tx.price) + (tx.fees || 0);
    
    if (tx.symbol === 'GEF Cash' || tx.type === 'TXIN' || tx.type === 'TXOUT') {
      return;
    }

    if (!positionsMap[tx.symbol]) {
      positionsMap[tx.symbol] = { shares: 0, totalCost: 0, assetClass: tx.assetClass || 'Stock' };
    }

    const pos = positionsMap[tx.symbol];
    if (tx.type === 'BUY') {
      pos.shares += tx.shares;
      pos.totalCost += amount;
    } else if (tx.type === 'SELL') {
      const avgCost = pos.shares > 0 ? pos.totalCost / pos.shares : 0;
      pos.shares -= tx.shares;
      pos.totalCost -= (tx.shares * avgCost);
    }
  });

  return positionsMap;
}

let changed = false;

for (const [sym, targetCost] of Object.entries(targets)) {
  let currentPos = calculatePositions(txs)[sym];
  
  if (!currentPos) {
    console.log(`Symbol ${sym} not found in positions!`);
    continue;
  }
  
  let currentCost = currentPos.totalCost;
  if (Math.abs(currentCost - targetCost) > 0.01) {
    console.log(`${sym}: Current cost = ${currentCost}, Target = ${targetCost}`);
    
    // Find the latest BUY transaction
    const symTxs = txs.filter(t => t.symbol === sym && t.type === 'BUY');
    symTxs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (symTxs.length > 0) {
      const latestBuy = symTxs[0];
      // We iteratively adjust the price of the latest buy to hit the target.
      // Since it might affect average cost if there are sells after this buy, we can just do a simple search or since it's mostly linear:
      
      let low = 0.0001;
      let high = 10000;
      let bestPrice = latestBuy.price;
      
      for (let i = 0; i < 100; i++) {
        let mid = (low + high) / 2;
        latestBuy.price = mid;
        let newCost = calculatePositions(txs)[sym].totalCost;
        if (Math.abs(newCost - targetCost) < 0.001) {
          bestPrice = mid;
          break;
        }
        if (newCost < targetCost) {
          low = mid;
        } else {
          high = mid;
        }
      }
      latestBuy.price = bestPrice;
      console.log(`  -> Adjusted latest BUY price of ${sym} to ${bestPrice}`);
      changed = true;
    }
  }
}

if (changed) {
  fs.writeFileSync('./src/data/transactions.json', JSON.stringify(txs, null, 2));
  console.log('Updated transactions.json');
} else {
  console.log('No changes needed.');
}
