Correct! B

Exactly. The UPI ecosystem facilitates communication between participating banks. The sender's bank processes the debit, and the receiver's bank processes the credit.

A useful distinction:

- **BHIM:** User-facing UPI application.
- **NPCI:** Operates the UPI payment infrastructure.
- **Banks:** Maintain customer accounts and process account-level transactions.

# **Your NPCI BHIM preparation roadmap**

Here is our current progress, including what we have covered and what remains.

## **Preparation progress**

**Phase 1 — Payment fundamentals**

Covered

- UPI transaction flow
- Payment gateway responsibilities
- Debit and credit logic
- Transaction states and lifecycle
- Failed vs reversed transactions

**Phase 2 — Payment reliability**

Covered basics

- Idempotency keys
- Duplicate payment prevention
- Network timeout handling
- Pending transactions
- Retry handling

**Phase 3 — Database and SQL**

Covered basics

- ACID properties
- COMMIT and ROLLBACK
- Conditional debit
- Insufficient balance handling
- Atomic debit and credit

**Phase 4 — React Native and API integration**

Needs practice

- Payment API integration
- Authentication tokens
- Request validation
- Loading and error states
- Secure retries and status polling

**Phase 5 — Advanced payment scenarios**

Pending

- Webhooks and callbacks
- Reconciliation
- Concurrent payment requests
- Race conditions
- Transaction consistency

**Phase 6 — Technical and coding questions**

Pending / revision

- API security and SQL injection
- Thread pools and connection pools
- Java and ExecutorService concepts
- Git and Linux
- Queue using linked list
- Unique characters and debit/credit coding
- Aptitude practice

## **Preparation priority**

Our order of focus will be:

1. Payment and UPI scenarios.
2. React Native payment API integration.
3. SQL transactions and payment consistency.
4. API security and authentication.
5. NPCI products and technical fundamentals.
6. Coding and aptitude.

Your earlier mock score was **37/80**. Your payment architecture answer was your strongest area at **20/20**. We'll build on that strength while improving the weaker areas.&#x20;

## **Next question — Advanced payment scenario**

A user taps Pay twice almost simultaneously.

Both requests reach the backend with the same payment ID before either request finishes processing.

What is the biggest technical risk?

A. Both requests will automatically be rejected by React Native.

B. Both requests may process the debit concurrently, causing a duplicate payment.

C. MySQL will automatically merge both transactions.

D. The payment will always become successful.

**Choose your answer.**

We'll continue one question at a time, focusing on realistic payment scenarios.

If you'd like a fresh NPCI payment scenario each day, I can also arrange a daily practice session.

💳Daily NPCI payment practiceTap to set up


-----------------------------------------------------------------------------------
next

NPCI BHIM preparation — Progress report
Mock Test 2
30/30
Correct answers
100%
Accuracy

Completed
All 30 MCQs answered correctly.

1. Overall preparation history
Practice	Score	Status
Mock Test 1	37/80 (46.25%)	Completed
Mock Test 2	30/30 (100%)	Completed

Mock Test 1 highlighted weaknesses in JavaScript event loop and DSA. Mock Test 2 showed excellent performance across JD-aligned and payment-related MCQs. 
2. Topic-wise progress
Topic	Progress	Assessment
React Native fundamentals	Strong	Good
React Native architecture	Strong	Good
Payment / UPI scenarios	Strong	Good
API integration and security	Strong	Good
JavaScript ES6 / Event loop	Practise	Needs coding
TypeScript	Good	More practice
RxJS	Practise	Basics covered
Jest	Practise	Basics covered
SQL / Transactions	Strong	Good
DSA / Problem solving	Practise	Needs coding
Git	Practise	Rebase/merge covered
Jenkins / CI/CD / Gradle	Practise	Fundamentals covered
Android / iOS native	Pending	Not deeply covered
Docker / Kubernetes	Pending	Not covered deeply
SonarQube / Checkmarx	Pending	Not covered deeply

