# Plex Video Fetcher - PowerShell Script
# Double-click to run, or right-click -> Run with PowerShell

# ========== YOUR PLEX CONFIGURATION ==========
$PLEX_SERVER = "http://127.0.0.1:32400"
$PLEX_TOKEN = "3exQDycx7bxQEL7966yR"
$MOVIES_SECTION = 26
$ADULT_SECTION = 21
$CLIENT_SERVER = "http://192.168.1.100:32400"
# ==============================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "         PLEX VIDEO FETCHER" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

function Get-PlexVideos($sectionId, $sectionName, $isAdult) {
    $url = "$PLEX_SERVER/library/sections/$sectionId/all?X-Plex-Token=$PLEX_TOKEN"
    Write-Host "Fetching $sectionName..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
        $xml = $response.Content
        
        $videos = @()
        $matches = [regex]::Matches($xml, 'ratingKey="(\d+)"[^>]*title="([^"]+)"')
        
        $count = 0
        $total = $matches.Count
        
        foreach ($match in $matches) {
            $id = $match.Groups[1].Value
            $title = $match.Groups[2].Value
            $count++
            
            Write-Host "  [$count/$total] Getting direct URL for: $title" -ForegroundColor Gray
            
            # Fetch metadata to get the direct file URL
            $metaUrl = "$PLEX_SERVER/library/metadata/$id`?X-Plex-Token=$PLEX_TOKEN"
            try {
                $metaResponse = Invoke-WebRequest -Uri $metaUrl -UseBasicParsing -TimeoutSec 10
                $metaXml = $metaResponse.Content
                
                # Extract Part key for direct playback
                $partMatch = [regex]::Match($metaXml, 'Part id="(\d+)"[^>]*key="([^"]+)"')
                if ($partMatch.Success) {
                    $partKey = $partMatch.Groups[2].Value
                    $directUrl = "$CLIENT_SERVER$partKey`?X-Plex-Token=$PLEX_TOKEN"
                    $videoType = "mp4"
                } else {
                    # Fallback to transcode URL if no Part found
                    $directUrl = "$CLIENT_SERVER/video/:/transcode/universal/start.m3u8?path=%2Flibrary%2Fmetadata%2F$id&mediaIndex=0&partIndex=0&protocol=hls&X-Plex-Token=$PLEX_TOKEN"
                    $videoType = "hls"
                }
            }
            catch {
                # Fallback to transcode URL on error
                $directUrl = "$CLIENT_SERVER/video/:/transcode/universal/start.m3u8?path=%2Flibrary%2Fmetadata%2F$id&mediaIndex=0&partIndex=0&protocol=hls&X-Plex-Token=$PLEX_TOKEN"
                $videoType = "hls"
                Write-Host "    Warning: Could not get direct URL, using transcode" -ForegroundColor Yellow
            }
            
            $videos += @{
                id = "plex_${sectionId}_$id"
                name = $title
                title = $title
                description = "Plex video from $sectionName library"
                url = $directUrl
                thumb = "$CLIENT_SERVER/library/metadata/$id/thumb?X-Plex-Token=$PLEX_TOKEN"
                type = $videoType
                category = if ($isAdult) { "adult" } else { "movie" }
                adult = $isAdult
                isAdult = $isAdult
                streamingMode = "on-demand"
                sectionId = $sectionId
                ratingKey = $id
            }
        }
        
        Write-Host "Found $($videos.Count) videos in $sectionName" -ForegroundColor Green
        return $videos
    }
    catch {
        Write-Host "Error fetching $sectionName : $_" -ForegroundColor Red
        return @()
    }
}

# Fetch both libraries
$movies = Get-PlexVideos $MOVIES_SECTION "Movies" $false
$adult = Get-PlexVideos $ADULT_SECTION "Adult" $true

# Convert to JSON
$moviesJson = if ($movies.Count -gt 0) { $movies | ConvertTo-Json -Compress -Depth 3 } else { "[]" }
$adultJson = if ($adult.Count -gt 0) { $adult | ConvertTo-Json -Compress -Depth 3 } else { "[]" }

# Fix single item arrays
if ($movies.Count -eq 1) { $moviesJson = "[$moviesJson]" }
if ($adult.Count -eq 1) { $adultJson = "[$adultJson]" }

# Create HTML loader file
$html = @"
<!DOCTYPE html>
<html>
<head>
    <title>Plex Data Loader</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: white; padding: 40px; text-align: center; }
        .success { color: #4caf50; font-size: 28px; margin: 20px 0; }
        .count { color: #2196f3; font-size: 20px; margin: 10px 0; }
        .instruction { color: #ff9800; margin-top: 30px; padding: 20px; background: rgba(255,152,0,0.1); border-radius: 10px; display: inline-block; }
    </style>
</head>
<body>
    <h1>Plex Data Loader</h1>
    <div class="success">Data Loaded Successfully!</div>
    <div class="count">Movies: $($movies.Count) videos</div>
    <div class="count">Adult: $($adult.Count) videos</div>
    
    <div class="instruction">
        <h3>Done! Now:</h3>
        <p>1. Close this tab</p>
        <p>2. Open <strong>client_v5.html</strong></p>
        <p>3. Your videos will appear!</p>
    </div>
    
    <script>
        localStorage.setItem('plexMoviesCache', '$($moviesJson -replace "'", "\'")');
        localStorage.setItem('plexAdultCache', '$($adultJson -replace "'", "\'")');
        localStorage.setItem('plexConfig', JSON.stringify({
            serverUrl: '$CLIENT_SERVER',
            token: '$PLEX_TOKEN',
            sections: { movies: $MOVIES_SECTION, adult: $ADULT_SECTION },
            lastUpdate: new Date().toISOString()
        }));
        console.log('Plex data saved to localStorage');
        console.log('Movies:', $($movies.Count));
        console.log('Adult:', $($adult.Count));
    </script>
</body>
</html>
"@

$outputFile = "plex_data_loader.html"
$html | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "SUCCESS!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Created: $outputFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor White
Write-Host "1. Open 'plex_data_loader.html' in your browser" -ForegroundColor White
Write-Host "2. Then open 'client_v5.html'" -ForegroundColor White
Write-Host "3. Videos will appear in Movies and Adult sections!" -ForegroundColor White
Write-Host ""

# Auto-open the file
$response = Read-Host "Open plex_data_loader.html now? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Start-Process $outputFile
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
