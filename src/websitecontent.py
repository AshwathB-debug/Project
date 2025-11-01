from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

# Configure Chrome options
chrome_options = Options()
# chrome_options.add_argument('--headless')  # Uncomment to run without opening browser
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--window-size=1920,1080')

try:
    # Initialize the driver
    driver = webdriver.Chrome(options=chrome_options)
    
    # Navigate to the website
    print("Loading website...")
    driver.get("https://kolabrataofficial.netlify.app/")
    
    # Wait for initial page load
    wait = WebDriverWait(driver, 15)
    wait.until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
    
    print("Page loaded. Waiting for content to render...")
    
    # Scroll through the entire page to trigger lazy loading
    print("Scrolling to load all content...")
    total_height = driver.execute_script("return document.body.scrollHeight")
    viewport_height = driver.execute_script("return window.innerHeight")
    
    current_position = 0
    while current_position < total_height:
        # Scroll down
        driver.execute_script(f"window.scrollTo(0, {current_position});")
        time.sleep(0.5)  # Wait for content to load
        current_position += viewport_height
        # Recalculate total height in case new content loaded
        total_height = driver.execute_script("return document.body.scrollHeight")
    
    # Scroll back to top
    driver.execute_script("window.scrollTo(0, 0);")
    
    # Give extra time for all animations and content to complete
    time.sleep(3)
    
    print("All content loaded!\n")
    
    # Dictionary to store all content
    content = {}
    
    # Get the entire page body text as a fallback
    try:
        body = driver.find_element(By.TAG_NAME, 'body')
        content['Full Page Content'] = body.text
        print("✓ Scraped: Full Page Content")
    except Exception as e:
        print(f"✗ Failed to scrape full page: {e}")
    
    # Section IDs to scrape individually
    sections = {
        'services': 'Services We Offer',
        'value': 'Our Value Proposition',
        'customers': 'Target Customers & Industries',
        'solutions': 'Quick-Win AI Solutions'
    }
    
    
    # Get hero section content
    try:
        hero = driver.find_element(By.TAG_NAME, 'header')
        hero_text = hero.text
        if hero_text.strip():
            content['Hero Section'] = hero_text
            print(f"✓ Scraped: Hero Section ({len(hero_text)} characters)")
    except Exception as e:
        print(f"✗ Failed to scrape Hero Section: {e}")
    
    # Scrape each section individually
    print("\nScraping individual sections...")
    for section_id, section_name in sections.items():
        try:
            # Scroll to the element
            element = driver.find_element(By.ID, section_id)
            driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element)
            time.sleep(0.5)
            
            # Get all text content within this section
            section_text = element.text
            
            if section_text.strip():
                content[section_name] = section_text
                print(f"✓ Scraped: {section_name} ({len(section_text)} characters)")
            else:
                print(f"⚠ Warning: {section_name} appears empty")
                
        except Exception as e:
            print(f"✗ Failed to scrape {section_name}: {e}")
    
    
    # Write to file with better formatting
    print("\nWriting content to file...")
    with open('websitecontent.txt', 'w', encoding='utf-8') as file:
        file.write("WEBSITE CONTENT - KOLABRATA.CO\n")
        file.write("="*80 + "\n")
        file.write(f"Scraped on: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        file.write("="*80 + "\n\n")
        
        for section_name, section_content in content.items():
            if section_name != 'Full Page Content':  # Skip full page in detailed view
                file.write(f"\n{'='*80}\n")
                file.write(f"{section_name.upper()}\n")
                file.write(f"{'='*80}\n\n")
                file.write(section_content)
                file.write("\n\n")
    
    print("✓ Content successfully saved to 'websitecontent.txt'")


except Exception as e:
    print(f"\n❌ An error occurred: {e}")
    import traceback
    traceback.print_exc()
    
finally:
    # Always close the driver
    if 'driver' in locals():
        driver.quit()
        print("\nBrowser closed.")