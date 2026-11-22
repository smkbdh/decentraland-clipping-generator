$ErrorActionPreference = "Stop"

$blenderPath = "C:\Program Files\Blender Foundation\Blender 5.3\blender.exe"
$blendFile = "D:\Buddah\AI_BUDDAH_MASTER.blend"
$framesDir = "D:\Buddah\reel_render_frames"
$outputVideo = "D:\Buddah\AI_BUDDAH_MASTER_ANIMATION.mp4"

Write-Host ">>> [1/2] RENDERING 270 FRAMES (1080x1920 @ 30 FPS) IN BLENDER EEVEE NEXT <<<"
& $blenderPath -b $blendFile -S "Scene" -s 1 -e 270 -a

Write-Host ">>> [2/2] COMPILING FRAMES TO MP4 VIA FFMPEG (H.264 High Profile, CRF 17) <<<"
ffmpeg -y -r 30 -i "$framesDir\frame_%04d.png" -c:v libx264 -pix_fmt yuv420p -preset medium -crf 17 $outputVideo

Write-Host ">>> VIDEO RENDER COMPLETE: $outputVideo <<<"
Get-Item $outputVideo | Select-Object -Property Name, Length, LastWriteTime
