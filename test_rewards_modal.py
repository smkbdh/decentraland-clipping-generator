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
    time.sleep(4)

    # Click visible Submit clip
    submit_btn = page.locator('button:has-text("Submit clip"):visible').first
    submit_btn.click()
    time.sleep(2)
    page.screenshot(path="rewards_modal_opened.png")

    # Inspect inputs and buttons in modal
    elements = page.evaluate('''() => {
        const modal = document.querySelector('div[role="dialog"]') || document.body;
        const inputs = Array.from(modal.querySelectorAll('input')).map(el => ({
            type: el.type,
            placeholder: el.placeholder,
            name: el.name,
            id: el.id,
            className: el.className
        }));
        const buttons = Array.from(modal.querySelectorAll('button')).map(el => ({
            text: el.textContent.trim(),
            className: el.className
        }));
        return { inputs, buttons };
    }''')
    print("Modal elements:", elements)
    ctx.close()
