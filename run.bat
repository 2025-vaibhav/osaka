@echo off
setlocal

REM Set project directory
set "PROJECT_DIR=C:\Users\tagglabs\Downloads\Threaded_Frequencies_Main"
set "PORT=5173"

REM Check if Node.js is installed
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js and try again.
    pause
    exit /b
)

REM Navigate to project folder
cd /d "%PROJECT_DIR%"

REM Check for node_modules folder to determine if dependencies are already installed
if not exist "node_modules" (
    echo Dependencies not found. Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed. Skipping npm install.
)

REM Check if port is in use
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%PORT%') do (
    set "PID=%%a"
)

IF DEFINED PID (
    echo Port %PORT% is in use by PID %PID%. Attempting to free it...
    taskkill /F /PID %PID% >nul 2>nul
    IF %ERRORLEVEL% EQU 0 (
        echo Successfully killed process using port %PORT%.
    ) ELSE (
        echo Failed to kill process using port %PORT%. You may need admin rights.
        pause
        exit /b
    )
)

REM Start the dev server in background
start "" /B cmd /c "call npm run dev"

REM Wait until the port is actually listening (up to 30 seconds)
set /a counter=0
:waitloop
timeout /t 1 >nul
(setlocal enabledelayedexpansion
for /f "tokens=1-5" %%a in ('netstat -an ^| findstr ":%PORT%"') do (
    endlocal
    goto port_ready
)
)
set /a counter+=1
if %counter% GEQ 30 (
    echo Timeout waiting for server to start on port %PORT%.
    exit /b
)
goto waitloop

:port_ready

REM Open in Chrome kiosk mode
start "" "chrome" --kiosk --full-screen --disable-infobars "http://localhost:%PORT%/"

REM Exit the script
exit
