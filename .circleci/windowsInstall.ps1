#  Ensure Get-ExecutionPolicy is not Restricted
# See https://chocolatey.org/docs/installation

$policy = iex Get-ExecutionPolicy

if($policy -eq "Restricted") {
    Set-ExecutionPolicy AllSigned
}

if (!(Get-Command choco.exe -ErrorAction SilentlyContinue)) {
   Write-Host "Chocolatey is not installed. Installing..."
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

iex "choco install circleci-cli -y"
Write-Host "Press any key to continue ..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")