3. Payment preparation
Good progress
You have practised:
- UPI transaction lifecycle.
- Debit, credit, rollback and reversal.
- Idempotency and duplicate-payment prevention.
- Payment timeouts and status enquiry.
- HTTP 202, 503 and retry strategies.
- Concurrent debit protection.
- Authentication, authorization and SQL injection.
- Payment status refresh after app backgrounding.
4. Remaining preparation roadmap
1. Timed JavaScript coding
   
   Two Sum, second-largest distinct number, unique characters, arrays, strings, Map and Set.
2. React Native practical coding
   
   Payment API integration, loading/error states, retries, AppState and component architecture.
3. Advanced payment scenarios
   
   Webhooks, reconciliation, duplicate requests, transaction state management and failure recovery.
4. TypeScript, RxJS and Jest
   
   Practical implementation and testing.
5. Mobile architecture and native fundamentals
   
   Android/iOS basics, HLD/LLD and performance.
6. CI/CD and security tooling
   
   Git, Jenkins, Docker, Kubernetes, Gradle, SonarQube and Checkmarx.
5. Readiness assessment
Not yet validated through coding
Area	Current view
Payment concepts	Strong
React Native concepts	Good
Technical MCQs	Excellent in Mock Test 2
JavaScript coding	Needs more practice
DSA coding	Needs more practice
Practical implementation	Not yet validated

My recommendation: Focus on coding now rather than doing another large MCQ set. Your goal is to be ready for the 90-minute HackerRank assessment, not just to score well on theory questions.
6. Next session
Timed practical round
- 90-minute target
- JavaScript coding
- React Native payment implementation
- Payment failure scenario
- Architecture and security
Saved checkpoint: Mock Test 2 completed, 30/30.
Start next practice round

---------------------------
# **UPI & Payment Architecture — Progress Report**

Since you have only **1 day**, let's switch from the normal learning pace to a focused revision and practical preparation plan.

You've completed the UPI fundamentals lessons from 1.1 to 1.10. Your answers to all 11 knowledge checks so far have been correct.

**Current progress**

Good progress

# **10 / 11**

Concepts covered out of the 11 lessons introduced so far. Lesson 1.11 is pending.

**Knowledge checks:** 11 correct answers so far.

## **1. Completed topics**

| Topic                            | Status     |
| -------------------------------- | ---------- |
| UPI — Unified Payments Interface | Learned    |
| NPCI — UPI network operator      | Learned    |
| PSP Bank                         | Learned    |
| TPAP                             | Learned    |
| Payer and Payee                  | Learned    |
| Remitter and Beneficiary Bank    | Learned    |
| VPA — Virtual Payment Address    | Learned    |
| UPI PIN                          | Learned    |
| P2P and P2M                      | Learned    |
| UPI Intent                       | Learned    |
| Payment callback verification    | Introduced |

**Still to complete:** Payment Gateway (Lesson 1.11).

## **2. Pending topics — priority order**

These are the remaining topics I recommend covering. I've arranged them by importance for a React Native payment-related role.



High priority

**A. UPI and payment concepts**



| Pending topic              | What you need to understand                |
| -------------------------- | ------------------------------------------ |
| Payment Gateway / Provider | Razorpay, Cashfree, PayU; provider vs NPCI |
| UPI Intent vs QR           | Differences and payment initiation         |
| Collect vs Intent          | How payment requests work                  |
| UPI transaction lifecycle  | Initiated, pending, success, failed        |
| Deep Linking               | Returning from UPI app to your app         |
| Payment callback           | Handling response and app reopening        |



High priority

**B. React Native implementation**



| Pending topic          | What you need to practise                       |
| ---------------------- | ----------------------------------------------- |
| Linking API            | Open UPI apps using a payment URI               |
| Deep Links             | Receive the response in your app                |
| AppState               | Detect return from another app                  |
| Error handling         | App not installed, cancellation, timeout        |
| Expo Development Build | Why Expo Go may not support native payment SDKs |
| Payment screen         | Amount, loading, status and retry UI            |



High priority

**C. Node.js backend and payment processing**



