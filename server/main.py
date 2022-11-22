import asyncio
from pathlib import Path
from pywjs.wbs.server import wbs_main_loop
from pywjs.wbs.handle import WbsHandle
from pywjs.wbs.logger import ABC_logger, defaultLogger
from explorer_user import MyWbsFunc, MyWbsSubscribe


class UserWbsHandle(WbsHandle):
    # Разрешенные функции
    allowed_func = MyWbsFunc
    # Обработка событий на сервере
    allowed_subscribe = MyWbsSubscribe
    # Разрешенные токены подключения
    allowed_token = set(['sysdba'])
    # Путь для кеша пользователей (опционально)
    path_user_cache = Path(__file__).parent / 'user_cache.sqlite'
    # Определяем логер. По умолчанию используется https://pypi.org/project/logsmal/
    logger: ABC_logger = defaultLogger(path_to_dir_log=Path(__file__).parent)

    # Заполнить кеш пользователя значениями по умолчанию
    def init_user_cache(self) -> dict:
        return {
            "base": {
                'rawPath': '/'
            }
        }


host = "localhost"
port = 9999

if __name__ == '__main__':
    print("RUN")
    asyncio.run(wbs_main_loop(host, port, UserWbsHandle))
