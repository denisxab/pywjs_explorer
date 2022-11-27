
import os
import webbrowser
from pathlib import Path

from auto_update import check_update

sdir = Path(__file__).parent

# Проверить необходимость синхронизации и обновления
check_update(only_info=True)
# Запустить html файл, в браузере по умолчанию
webbrowser.open(f"file://{sdir / 'client' / 'index.html'}")
# Запустить файл `main.py`
os.system(f"{sdir / 'server' / 'venv/bin/python3.11'} {sdir /'server'/ 'main.py'}")
    