| Pending topic             | What you need to understand             |
| ------------------------- | --------------------------------------- |
| Payment API               | Create payment request                  |
| Order ID / Transaction ID | Track individual payments               |
| Payment verification      | Verify with provider from backend       |
| Webhooks                  | Receive payment status updates          |
| Webhook signature         | Verify that notifications are authentic |
| MySQL transactions        | Safely update order and payment records |



Important

**D. Advanced payment concepts**



- Idempotency — prevent duplicate payments or order processing.
- Retry mechanism — safely handle temporary failures.
- Timeout handling — what happens when a response is delayed?
- Reconciliation — compare merchant and provider transaction records.
- Race conditions — handle multiple payment updates safely.
- Security — protect API secrets and sensitive information.
- Payment states — handle pending payments that later become successful or failed.

## **3. Your one-day study plan**

Since it is already evening, use this as a focused plan rather than trying to master every topic.

## **One-day crash plan**

1. **Block 1 — UPI fundamentals**

   Mostly completed

   30 minutes: revise NPCI, PSP, TPAP, VPA, UPI PIN, P2P/P2M and payer/payee.
2. **Block 2 — Payment architecture**

   60 minutes: payment gateway, UPI Intent, QR, collect flow, transaction lifecycle.
3. **Block 3 — React Native**

   90 minutes: Linking, deep linking, AppState, Android intents, Expo Development Build.
4. **Block 4 — Backend**

   90 minutes: Express payment APIs, provider integration, webhook, signature verification and MySQL.
5. **Block 5 — Advanced concepts**

   60 minutes: idempotency, retries, timeout, reconciliation, duplicate requests and security.
6. **Block 6 — Practical implementation and revision**

   90 minutes: design a complete payment flow, write a small implementation and revise technical questions.

## **4. Practical project you should be able to explain**

Build or at least design this small payment demo:

**React Native Expo + Node.js + Express + MySQL**

**React Native Payment Screen**

Enter amount and click Pay

**Node.js Backend**

Create order and payment request

**Payment Provider Sandbox**

Simulate payment processing

**Backend Verification**

Verify provider response or webhook

**MySQL**

Store verified payment status

You do not need a production NPCI integration for this demo. Use an authorized provider's sandbox.

## **5. What you should be able to answer by the end**

- Explain the complete UPI architecture.
- Explain how UPI Intent works in React Native.
- Explain how your app returns from a UPI application.
- Explain why a mobile callback cannot be trusted as final payment proof.
- Explain how backend verification and webhooks work.
- Explain how to handle pending, failed and successful payments.
- Explain how to prevent duplicate payment processing.
- Explain how Expo Go differs from a Development Build for native integrations.

## **6. Let's continue from where we stopped**

We should not restart the completed lessons. Next is **Lesson 1.11 — Payment Gateway / Provider**, followed by the payment architecture flow.

My recommendation: Spend less time memorising definitions and more time understanding the complete transaction flow. That will help you explain the architecture and write practical React Native code.

I can take you through the remaining lessons one at a time, with short explanations, code examples and quick knowledge checks.

-----------------------------------------
Concept	Current status
React Native fundamentals	Revise
New Architecture	Know – revise scenarios
JavaScript ES6	Revise
TypeScript	New / assess
RxJS	New
Jest	Revise
HLD and LLD	New
Android native integration	New / assess
iOS native integration	New / assess
Threads and performance	In progress
Jenkins	New / assess
Docker and Kubernetes	New / assess
Gradle, Maven, Groovy	New / assess
SonarQube and Checkmarx	New
Git and code reviews	Revise
Secure coding	Revise
UPI and payment architecture	Know – practise scenarios

------------
We'll prioritise:
- Must understand: React Native, JavaScript, TypeScript, RxJS, performance, architecture and testing.
- Understand the basics: HLD/LLD, native integration, security and payment architecture.
- Awareness level: Jenkins, Docker, Kubernetes, Gradle, Maven, Groovy, SonarQube and Checkmarx.

------------------------------------------------------------










Correct!

