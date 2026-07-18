Permissions:

Types of Permissions

Some common permissions:

Permission          	Used For
Camera	                Take photos
Media Library	        Pick images
Microphone	            Audio recording
Location	            Maps
Notifications	        Push notifications
Contacts	            Contact list

Expo Permission Pattern

Almost every Expo package follows the same API.

Example:

const { status } = await Camera.requestCameraPermissionsAsync();

or

const { status } =
await ImagePicker.requestMediaLibraryPermissionsAsync();

or

await Location.requestForegroundPermissionsAsync();

Notice:

request____PermissionsAsync()

Almost every package uses this naming convention


-----------------------

Image Picker

A native feature that allows users to select existing images or videos from their device's gallery.

Media Library Permission

User approval that allows an app to access photos and videos stored on the device.

Asset

The selected file returned by the Image Picker API. It contains information such as URI, width, height, file name, and MIME type.


Install expo-image-picker.
Request gallery permission using requestMediaLibraryPermissionsAsync().
Open the gallery with launchImageLibraryAsync().
Always check result.canceled.
Access the selected image using result.assets[0].
Validate image size and type before uploading.
Place reusable picker logic inside a custom hook or utility.


Install expo-file-system.
Use documentDirectory for permanent files.
Use cacheDirectory for temporary files.
Download files with downloadAsync().
Check file details with getInfoAsync().
Delete files using deleteAsync().
Keep file logic inside a reusable service.

Sharing

A native feature that allows an application to send files or content to another application installed on the device.

Share Sheet

The native popup shown by Android or iOS that lists apps capable of handling the shared content.

URI

The local path of the file that will be shared.

Revision Notes
Install expo-sharing.
Check support with isAvailableAsync().
Verify the file exists.
Share using shareAsync(fileUri).
Keep sharing logic reusable.
Use appropriate MIME types.

--------------------------------

Definition First
Notification

A message displayed by the operating system to inform the user about an event, even when the app is in the background or closed.

Local Notification

A notification created directly by the application on the device without requiring a server.

Example:

Reminder after 10 minutes
Push Notification

A notification sent from a backend server through a notification service like Firebase Cloud Messaging (FCM) or Apple Push Notification service (APNs).

Example:

Your order has been shipped.
Notification Permission

The user's approval allowing an application to display notifications.

npx expo install expo-notifications

📝 Quick Definitions
Notification

A system message shown to the user.

Local Notification

Created by the application.

Push Notification

Sent from the backend.

Trigger

Determines when the notification appears.

Content

The information displayed inside the notification.

📄 Revision Notes
Install expo-notifications.
Request permission with requestPermissionsAsync().
Configure notification behavior using setNotificationHandler().
Schedule notifications with scheduleNotificationAsync().
Use content for title, body, and data.
Use trigger to define when the notification appears.
Listen for notification taps using addNotificationResponseReceivedListener().

📝 Quick Definitions
Location

The geographical position of a device.

Latitude

North-South coordinate.

Longitude

East-West coordinate.

Reverse Geocoding

Converts coordinates into a readable address.

Foreground Location

Location access while the app is open.

Background Location

Location tracking while the app is in the background.

📄 Revision Notes
Install expo-location.
Request permission using requestForegroundPermissionsAsync().
Get coordinates using getCurrentPositionAsync().
Read values from location.coords.
Convert coordinates to an address using reverseGeocodeAsync().
Use appropriate GPS accuracy levels.
Keep location logic inside reusable services.


Deep Link

A URL that opens a specific screen inside a mobile application instead of just launching the app.

Custom URL Scheme

A custom protocol (for example myapp://) used to open your app.

Example:

myapp://profile
Universal Link (iOS) / App Link (Android)

A normal HTTPS URL that opens your app if installed, otherwise opens the website.

Example:

https://myapp.com/profile

