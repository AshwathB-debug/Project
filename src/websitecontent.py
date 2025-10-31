from playwright.sync_api import sync_playwright as sp
from bs4 import BeautifulSoup

with sp() as p:
    browser = p.chromium.launch(headless = True).new_page()
    browser.goto("https://kolabrataofficial.netlify.app/")
    htmlContent = browser.content()
    browser.close()
    
    parse = BeautifulSoup(htmlContent, 'html.parser')
    with open('websitecontent.txt', 'w') as f:
        f.write(parse.text)
    
    