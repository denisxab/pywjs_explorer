
import shutil
import time
env_dir = '''/media/denis/dd19b13d-bd85-46bb-8db9-5b8f6cf7a825/test/test_pywjs/myapp/server/venv'''

check_int = str(time.time_ns() % 100)
r = input(f'Для подтверждения удаления, введите число:\n\n{check_int}:\t')
if r == check_int:
    shutil.rmtree(env_dir)
    print("\nУспешное удаление")
else:
    print("\nНе верное число, удаление отменено")
    