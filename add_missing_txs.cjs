const fs = require('fs');
const txs = JSON.parse(fs.readFileSync('./src/data/transactions.json', 'utf8'));
const csv = fs.readFileSync('./Optimum Equity Transactions - Sheet1.csv', 'utf8').split('\n').slice(1);
let added = 0;

csv.forEach(line => {
  const parts = line.trim().split(',');
  if (parts.length < 5) return;
  const [sym, date, type, price, shares, cnum, assetClass] = parts;
  if(!sym) return;
  const dStr = date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8);
  const t = txs.find(tx => tx.symbol === sym && tx.date === dStr && tx.type === type && tx.shares === parseFloat(shares));
  
  if (!t) {
    txs.push({
      id: `${sym}-${date}-${Math.random().toString(36).substring(7)}`,
      symbol: sym,
      date: dStr,
      type: type,
      price: parseFloat(price),
      shares: parseFloat(shares),
      fees: 0,
      assetClass: assetClass || 'Stock',
      createdAt: new Date().toISOString()
    });
    added++;
  }
});

console.log('Total added:', added);

if (added > 0) {
  fs.writeFileSync('./src/data/transactions.json', JSON.stringify(txs, null, 2));
  console.log('Updated transactions.json with missing transactions.');
}
