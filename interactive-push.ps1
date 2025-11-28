<#
interactive-push.ps1
Interactive push script that prompts for GitHub credentials and pushes to remote.
This script does NOT store your PAT. It uses the PAT interactively for the push.
#>
param(
  [string]$RepoUrl = "https://github.com/qusaimusleh2011-crypto/ai-video-editor.git",
  [string]$LocalPath = "C:\Users\halam\Documents\GitHub\ai-video-editor"
)

Set-Location -Path $LocalPath

# Ensure .gitignore contains common ignores
$gitignorePath = Join-Path $LocalPath ".gitignore"
if (-not (Test-Path $gitignorePath)) {
  @"
node_modules/
.next/
.env
/dist/
/public/uploads/
"@ | Out-File -FilePath $gitignorePath -Encoding UTF8
  Write-Host "Created .gitignore" -ForegroundColor Green
} else {
  $gi = Get-Content $gitignorePath -Raw
  $required = @("node_modules/", ".next/", ".env", "/dist/", "/public/uploads/")
  $changed = $false
  foreach ($r in $required) {
    if ($gi -notmatch [regex]::Escape($r)) { $gi += "`n$r"; $changed = $true }
  }
  if ($changed) { $gi | Out-File -FilePath $gitignorePath -Encoding UTF8; Write-Host "Updated .gitignore" -ForegroundColor Green }
}

# Initialize git if needed
if (-not (Test-Path (Join-Path $LocalPath ".git"))) {
  git init
  git remote add origin $RepoUrl
  Write-Host "Initialized git and added remote $RepoUrl" -ForegroundColor Cyan
} else {
  # Ensure remote exists and points to the expected URL
  $currentRemote = git remote get-url origin 2>$null
  if ($currentRemote -ne $RepoUrl) {
    git remote remove origin 2>$null
    git remote add origin $RepoUrl
    Write-Host "Reset origin remote to $RepoUrl" -ForegroundColor Cyan
  }
}

# Stage and commit
git add --all
if ((git status --porcelain) -ne "") {
  git commit -m "feat: ClipSpark AI video editor - initial release" 2>$null
  Write-Host "Committed changes locally." -ForegroundColor Green
} else {
  Write-Host "No changes to commit." -ForegroundColor Yellow
}

# Prompt for credentials (PAT)
$githubUser = Read-Host "Enter your GitHub username (e.g. qusaimusleh2011-crypto)"
$secureToken = Read-Host "Enter your GitHub Personal Access Token (PAT)" -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken))

# Perform push using temporary in-memory credentials via URL
# Note: this will prompt git to use the token as password. We craft an https URL with the username and token temporarily.
$pushUrl = $RepoUrl -replace '^https://','https://' + ($githubUser + ':' + $ptr + '@')

Write-Host "Pushing to remote..." -ForegroundColor Cyan
try {
  git push $pushUrl main:main -u
  Write-Host "Push complete." -ForegroundColor Green
} catch {
  Write-Host "Push failed: $_" -ForegroundColor Red
}

# Clear token from memory
$ptr = $null
$secureToken.Dispose()

Write-Host "Done. If push succeeded, visit: $RepoUrl" -ForegroundColor Green
