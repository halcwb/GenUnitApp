@echo off
cls
::Only bootstrap when no paket.exe
if not exist .paket\paket.exe (
	.paket\paket.bootstrapper.exe
	if errorlevel 1 (
	  exit /b %errorlevel%
	)
)
::Update dependencies
.paket\paket.exe restore
if errorlevel 1 (
  exit /b %errorlevel%
)

::Install client files
if exist client\package.json (
	echo "Install npm modules"
	cd client
	call npm install
	cd ..
)

::Build the project
packages\FAKE\tools\FAKE.exe build.fsx %*

