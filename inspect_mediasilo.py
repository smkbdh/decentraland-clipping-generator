import time
import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    def log_response(response):
        try:
            if "api" in response.url or "review" in response.url or "graphql" in response.url or "mediasilo" in response.url:
                print(f"[{response.status}] {response.url}")
                if "application/json" in response.headers.get("content-type", ""):
                    try:
                        data = response.json()
                        print(f"JSON: {json.dumps(data)[:300]}")
                    except:
                        pass
        except:
            pass

    page.on("response", log_response)

    print("Navigating to MediaSilo...")
    page.goto("https://app.mediasilo.com/review/6ae109cef2c6470f09434547", wait_until="networkidle", timeout=60000)
    time.sleep(3)
    browser.close()
