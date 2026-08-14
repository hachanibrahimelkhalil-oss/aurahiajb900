@echo off
cd /d "%~dp0"
where php >nul 2>&1
if %errorlevel%==0 goto PHP
where python >nul 2>&1
if %errorlevel%==0 goto PYTHON
echo.
echo PHP ou Python n'est pas installe.
echo Installez PHP pour utiliser l'espace admin securise.
pause
exit /b 1
:PHP
echo AURA-HIJAB - serveur PHP sur http://localhost:8000
start "" http://localhost:8000/
php -S localhost:8000
exit /b
:PYTHON
echo ATTENTION: Python lance le site, mais l'authentification PHP admin ne fonctionnera pas.
start "" http://localhost:8000/
python -m http.server 8000
