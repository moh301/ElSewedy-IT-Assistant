@echo off
title SWE IT Assist - Startup
color 0A

echo ==========================================
echo        SWE IT Assist - Starting...
echo ==========================================
echo.

REM ==========================================
REM Start Apache
REM ==========================================
echo [1/4] Starting Apache...
start "" "C:\xampp\apache_start.bat"

timeout /t 2 /nobreak >nul

REM ==========================================
REM Start MySQL
REM ==========================================
echo [2/4] Starting MySQL...
start "" "C:\xampp\mysql_start.bat"

timeout /t 2 /nobreak >nul

REM ==========================================
REM Start FastAPI / Gemini Backend
REM ==========================================
echo [3/4] Starting FastAPI backend...

cd /d "C:\xampp\htdocs\ElSewedy-IT-Assistant\chatbot-backend"

start "SWE IT Assist - FastAPI" cmd /k "venv\Scripts\activate && uvicorn main:app --reload"

timeout /t 4 /nobreak >nul

REM ==========================================
REM Open Website
REM ==========================================
echo [4/4] Opening SWE IT Assist...

start "" "http://localhost/ElSewedy-IT-Assistant/"

echo.
echo ==========================================
echo       SWE IT Assist is running!
echo ==========================================
echo.
echo Apache  : Running
echo MySQL   : Running
echo FastAPI : Running
echo Website : Opened
echo.
echo You can close this window.
echo ==========================================

exit