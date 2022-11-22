
from pathlib import Path
import shutil
import time
env_dir = Path(__file__).parent / 'server' / 'venv'

check_int = str(time.time_ns() % 100)
r = input(f'Для подтверждения удаления, введите число:\n\n{check_int}:\t')
if r == check_int:
    shutil.rmtree(env_dir)
    print("\nУспешное удаление")
else:
    print("\nНе верное число, удаление отменено")
    