const fs = require('fs');
const transcript = JSON.parse(fs.readFileSync('projects/geo_documentary_episode_02/src/transcript.json', 'utf8'));

// The 7 Shorts definitions
const shortsDef = [
  {
    id: "Short01BotTraffic",
    name: "01_bot_traffic_paradox",
    title: "ПАРАДОКС БОТ-ТРАФИКА: КРАУЛЕР VS КЛИЕНТ",
    startSec: 45.4,
    endSec: 95.4,
    bgVideo: "06_act1_server_token_cost.mp4",
  },
  {
    id: "Short02ConversionParadox",
    name: "02_conversion_paradox",
    title: "КОНВЕРСИЯ В 4.5 РАЗА ВЫШЕ GOOGLE",
    startSec: 109.3,
    endSec: 156.5,
    bgVideo: "05_act1_analytics_growth.mp4",
  },
  {
    id: "Short03DeathOfLinks",
    name: "03_death_of_10_blue_links",
    title: "10 СИНИХ ССЫЛОК И МЕХАНИКА RAG",
    startSec: 177.5,
    endSec: 227.0,
    bgVideo: "b_roll_ai_data_search.mp4",
  },
  {
    id: "Short04BenCarRent",
    name: "04_bencarrent_case",
    title: "РЕАЛЬНЫЕ ЛИДЫ И БРОНИ ИЗ CHATGPT",
    startSec: 286.5,
    endSec: 341.5,
    bgVideo: "b_roll_phuket_car.mp4",
  },
  {
    id: "Short05KamalaDeal",
    name: "05_kamala_villa_deal",
    title: "СДЕЛКА НА $115,000 ИЗ ПОИСКА AI",
    startSec: 433.6,
    endSec: 478.0,
    bgVideo: "b_roll_phuket_villa.mp4",
  },
  {
    id: "Short06LlmsTxtMyth",
    name: "06_llmstxt_myth",
    title: "МИФ О ФАЙЛЕ LLMS.TXT",
    startSec: 520.0,
    endSec: 565.0,
    bgVideo: "01_hook_coding.mp4",
  },
  {
    id: "Short07SpeedToLead",
    name: "07_speed_to_lead_15min",
    title: "SPEED TO LEAD: 78% VS 8% СЛИВ КЛИЕНТА",
    startSec: 580.0,
    endSec: 623.0,
    bgVideo: "13_act3_sales_crm_office.mp4",
  }
];

const allWords = [];
transcript.segments.forEach(seg => {
  if (seg.words) {
    seg.words.forEach(w => allWords.push(w));
  }
});

shortsDef.forEach(sh => {
  const durationSec = sh.endSec - sh.startSec;
  const durationFrames = Math.round(durationSec * 30);
  const wordsInRange = allWords.filter(w => w.end >= sh.startSec && w.start <= sh.endSec).map(w => ({
    word: w.word.trim(),
    start: +(w.start - sh.startSec).toFixed(2),
    end: +(w.end - sh.startSec).toFixed(2)
  }));

  console.log(`\nShort: ${sh.name}`);
  console.log(`  Audio slice: ${sh.startSec}s to ${sh.endSec}s (${durationSec.toFixed(2)}s, ${durationFrames} frames)`);
  console.log(`  Words count: ${wordsInRange.length}`);
  console.log(`  First words: "${wordsInRange.slice(0, 5).map(w => w.word).join(' ')}"`);
  console.log(`  Last words: "${wordsInRange.slice(-5).map(w => w.word).join(' ')}"`);
});
