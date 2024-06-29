@echo off
setlocal

:: Check if input argument is provided
if "%~1"=="" (
    echo Usage: %0 input.mp4
    exit /b 1
)

:: Get the input file name without extension
set "input_file=%~1"
set "folder_name=%~n1"

:: Create the main folder and subdirectories
mkdir "%folder_name%"
mkdir "%folder_name%\low"
mkdir "%folder_name%\medium"
mkdir "%folder_name%\high"

:: Execute FFmpeg commands
ffmpeg -i "%input_file%" -vf scale=1920:1080 -c:v h264 -crf 20 -preset fast -c:a aac -b:a 128k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "%folder_name%\high\segment_%%03d.ts" "%folder_name%\high\output.m3u8"

ffmpeg -i "%input_file%" -vf scale=1280:720 -c:v h264 -crf 20 -preset fast -c:a aac -b:a 128k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "%folder_name%\medium\segment_%%03d.ts" "%folder_name%\medium\output.m3u8"

ffmpeg -i "%input_file%" -vf scale=854:480 -c:v h264 -crf 20 -preset fast -c:a aac -b:a 128k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "%folder_name%\low\segment_%%03d.ts" "%folder_name%\low\output.m3u8"

endlocal