**B. Code signing verifies app authenticity and establishes trust for future app updates.**

Android apps must be digitally signed before distribution.

- Debug builds → Usually signed with a debug key.
- Release builds → Signed with a release key.
- Google Play → Uses app signing to manage distribution signing.

# **NPCI React Native Preparation – Progress Tracker**

Based on our discussions across the preparation sessions, here is the consolidated status.

# **Preparation progress**

# **Practised**

Concepts covered through explanations and questions

# **Pending**

Topics requiring deeper learning or revision

**Important:** Practised does not mean mastered. We still need scenario-based questions and coding exercises.

## **1. React Native fundamentals and New Architecture**

Covered – revise

- React Native architecture
- Legacy Bridge
- JSI (JavaScript Interface)
- Fabric renderer
- TurboModules
- Codegen
- Bridgeless Mode
- JavaScript thread
- UI/Main thread
- Shadow thread
- JS thread blocking
- FlatList optimization
- React.memo, useMemo, useCallback
- React Native lifecycle basics

**Pending:**

- Practical performance profiling
- Advanced FlatList optimization
- Native performance debugging
- Memory leaks and debugging tools

## **2. JavaScript and TypeScript**

Practised

- ES6 concepts
- let, const, var
- Closures and hoisting
- Promises and async/await
- Event loop
- Microtasks and macrotasks
- Promise.all, race, any
- Array methods
- Shallow copy vs deep copy
- TypeScript basics
- Interfaces and types
- Generics

**Pending:**

- Error handling and edge cases
- Advanced TypeScript
- Practical coding problems
- More revision of asynchronous JavaScript

## **3. RxJS**

Needs attention

- Observable basics
- Observer and Subscription
- debounceTime
- Basic operator understanding

**Pending:**

- switchMap
- mergeMap
- concatMap
- exhaustMap
- Subject and BehaviorSubject
- catchError
- retry
- unsubscribe and memory leaks
- Practical API search examples

This is an important JD requirement.

## **4. Native integration and mobile concepts**

Practised

- Native Modules
- Android BiometricPrompt
- iOS LocalAuthentication
- Secure storage
- Deep linking
- Android App Links
- iOS Universal Links
- AppState
- Foreground/background lifecycle

**Pending:**

- Native Android Java/Kotlin basics
- iOS Swift/Objective-C basics
- Native module implementation
- Permissions and platform-specific handling
- Native debugging

## **5. Mobile and payment security**

Practised

- HTTPS / TLS
- SSL certificate pinning
- Secure token storage
- API secret management
- UPI PIN protection
- MITM attacks
- Authentication vs Authorization
- JWT
- Access token vs Refresh token
- OWASP
- SQL Injection
- Parameterized queries
- Payment verification
- Idempotency keys

**Pending:**

- Payment lifecycle architecture
- Webhook verification
- Token rotation and expiration scenarios
- Secure API implementation
- UPI transaction failure and retry scenarios

## **6. DevOps and Android build tools**

Practised

| Topic                  | Status    |
| ---------------------- | --------- |
| Jenkins / CI/CD        | Practised |
| Docker                 | Practised |
| Kubernetes             | Practised |
| Gradle                 | Practised |
| Maven                  | Practised |
| SonarQube              | Practised |
| APK / AAB              | Practised |
| R8 / ProGuard          | Practised |
| Debug / Release builds | Practised |
| Android code signing   | Practised |

**Pending:**

- Jenkins pipeline practical understanding
- Dockerfile and docker-compose
- Kubernetes Pods, Deployments and Services revision
- Groovy basics
- Checkmarx
- Git branching, merging and conflict resolution
- Gradle build troubleshooting

## **7. Remaining major topics from NPCI JD**

High priority

| Topic                                 | Status  |
| ------------------------------------- | ------- |
| Jest and React Native Testing Library | Pending |
| HLD – High-Level Design               | Pending |
| LLD – Low-Level Design                | Pending |
| RxJS advanced operators               | Pending |
| Native Android/iOS coding             | Pending |
| State management and Redux            | Revise  |
| Performance profiling                 | Pending |
| Checkmarx                             | Pending |
| Groovy                                | Pending |
| Git advanced workflows                | Revise  |

