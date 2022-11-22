
from pathlib import Path
import webbrowser
import os

sdir = Path(__file__).parent 
# Запустить html файл, в браузере по умолчанию
webbrowser.open(f"file://{sdir / 'client' / 'index.html'}")
# Запустить файл `main.py`
os.system(f"{sdir / 'server' / 'venv/bin/python3.11'} {sdir /'server'/ 'main.py'}")
    