""" 
Автоматическое обновление программы
"""

import subprocess
from datetime import datetime
from auto_install import step3, path_server, path_python


def check_update(only_info=True):
    syncGit(only_info=only_info)


def syncGit(only_info=True):
    """

    only_info: Если True, то тогда только проинформировать о различиях, и не пытаться(откатиться/обновиться)

    """
    """Синхронизация проекта"""
    origin = 'origin'
    # Получить имя текущей ветки, оно будет считаться именем для удаленной ветки.
    select_branch: str = subprocess.run(
        'git --no-pager branch --no-color --show-current', shell=True,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding='utf-8'
    ).stdout.replace('\n', '')
    if not select_branch:
        raise ValueError("Пустая ветка")
    # Проверить синхронизацию текущего локального проекта(даже если изменения небыли за комичены), с удаленной веткой.
    diff: str = subprocess.run(
        f'git --no-pager diff {origin}/{select_branch} --raw --name-status', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding='utf-8'
    ).stdout.replace('\n', '')
    if diff:
        #
        # Если есть различия в локальной и удаленной ветки
        #
        print('GitReset')
        if only_info:
            print('OnlyInfo')
            return False
        # Делаем коммит текущих локальных изменений.
        subprocess.run('git add -A', shell=True, check=True)
        subprocess.run(
            f"git commit -m 'CommitByAutoUpdate:{datetime.now()}'", shell=True, check=True)
        # Получаем всю информацию об изменениях на удаленной ветки.
        subprocess.run('git fetch --all', shell=True, check=True)
        # Принудительно(во всех спорных случая берем данные из удаленной ветки) синхронизируем локальную ветку с удаленной.
        subprocess.run(
            f'git reset --hard {origin}/{select_branch}', shell=True)
        # Выполняем синхронизацию зависимостей в виртуальном окружение `Python`
        syncPyVenvDependents()
    else:
        # Нет различий локальной ветки от удаленной. Или не удалось узнать различий с удаленной веткой, из за отсутствия связи.
        ...


def syncPyVenvDependents():
    """Синхронизация зависимостей для виртуального окружения Python"""
    step3(path_python=path_python, path_server=path_server)