## **Recommended next learning order**

Given the NPCI Senior React Native Developer JD, I suggest:

1. **Jest and React Native Testing Library**

   Unit testing, component testing, mocking APIs.
2. **RxJS revision**

   switchMap, mergeMap, concatMap, exhaustMap.
3. **HLD and LLD**

   Payment app architecture, component design, API flow.
4. **Native Android and iOS**

   Java/Kotlin, Swift, native modules.
5. **Performance and debugging**

   Profiling, memory leaks, Flipper alternatives, Logcat.
6. **DevOps remaining topics**

   Groovy, Checkmarx, Git and Jenkins pipeline.
7. **Final revision**

   Project explanation, practical scenarios and technical questions.

## **Let's continue**

We have completed the basic DevOps tool questions. One remaining important topic is Checkmarx.

**Next question: What is Checkmarx mainly used for?**

A. Automating Android APK builds.

B. Static Application Security Testing (SAST) to identify security vulnerabilities in source code.

C. Managing Docker containers.

D. Managing React Native navigation.

We'll continue with your preferred approach: **Learn → Tiny example → Tricky check → Move to next topic.**

-----------------------------
## **NPCI React Native preparation – Current progress**

You've covered a good range of React Native testing concepts. Here's the updated tracker.

### **1. Testing topics**

| Topic                                   | Current status |
| --------------------------------------- | -------------- |
| Jest fundamentals                       | Practised      |
| Unit vs Integration testing             | Practised      |
| React Native Testing Library            | Practised      |
| API mocking – success/failure           | Practised      |
| Async testing – `waitFor()`             | Practised      |
| Snapshot testing                        | Practised      |
| Code coverage                           | Practised      |
| User interactions – `fireEvent.press()` | Practised      |
| Loading and error states                | Practised      |
| `getByText()`                           | Practised      |
| `queryByText()`                         | Practised      |
| `findByText()`                          | Practised      |
| `beforeEach()`                          | Needs revision |
| `afterEach()`                           | Needs revision |
| `beforeAll()`                           | Needs revision |
| `afterAll()`                            | Needs revision |

### **2. Important concepts to revise**

**Jest lifecycle methods**

| Method         | Execution             |
| -------------- | --------------------- |
| `beforeEach()` | Before every test     |
| `afterEach()`  | After every test      |
| `beforeAll()`  | Once before all tests |
| `afterAll()`   | Once after all tests  |

You confused `beforeAll()` and `afterAll()` in the recent checks. We'll revisit these.

**React Native Testing Library**

```
getByText()    // Finds immediately; throws if missing
queryByText()  // Returns null if missing
findByText()   // Waits for element asynchronously
```

### **3. Overall preparation tracker**

| Major area                           | Status                      |
| ------------------------------------ | --------------------------- |
| React Native New Architecture        | Practised well              |
| Native Modules & device integrations | Practised                   |
| Payment app security                 | Practised                   |
| Android build & DevOps               | Practised                   |
| Git & GitHub workflows               | Practised                   |
| Jest & RN testing                    | Practised; revision pending |
| RN threads & performance             | Pending deeper revision     |
| Redux / state management             | Pending revision            |
| App architecture & scalability       | Pending                     |
| Debugging & production monitoring    | Pending                     |
| JavaScript advanced concepts         | Revision pending            |

### **4. Recommended next steps**

1. Finish Jest lifecycle methods.
2. Practise one small React Native component testing example.
3. Revisit RN threads and performance.
4. Cover Redux, app architecture and scalability.
5. Revise security, Git, Android builds and New Architecture.

**My recommendation:** Finish testing today, but don't spend too much time on Jest. For the NPCI React Native role, prioritize React Native performance, native integrations, security, debugging and architecture.

We'll continue one question at a time, and I'll keep topics marked as Practised until you demonstrate consistent understanding.