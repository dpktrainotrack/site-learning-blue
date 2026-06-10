$files = @(
    'index.html',
    'about.html',
    'contact.html',
    'blogs.html',
    'blog-detail.html',
    'training-list.html',
    'vouchers-list.html',
    'training-brand.html',
    'vouchers-brand.html',
    'detail.html',
    'voucher-details.html',
    'dummy-list.html',
    'training-brand-cisco.html',
    'training-brand-comptia.html',
    'training-brand-isaca.html',
    'training-brand-microsoft.html',
    'training-brand-paloalto.html',
    'training-brand-pega.html'
)

$base = 'd:\project\SLA\siteLearningBlue'

foreach ($file in $files) {
    $path = Join-Path $base $file
    if (-Not (Test-Path $path)) { Write-Host "SKIP (not found): $file"; continue }

    $content = Get-Content $path -Raw -Encoding UTF8

    # 1. Replace hardcoded nav with placeholder (only if placeholder not already present)
    if ($content -match 'id="navbar-placeholder"') {
        Write-Host "navbar already replaced in $file"
    } else {
        # Match from optional navbar comment through </nav>
        $content = [regex]::Replace($content,
            '(?s)(\s*<!--[^\-]*-+\s*(?:MAIN\s+)?NAVBAR[^\-]*-+-->)?\s*<nav class="navbar[^"]*"[^>]*>.*?</nav>',
            "`r`n    <!-- Navbar Placeholder -->`r`n    <div id=`"navbar-placeholder`"></div>")
        Write-Host "navbar replaced in $file"
    }

    # 2. Replace hardcoded footer + whatsapp-float with placeholder
    if ($content -match 'id="footer-placeholder"') {
        Write-Host "footer already replaced in $file"
    } else {
        $content = [regex]::Replace($content,
            '(?s)(\s*<!--[^>]*FOOTER[^>]*-->)?\s*<footer class="site-footer[^"]*"[^>]*>.*?</footer>\s*<a href="https://wa\.me/[^"]*" class="whatsapp-float"[^>]*>.*?</a>',
            "`r`n    <!-- Footer Placeholder -->`r`n    <div id=`"footer-placeholder`"></div>")
        Write-Host "footer replaced in $file"
    }

    # 3. Add include.js before script.js (only if not already present)
    if ($content -match 'assets/js/include\.js') {
        Write-Host "include.js already present in $file"
    } else {
        $content = $content -replace '(<script src="assets/js/script\.js"></script>)',
            "<script src=`"assets/js/include.js`"></script>`r`n    `$1"
        Write-Host "include.js added to $file"
    }

    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Done: $file"
    Write-Host "---"
}

Write-Host 'All files processed.'
