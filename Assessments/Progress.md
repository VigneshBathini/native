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