const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = path.resolve('projects/geo_documentary_episode_02');
const outDir = 'D:\\Buddah\\episode_02_geo\\shorts';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const shorts = [
  { id: 'Short01-BotTraffic', file: '01_bot_traffic_paradox.mp4' },
  { id: 'Short02-ConversionParadox', file: '02_conversion_paradox.mp4' },
  { id: 'Short03-DeathOfLinks', file: '03_death_of_10_blue_links.mp4' },
  { id: 'Short04-BenCarRent', file: '04_bencarrent_case.mp4' },
  { id: 'Short05-KamalaDeal', file: '05_kamala_villa_deal.mp4' },
  { id: 'Short06-LlmsTxtMyth', file: '06_llmstxt_myth.mp4' },
  { id: 'Short07-SpeedToLead', file: '07_speed_to_lead_15min.mp4' }
];

console.log(`Starting batch render of ${shorts.length} Shorts to ${outDir}...\n`);

for (let i = 0; i < shorts.length; i++) {
  const s = shorts[i];
  const outPath = path.join(outDir, s.file);
  console.log(`[${i + 1}/${shorts.length}] Rendering ${s.id} -> ${s.file}...`);
  const startTime = Date.now();

  const res = spawnSync('pnpm', ['exec', 'remotion', 'render', 'src/index.ts', s.id, outPath, '--concurrency=6'], {
    cwd: projectDir,
    stdio: 'inherit',
    shell: true
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  if (res.status === 0 && fs.existsSync(outPath)) {
    const stats = fs.statSync(outPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`✓ [${i + 1}/${shorts.length}] Finished ${s.file} in ${durationSec}s (${sizeMb} MB)\n`);
  } else {
    console.error(`✗ [${i + 1}/${shorts.length}] Failed rendering ${s.id}! Exit code: ${res.status}\n`);
    process.exit(1);
  }
}

console.log(`\n🎉 ALL 7 SHORTS SUCCESSFULLY RENDERED TO ${outDir}!`);
