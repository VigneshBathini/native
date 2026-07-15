Expo Router is the navigation library recommended for modern Expo apps.


Expo Router	                            React Navigation
File-based routing	                    Manual route configuration
Great for Expo projects	                Works with both Expo and React Native CLI
Less boilerplate	                    More configuration
Built on top of React Navigation	    Core navigation library


Why File-Based Routing?

Let's first see how navigation worked before Expo Router.

React Navigation (Traditional)

You had to manually register every screen.

<Stack.Navigator>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
  />

  <Stack.Screen
    name="Profile"
    component={ProfileScreen}
  />

  <Stack.Screen
    name="Settings"
    component={SettingsScreen}
  />
</Stack.Navigator>

Imagine having 50 screens.

You'll register all 50 manually.

❌ More boilerplate.

❌ Easy to forget adding a screen.

Expo Router

You simply create files.

app/

index.js

profile.js

settings.js

That's it.

Expo Router automatically creates routes.

----------------------------
What is File-Based Routing?

Every file inside the app folder automatically becomes a route.

2. Why is index.js special?

It represents the default route (/) for its folder.

3. What are the advantages of File-Based Routing?
Less configuration
Easier maintenance
Better scalability
4. Can reusable components go inside the app folder?

They can technically exist there, but by convention and for clean architecture, reusable


What is _layout.js?

_layout.js is a special file used to define the navigation layout for all routes inside its folder.

1. Why is it called Stack Navigation?

Because screens are added and removed in Last-In, First-Out (LIFO) order, just like a stack.

2. What does router.push() do?

Adds a new screen to the top of the navigation stack.

3. What does router.back() do?

Removes the current screen and returns to the previous one.

4. Does push() remove the previous screen?

No. It keeps the previous screen in the stack.


----------------
What are Nested Routes?

A nested route means:

A folder inside the app folder creates a nested URL.

Think of folders as categories.

Folder

↓

URL Path

↓

Screens
📂 Example 1

Folder Structure

app/

products/
    index.js
    details.js

Automatically creates:

/products

/products/details

Notice:

The folder name becomes part of the route.


1. What is a Dynamic Route?

A route that contains variable values, allowing one screen to handle many different URLs.

2. Why do we use Dynamic Routes?

To reuse a single screen for different data instead of creating multiple screens.

3. How are Dynamic Routes defined?

Using square brackets.

Example:

[id].js
4. How do you read the parameter?
const { id } = useLocalSearchParams();


Why is id returned as a string instead of a number?

"Because route parameters come from the URL, and URLs are text. If the application needs a numeric value, it should explicitly convert the parameter using Number() or parseInt()."


Route Parameters vs Query Parameters

This is much more useful for production and interviews.

You'll learn:

/products/25

vs

/ products/25?color=red&size=M

Route Params identify a specific resource.

Query Params provide optional information like filters, sorting, or search criteria.

router.push(`/products/${id}`);

than

router.push(`/products/${id}?color=red`);



What is a Protected Route?

A Protected Route is:

A screen that can only be accessed if the user is authenticated.


What is a Navigation Guard?

A Navigation Guard is:

A condition that decides whether navigation to a screen is allowed.


Protected Route	                Navigation Guard
Protects a screen	            Controls navigation to a screen
Usually based on authentication	Can be based on any condition
Example: Orders screen	        Example: Prevent leaving a form with unsaved changes


Protected
if (isLoggedIn) {
   router.push("/checkout");
} else {
   router.push("/login");
}

We're checking a condition before navigation.


Another example:
Navigation

if (isPremiumUser) {
   router.push("/movies");
} else {
   router.push("/upgrade");
}


1. What is a Navigation Guard?

A Navigation Guard checks conditions before allowing navigation to a screen.

2. Is a Navigation Guard only used for authentication?

❌ No.

It can be used for any business rule or condition.

3. What's the difference between a Protected Route and a Navigation Guard?
Protected Route: Protects access to a screen, typically based on authentication.
Navigation Guard: Checks conditions before navigation and can be used for many scenarios like authentication, subscriptions, admin roles, or unsaved changes.

What is Deep Linking?

Deep Linking allows an app to open a specific screen directly from an external link or notification.

What is the difference between a Custom URL Scheme and a Universal Link?

Custom URL Scheme: Uses a custom protocol like myapp:// and only works if the app is installed.

Universal Link/App Link: Uses a normal HTTPS URL and can open either the app (if installed) or the website.


Types of Deep Links (Awareness)
1. Custom URL Scheme

Example:

myapp://profile/25

Only your app understands this scheme.

2. Universal Links / App Links

Example:

https://myapp.com/profile/25

If the app is installed:

↓

Open the app.

If not:

↓

Open the website.

These provide a better user experience and are commonly used in production.

Thinking Deep Linking is only for websites

No.

It's used for:

Notifications
QR Codes
Emails
SMS
Browser Links

Navigation	                              Deep Linking
Starts inside the app	                    Starts outside the app
Triggered by user actions within the app	Triggered by notifications, emails, QR                                        codes, browser links, etc.
Example: router.push("/profile")	        Example: myapp://profile/10