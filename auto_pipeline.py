"""
Full Auto Pipeline: Render Decentraland Shorts -> Auto-Upload to YouTube via ScatterSpark
"""
import os
import sys
import time
import requests
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
SUPABASE_URL = "https://gsdgbuscghdygyptxthg.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGdidXNjZ2hkeWd5cHR4dGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDc3OTUsImV4cCI6MjA4MjA4Mzc5NX0.wLkGUFxLdHykEtQ0cIZs4Dqz1x4tXa-hx4l3fwFtb4s"

def authenticate_supabase(email: str, password: str):
    """Logs in to Supabase and returns user_id and access_token."""
    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": ANON_KEY,
        "Content-Type": "application/json"
    }
    r = requests.post(url, json={"email": email, "password": password}, headers=headers)
    if r.status_code != 200:
        raise Exception(f"Auth failed ({r.status_code}): {r.text}")
    data = r.json()
    return data["user"]["id"], data["access_token"]

def upload_video_to_supabase(user_id: str, access_token: str, file_path: Path):
    """Uploads a video to Supabase Storage bucket 'videos'."""
    ext = file_path.suffix.lstrip(".")
    storage_path = f"{user_id}/{int(time.time())}_{file_path.name}"
    url = f"{SUPABASE_URL}/storage/v1/object/videos/{storage_path}"
    headers = {
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {access_token}",
        "Content-Type": f"video/{ext}"
    }
    with open(file_path, "rb") as f:
        r = requests.post(url, headers=headers, data=f.read())
    if r.status_code not in (200, 201):
        raise Exception(f"Storage upload failed ({r.status_code}): {r.text}")
    return storage_path

def publish_to_youtube(user_id: str, access_token: str, storage_path: str, title: str, description: str):
    """Triggers the youtube-upload Edge Function."""
    url = f"{SUPABASE_URL}/functions/v1/youtube-upload"
    headers = {
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "user_id": user_id,
        "video_path": storage_path,
        "title": title,
        "description": description,
        "tags": ["decentraland", "gaming", "shorts"],
        "is_shorts": True,
        "privacy_status": "public"
    }
    r = requests.post(url, json=payload, headers=headers, timeout=120)
    if r.status_code != 200:
        raise Exception(f"YouTube publish failed ({r.status_code}): {r.text}")
    return r.json()
