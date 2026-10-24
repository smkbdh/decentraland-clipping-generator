"""
Decentraland Auto-Publisher:
- Refreshes Supabase session
- Uploads video to Supabase Storage
- Triggers YouTube upload Edge Function
- Returns live YouTube Shorts URL
"""
import os
import sys
import time
import json
import requests
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
SESSION_FILE = BASE_DIR / "session.json"
SUPABASE_URL = "https://gsdgbuscghdygyptxthg.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGdidXNjZ2hkeWd5cHR4dGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDc3OTUsImV4cCI6MjA4MjA4Mzc5NX0.wLkGUFxLdHykEtQ0cIZs4Dqz1x4tXa-hx4l3fwFtb4s"

def get_valid_session():
    """Reads session.json and refreshes token if needed."""
    if not SESSION_FILE.exists():
        raise Exception("session.json not found!")
    
    with open(SESSION_FILE, "r") as f:
        session = json.load(f)
    
    refresh_token = session.get("refresh_token")
    # Always refresh to ensure active fresh token
    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=refresh_token"
    headers = {"apikey": ANON_KEY, "Content-Type": "application/json"}
    r = requests.post(url, json={"refresh_token": refresh_token}, headers=headers)
    
    if r.status_code == 200:
        new_session = r.json()
        with open(SESSION_FILE, "w") as f:
            json.dump(new_session, f, indent=2)
        return new_session["access_token"], new_session["user"]["id"]
    else:
        # Fallback to existing access_token
        return session["access_token"], session["user"]["id"]

def upload_and_publish(video_path: Path, title: str, description: str):
    """Uploads video to Supabase Storage and triggers YouTube upload."""
    access_token, user_id = get_valid_session()
    
    file_name = video_path.name
    file_size = video_path.stat().st_size
    print(f"\n[1/3] Uploading {file_name} ({round(file_size/(1024*1024), 2)} MB) to Supabase Storage...")
    
    storage_path = f"{user_id}/{int(time.time())}_{file_name}"
    upload_url = f"{SUPABASE_URL}/storage/v1/object/videos/{storage_path}"
    headers = {
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "video/mp4"
    }
    
    with open(video_path, "rb") as f:
        r = requests.post(upload_url, headers=headers, data=f.read())
        
    if r.status_code not in (200, 201):
        raise Exception(f"Storage upload failed ({r.status_code}): {r.text}")
    print(f" -> Uploaded to storage: {storage_path}")

    # Register in videos table
    print("[2/3] Registering in videos table...")
    videos_table_url = f"{SUPABASE_URL}/rest/v1/videos"
    v_payload = {
        "user_id": user_id,
        "file_name": file_name,
        "file_path": storage_path,
        "file_size": file_size,
        "status": "uploaded"
    }
    vr = requests.post(videos_table_url, json=v_payload, headers={
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    })
    
    video_id = vr.json()[0]["id"] if vr.status_code in (200, 201) and vr.json() else None
    
    # Create post in posts table
    post_id = None
    if video_id:
        post_table_url = f"{SUPABASE_URL}/rest/v1/posts"
        p_payload = {
            "user_id": user_id,
            "video_id": video_id,
            "title": title,
            "description": description,
            "status": "pending"
        }
        pr = requests.post(post_table_url, json=p_payload, headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        })
        if pr.status_code in (200, 201) and pr.json():
            post_id = pr.json()[0]["id"]

    # Trigger Edge Function
    print("[3/3] Triggering YouTube Upload Edge Function...")
    edge_url = f"{SUPABASE_URL}/functions/v1/youtube-upload"
    edge_payload = {
        "user_id": user_id,
        "video_path": storage_path,
        "title": title,
        "description": description,
        "tags": ["decentraland", "gaming", "shorts", "adultgaming"],
        "is_shorts": True,
        "privacy_status": "public",
        "post_id": post_id
    }
    
    er = requests.post(edge_url, json=edge_payload, headers={
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }, timeout=180)
    
    if er.status_code != 200:
        raise Exception(f"YouTube upload failed ({er.status_code}): {er.text}")
        
    res_data = er.json()
    youtube_url = res_data.get("url")
    print(f"\n SUCCESS! Published to YouTube Shorts:")
    print(f" -> {youtube_url}\n")
    return youtube_url

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: py auto_pipeline.py <video_path> [title] [description]")
        sys.exit(1)
        
    vpath = Path(sys.argv[1])
    t = sys.argv[2] if len(sys.argv) > 2 else f"Decentraland Viral Clip #shorts"
    d = sys.argv[3] if len(sys.argv) > 3 else "Decentraland is a free social gaming world for adults, available on desktop and mobile.\n@decentraland_foundation #decentraland #shorts"
    
    upload_and_publish(vpath, t, d)
