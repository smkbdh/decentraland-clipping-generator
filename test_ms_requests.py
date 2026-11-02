import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    page.on("requestfailed", lambda req: print(f"FAILED: {req.method} {req.url} -> {req.failure}"))
    page.on("requestfinished", lambda req: print(f"REQ FINISHED: {req.method} {req.url}"))
    page.on("console", lambda msg: print(f"CONSOLE: [{msg.type}] {msg.text}"))

    page.goto("https://app.mediasilo.com/review/6ae109cef2c6470f09434547", wait_until="networkidle", timeout=60000)
    time.sleep(3)
    browser.close()
