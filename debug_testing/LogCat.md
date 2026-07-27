https://developer.android.com/tools/

https://medium.com/@aniketindulkar/mastering-adb-unlocking-advanced-android-development-techniques-1cce1b185cba

https://hub.ivanti.com/s/article/How-to-use-Android-ADB-Logging-with-Logcat-on-Android-Studio-4105?language=en_US

ADB Basics
What is ADB?

ADB (Android Debug Bridge) is a command-line tool that allows communication between a computer and an Android device.

Common Commands
adb version

Checks installed ADB version.

adb devices

Lists connected Android devices.

adb shell

Opens the Android shell.

adb shell pm list packages

Lists all installed packages.

adb shell dumpsys package <package_name>

Displays package information.

adb logcat

Starts live log streaming.

adb logcat -c

Clears existing logs.

adb bugreport

Generates a complete device bug report.


LogCat:

Features: 
1.Package Name
2.Logs Level 
3.Tags


Logcat view in Android Studio:

Android Studio-> LogCat -> Left Side Devices name and search filter package:mine current application will displaying in logs

Delete option-> To clear logs
Pause -> to pause the running app logs
Refresh logs
Scroll down
Softwrap-> To wrap logs to line by line instead of horizontally
Import logs file
Export logs file
Modify view
Split View
Camera-> Take Screenshort
Record Screen-> Video capture

1. Package 

Android Studio-> LogCat -> Left Side Devices name and search filter package:mine current application will displaying in logs

Also we have status like I(Info),D(Debug),W(Warning),E(Error)

2. Log Level -> Here in this we can see different level of logs like debugging,error level individually
2.1 Verbose -> Log.v(key,value)
    Here we can see all level of logs 
    by selecting filter with [package:mine level:verbose]
2.2 Debug -> Log.d(key,value)
    Here we can read the debug logs like warning ,error related
    by selecting filter with [package:mine level:debug]
2.3 Info -> Log.i(key,value)
    Here we can read the debug logs like warning ,error related
    by selecting filter with [package:mine level:debug]
2.4 Warning -> Log.w(key,value)
    Here we can read the debug logs like warning ,error related
    by selecting filter with [package:mine level:debug]
2.5 Error -> Log.e(key,value)
    Here we can read the debug logs like warning ,error related
    by selecting filter with [package:mine level:debug]
    -> Exception
    -> Server side error
    -> Api call failure
    -> Crash (null pointer)
    -> ANR (Applicaiton not responding)

2.6 Assert -> Log.assert(key,value)
    Here we can read the assertion related logs 
    by selecting filter with [package:mine level:debug]
2.7 WTF -> What a Terrible Failure
    Log.e(key,value)
    Here we can read the debug logs like warning ,error related
    by selecting filter with [package:mine level:debug]


TAG:

eg:
function getdata(){
    log.d(tag:"getDate",msg:"val")
         //("getData as TAG")
}

by selecting filter with [package:mine level:debug tag:getData]

-------------------------------------------------------------------------------------------

 