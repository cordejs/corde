rem see https://github.com/coreybutler/nvm-windows/issues/300

@echo off
SETLOCAL EnableDelayedExpansion

if [%1] == [] (
	echo Pass in the version you would like to install, or "latest" to install the latest npm version.
) else (
	set wanted_version=%1

	if "!wanted_version!" == "latest" (
		for /f %%i in ('npm show npm version') do set wanted_version=%%i
	)

	for /f %%i in ('npm -g -v') do set cur_version=%%i

	if "!cur_version!" == "!wanted_version!" (
		echo Already on npm version !wanted_version!.
	) else (
		echo Updating to !wanted_version!...

		set node_path=!PROGRAMFILES!\nodejs

		rename "!node_path!\npm" npm2
		rename "!node_path!\npm.cmd" npm2.cmd
		if exist "!node_path!\npm.ps1" (
			rename "!node_path!\npm.ps1" npm2.ps1
		)
		rename "!node_path!\npx" npx2
		rename "!node_path!\npx.cmd" npx2.cmd
		if exist "!node_path!\npx.ps1" (
			rename "!node_path!\npx.ps1" npx2.ps1
		)
		rename "!node_path!\node_modules\npm" npm2
		
		node "!node_path!\node_modules\npm2\bin\npm-cli.js" i npm@!wanted_version! -g

		for /f %%i in ('npm -g -v') do set new_version=%%i

		echo New version installed is !new_version!

		if "!new_version!" == "!wanted_version!" (
			echo Successfully updated to !wanted_version!. Cleaning up backups...
			del "!node_path!\npm2"
			del "!node_path!\npm2.cmd"
			if exist "!node_path!\npm2.ps1" (
				del "!node_path!\npm2.ps1"
			)
			del "!node_path!\npx2"
			del "!node_path!\npx2.cmd"
			if exist "!node_path!\npx2.ps1" (
				del "!node_path!\npx2.ps1"
			)
			@RD /S /Q "!node_path!\node_modules\npm2"
			echo Update complete.
		) else (
			echo Something went wrong. Rolling back.
			if exist "!node_path!\npm" (
				del "!node_path!\npm"
			)
			if exist "!node_path!\npm.cmd" (
				del "!node_path!\npm.cmd"
			)
			if exist "!node_path!\npm.ps1" (
				del "!node_path!\npm.ps1"
			)
			if exist "!node_path!\npx" (
				del "!node_path!\npx"
			)
			if exist "!node_path!\npx.cmd" (
				del "!node_path!\npx.cmd"
			)
			if exist "!node_path!\npx.ps1" (
				del "!node_path!\npx.ps1"
			)
			if exist "!node_path!\node_modules\npm" (
				@RD /S /Q "!node_path!\node_modules\npm"
			)
			rename "!node_path!\npm2" npm
			rename "!node_path!\npm2.cmd" npm.cmd
			rename "!node_path!\npm2.ps1" npm.ps1
			rename "!node_path!\npx2" npx
			rename "!node_path!\npx2.cmd" npx.cmd
			rename "!node_path!\npx2.ps1" npx.ps1
			rename "!node_path!\node_modules\npm2" npm
		)
	)
)