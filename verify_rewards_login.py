import time
from playwright.sync_api import sync_playwright

CAMPAIGN_URL = "https://contentrewards.com/c/campaigns/78bd78e4-0ec3-44d7-9f56-122ff7c374bc"

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        "rewards_browser_profile",
        headless=True,
        viewport={"width": 1280, "height": 850},
        args=["--disable-blink-features=AutomationControlled"]
    )
    page = ctx.new_page()
    page.goto(CAMPAIGN_URL, wait_until="domcontentloaded", timeout=45000)
    time.sleep(5)
    page.screenshot(path="rewards_check.png")
    
    print("Current URL:", page.url)
    
    # Check elements
    submit_btn = page.locator('button:has-text("Submit clip"), a:has-text("Submit clip")')
    print("Submit clip buttons found:", submit_btn.count())
    
    auth_elements = page.locator('button:has-text("Sign in"), a:has-text("Log in"), a[href*="login"]')
    print("Auth/login buttons found:", auth_elements.count())
    
    ctx.close()
