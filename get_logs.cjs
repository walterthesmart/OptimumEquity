const { execSync } = require('child_process');
try {
  const output = execSync('npx.cmd vercel logs optimum-equity.vercel.app --limit 10', { 
    env: { ...process.env, COLUMNS: '1000' },
    stdio: 'pipe'
  });
  console.log(output.toString());
} catch (e) {
  console.error("Error executing command", e.stdout ? e.stdout.toString() : e);
  console.error(e.stderr ? e.stderr.toString() : '');
}
