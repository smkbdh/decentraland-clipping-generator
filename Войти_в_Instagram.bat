@echo off
chcp 65001 > nul
echo ========================================================
echo    Запуск чистого окна Chrome для входа в Instagram
echo ========================================================
echo.
echo 1. В открывшемся окне введите ваш логин и пароль от Instagram.
echo 2. Пройдите проверку (если потребуется).
echo 3. После успешного входа в ленту просто закройте окно браузера!
echo.
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --user-data-dir="D:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\instagram_browser_profile_ai" --no-first-run --no-default-browser-check "https://www.instagram.com/accounts/login/"
exit
