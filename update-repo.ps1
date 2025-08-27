# Script para actualizar referencias del repositorio
# Uso: .\update-repo.ps1 "TU-NUEVO-USUARIO" "nombre-del-nuevo-repo"

param(
    [Parameter(Mandatory=$true)]
    [string]$NuevoUsuario,
    
    [Parameter(Mandatory=$true)]
    [string]$NuevoRepo
)

Write-Host "🔄 Actualizando referencias del repositorio..." -ForegroundColor Green

# Archivos a actualizar
$archivos = @(
    "Khanware.js",
    "README.md", 
    "quick-link.txt",
    "linkGenerator.html",
    "functions\questionSpoof.js",
    "visuals\mainMenu.js"
)

foreach ($archivo in $archivos) {
    if (Test-Path $archivo) {
        Write-Host "📝 Actualizando $archivo" -ForegroundColor Yellow
        
        # Reemplazar referencias
        (Get-Content $archivo -Raw) -replace "CasanovaProyects/mi-khanware", "$NuevoUsuario/$NuevoRepo" |
        Set-Content $archivo -NoNewline
        
        (Get-Content $archivo -Raw) -replace "CasanovaProyects", $NuevoUsuario |
        Set-Content $archivo -NoNewline
    }
}

Write-Host "✅ Referencias actualizadas exitosamente!" -ForegroundColor Green
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. git remote remove origin"
Write-Host "2. git remote add origin https://github.com/$NuevoUsuario/$NuevoRepo.git"
Write-Host "3. git add ."
Write-Host "4. git commit -m 'Migración a nuevo repositorio'"
Write-Host "5. git push -u origin main"
