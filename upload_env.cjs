const { spawn } = require('child_process');

function addEnv(name, value) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['vercel', 'env', 'add', name, 'production'], { shell: true });
    
    child.stdout.on('data', data => console.log(data.toString()));
    child.stderr.on('data', data => console.error(data.toString()));
    
    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`Exit code ${code}`));
    });

    // Write value without any trailing newlines or spaces
    child.stdin.write(value);
    child.stdin.end();
  });
}

async function main() {
  try {
    console.log("Removing old envs just in case...");
    const rm = spawn('npx', ['vercel', 'env', 'rm', 'DATABASE_URL', 'production', '--yes'], { shell: true });
    await new Promise(r => rm.on('close', r));
    const rm2 = spawn('npx', ['vercel', 'env', 'rm', 'ALPHAVANTAGE_API_KEY', 'production', '--yes'], { shell: true });
    await new Promise(r => rm2.on('close', r));
    const rm3 = spawn('npx', ['vercel', 'env', 'rm', 'FINNHUB_API_KEY', 'production', '--yes'], { shell: true });
    await new Promise(r => rm3.on('close', r));

    console.log("Adding DATABASE_URL...");
    await addEnv('DATABASE_URL', 'postgres://3311796110bf58f00e928c02c0de98ab4db04718cb8f8637386d5e6a312ab05e:sk_Sltno9O7WdfN2Co_FsVLM@pooled.db.prisma.io:5432/postgres?sslmode=require');
    
    console.log("Adding ALPHAVANTAGE_API_KEY...");
    await addEnv('ALPHAVANTAGE_API_KEY', 'C75DWYKH4DO2WJMD');
    
    console.log("Adding FINNHUB_API_KEY...");
    await addEnv('FINNHUB_API_KEY', 'd86t46hr01qoa0rs4r10d86t46hr01qoa0rs4r1g');
    
    console.log("Done!");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
