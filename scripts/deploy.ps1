Param(
  [switch]$Prod
)

if (-not (Get-Command -Name vercel -ErrorAction SilentlyContinue)) {
  Write-Host "Vercel CLI not found. Install: npm i -g vercel" -ForegroundColor Yellow
  exit 1
}

if ($Prod) {
  vercel --prod
} else {
  vercel
}
