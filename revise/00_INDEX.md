# React Native Complete Interview Notes (2–6 YOE) — Full Depth Edition

This is a 6-part study set compiled and expanded from your zip's notes (`points.md`, `Redux.md`, `ReactQuery.md`, `navigations.md`, `networking.md`, `Prodarch.md`, `Phase4_nativefeatures.md`, `Phase5_Performance.md`, `react-native-cli/1_CLI_foundation.md`, `debug_testing/`, `typescript/fundamentals.md`, and more). Every topic is explained line-by-line with "why," not just "what," plus multiple worked examples and Q&A per section — matching the depth of your original source material rather than a compressed summary.

## Files in this set

| File | Covers |
|---|---|
| **01_Core_Components_and_Hooks.md** | View, Text, StyleSheet, Flexbox, Pressable, TextInput, FlatList, Image, ScrollView, ActivityIndicator, Modal, Switch, KeyboardAvoidingView, SafeAreaView — then full hook deep-dives: useState, useEffect (incl. stale closures), useRef, useMemo, useCallback, React.memo, reference equality, useContext, custom hooks |
| **02_Networking_and_Navigation.md** | Client-server architecture, HTTP methods, fetch() (line-by-line), async/await, Promises (all, allSettled, race, any), Axios + interceptors, full HTTP status code reference, pagination, pull-to-refresh — then Expo Router: file-based routing, `_layout.js`, Stack navigation, dynamic/nested routes, route vs query params, protected routes/guards, deep linking |
| **03_ReactQuery_and_Redux.md** | Server state vs client state, QueryClient, useQuery, queryKey/queryFn, cache/fresh/stale data, **staleTime vs gcTime** (fully explained), background refetch, request deduplication, useMutation, query invalidation, optimistic updates — then Redux Toolkit: store, Provider, slices, actions, payload (with real production examples), useSelector, createAsyncThunk, extraReducers, Redux Persist |
| **04_TypeScript_Architecture_Storage.md** | Full TypeScript fundamentals (types, inference, unions, generics, type vs interface, any vs unknown) — then production folder structures (feature-based architecture), environment variables, the API service-layer pattern, authentication flow — then AsyncStorage vs SecureStore |
| **05_NativeFeatures_Performance_Testing_Debugging.md** | Camera/ImagePicker, FileSystem, Sharing, Notifications (local vs push), Location — then performance: FPS, reconciliation, React.memo/useMemo/useCallback worked together, FlatList optimization, image optimization, accessibility, Error Boundaries (what they do/don't catch), crash reporting — then Jest + React Native Testing Library — then ADB/Logcat debugging and Flipper |
| **06_CLI_Android_Deployment_Architecture.md** | Full RN CLI project structure, Metro vs Babel, Gradle build system (`applicationId`, `versionCode` vs `versionName`, min/target/compileSdk), AndroidManifest.xml, MainActivity.kt & MainApplication.kt internals, APK vs AAB, EAS Build & Play Store/App Store deployment, OTA updates — plus a **bonus** section on React Native's New Architecture (Bridge → JSI/Fabric/TurboModules, Hermes, Yoga) since this was flagged "not started" in your progress notes but is commonly asked at this experience level |

## How to use this set
1. **Don't just read — explain out loud.** For every ⭐ topic, try explaining it to an imaginary interviewer before checking the "Explain every line" breakdown.
2. **Rebuild the worked examples from memory**: Todo list (useState), Login form + API call (fetch/axios), Users list with pagination (FlatList + onEndReached), a Redux counter with a thunk, a React Query screen with staleTime tuning.
3. **Priority topics for a 2–6 YOE interview** (spend the most time here): Flexbox, useState/useEffect/stale closures, FlatList + keyExtractor, React.memo+useMemo+useCallback working together, fetch() error handling (`response.ok`), React Query staleTime vs gcTime, Redux slices/payload/thunks, 401 vs 403, APK vs AAB.
4. Each file ends with its own rapid-fire Q&A — use these as flashcards the night before an interview.

Good luck! 🚀
