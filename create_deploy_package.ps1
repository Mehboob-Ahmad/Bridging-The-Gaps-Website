<#
  create_deploy_package.ps1
  Copies project files into a single folder `deploy_package` (timestamped) for easy deployment.

  Usage (PowerShell):
    ./create_deploy_package.ps1

  The script will:
  - create a directory 'deploy_package_<timestamp>' in the repository root
  - copy root static files (INDEX.html, SCRIPT.js, STYLE.css)
  - copy `DOCUMENTS` and `images` folders
  - copy `db.sql`, `nextjs` folder (full Next.js app), and `php` backup (if present)
  - exclude node_modules and .git directories

  After packaging, you can move `deploy_package_<timestamp>` to your deployment host or zip it.
#>

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

function Timestamp() {
  return (Get-Date).ToString('yyyyMMdd-HHmmss')
}

# get timestamp once and build folder name without inline subexpression to avoid parser issues
$timestamp = (Timestamp)
$out = Join-Path $root ("deploy_package_$timestamp")
Write-Host "Creating deploy folder: $out"
New-Item -ItemType Directory -Path $out -Force | Out-Null

# Helper to copy if exists
function Copy-IfExists($src, $destRoot) {
  $srcPath = Join-Path $root $src
  if (Test-Path $srcPath) {
    $dest = Join-Path $destRoot $src
    Write-Host "Copying $src to $dest"
    Copy-Item -Path $srcPath -Destination $dest -Recurse -Force -ErrorAction Stop
  } else {
    Write-Host "Skipping missing: $src"
  }
}

# Copy known roots
Copy-IfExists 'INDEX.html' $out
Copy-IfExists 'INDEX.htm' $out
Copy-IfExists 'INDEX.HTML' $out
Copy-IfExists 'SCRIPT.js' $out
Copy-IfExists 'STYLE.css' $out
Copy-IfExists 'db.sql' $out
Copy-IfExists 'DOCUMENTS' $out
Copy-IfExists 'images' $out

# Copy Next.js app folder
Copy-IfExists 'nextjs' $out

# Copy PHP backup if present
Copy-IfExists 'php' $out

# Remove heavy folders if accidentally copied
Get-ChildItem -Path $out -Recurse -Force | Where-Object { $_.PSIsContainer -and ($_.Name -in @('node_modules','.git','.next')) } | ForEach-Object {
  Write-Host "Removing excluded folder: $($_.FullName)"
  Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Packaging complete. Deploy folder: $out"
Write-Host "You can zip it: Compress-Archive -Path $out -DestinationPath $out.zip"
