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