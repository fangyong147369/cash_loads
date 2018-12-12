@echo off 
echo 正在关闭冗余进程，请稍等...... 
taskkill /f /im iexplore.exe 
echo -------------程序初始化完毕，请指示！---------- 
echo. & pause 
:openie 
echo 正在投票，请稍等...... 
start "" "C:\Program Files\Internet Explorer\iexplore.exe" 
echo IE打开完成！ 
ping 127.0.0.1 -n 2 
taskkill /f /im iexplore.exe 
echo 延时2秒关闭投票完成！ 
goto openie 

echo. & pause 