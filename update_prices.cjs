const fs = require('fs');
const txs = JSON.parse(fs.readFileSync('./src/data/transactions.json', 'utf8'));
const csv = fs.readFileSync('./Optimum Equity Transactions - Sheet1.csv', 'utf8').split('\n').slice(1);
let diffs = 0;

csv.forEach(line => {
  const [sym, date, type, price, shares, cnum, assetClass] = line.trim().split(',');
  if(!sym) return;
  const dStr = date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8);
  const t = txs.find(tx => tx.symbol === sym && tx.date === dStr && tx.type === type && tx.shares === parseFloat(shares));
  
  if (t && Math.abs(t.price - parseFloat(price)) > 0.0001) {
    console.log(`Price diff for ${sym} ${dStr} ${type}: json=${t.price}, csv=${price}`);
    t.price = parseFloat(price);
    diffs++;
  } else if (!t) {
    console.log(`Not found in JSON: ${sym} ${dStr} ${type} ${shares}`);
  }
});

console.log('Total diffs:', diffs);

if (diffs > 0) {
  fs.writeFileSync('./src/data/transactions.json', JSON.stringify(txs, null, 2));
  console.log('Updated transactions.json');
}
