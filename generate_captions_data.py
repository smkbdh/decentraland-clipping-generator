import json
import os

with open(r'D:\Buddah\ai_boom_assets\transcript.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

intro_split_sec = 79.5
intro_dur_sec = 13.84

formatted_segments = []

for s in data['segments']:
    orig_start = s['start']
    orig_end = s['end']
    
    # Calculate shifted composition time
    if orig_start < intro_split_sec:
        comp_start = orig_start
        comp_end = min(orig_end, intro_split_sec)
    else:
        comp_start = orig_start + intro_dur_sec
        comp_end = orig_end + intro_dur_sec

    formatted_segments.append({
        'id': s['id'],
        'start': round(comp_start, 2),
        'end': round(comp_end, 2),
        'text': s['text'],
        'words': [
            {
                'word': w['word'],
                'start': round(w['start'] + (intro_dur_sec if w['start'] >= intro_split_sec else 0), 2),
                'end': round(w['end'] + (intro_dur_sec if w['end'] >= intro_split_sec else 0), 2)
            }
            for w in s.get('words', [])
        ]
    })

ts_content = f"""// Auto-generated word-level captions aligned with Intro insertion
export interface CaptionWord {{
  word: string;
  start: number;
  end: number;
}}

export interface CaptionSegment {{
  id: number;
  start: number;
  end: number;
  text: string;
  words: CaptionWord[];
}}

export const CAPTIONS_DATA: CaptionSegment[] = {json.dumps(formatted_segments, ensure_ascii=False, indent=2)};
"""

out_path = r'C:\Users\humun\OneDrive\Документы\KinoProjects\HBBbfSGHyp\components\captionsData.ts'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated {len(formatted_segments)} caption segments to {out_path}")
