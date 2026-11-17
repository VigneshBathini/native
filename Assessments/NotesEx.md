# NPCI BHIM Mobile App Developer – Complete Preparation Notes

**Assessment:** HackerRank  
**Duration:** 90 minutes  
**Language:** JavaScript  
**Goal:** Crack the NPCI BHIM mobile app developer assessment.

---

# PART 1 – MOCK TEST 1: FIVE QUESTIONS WITH SOLUTIONS

## Q1. JavaScript Event Loop, Promises and Output Prediction

### Question

Predict the output:

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");
```

### Correct answer

```text
A
D
C
B
```

### Explanation

JavaScript executes synchronous code first.

Execution sequence:

1. `console.log("A")` executes.
2. `setTimeout()` schedules a callback in the task queue.
3. `Promise.then()` schedules a callback in the microtask queue.
4. `console.log("D")` executes.
5. Promise microtask executes.
6. setTimeout callback executes.

### Important concepts

| Concept | Meaning |
|---|---|
| Call Stack | Executes JavaScript functions |
| Synchronous | Executes immediately, one operation at a time |
| Promise | Represents an asynchronous operation |
| Microtask Queue | Contains Promise callbacks |
| Task Queue | Contains callbacks such as setTimeout |
| Event Loop | Coordinates execution between queues and the call stack |

**Remember:** Microtasks are processed before the next task when the call stack is empty.

---

## Q2. React Native API Integration

### Question

A user clicks the Pay button in a React Native application.

Write a function that:

- Sends a payment request using fetch().
- Shows a loading indicator.
- Handles success and failure.
- Prevents duplicate submissions.

### Correct answer

```javascript
async function makePayment(paymentData) {
    if (isLoading) {
        return;
    }

    try {
        setIsLoading(true);

        const response = await fetch(
            "https://api.example.com/payment",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(paymentData)
            }
        );

        if (!response.ok) {
            throw new Error("Payment request failed");
        }

        const result = await response.json();

        console.log("Payment result:", result);

    } catch (error) {
        console.error("Payment error:", error);

    } finally {
        setIsLoading(false);
    }
}
```

### Explanation

| Code | Purpose |
|---|---|
| `async` | Defines an asynchronous function |
| `await` | Waits for a Promise to settle |
| `fetch()` | Sends an HTTP request |
| `POST` | Sends data to the backend |
| `JSON.stringify()` | Converts an object into JSON |
| `response.ok` | Checks HTTP success status |
| `try/catch` | Handles errors |
| `finally` | Runs after success or failure |
| `setIsLoading()` | Updates loading state |

### Additional payment concepts

- Use secure token storage.
- Validate payment on the backend.
- Never trust frontend payment success alone.
- Use idempotency keys.
- Prevent duplicate submissions.
- Handle API timeouts and uncertain payment outcomes safely.

---

## Q3. Find the Second Largest Distinct Number

### Question

Find the second-largest distinct number in an array.

Input:

```javascript
const arr = [8, 8, 7, 7, 6, 6];
```

Expected output:

```text
7
```

Another example:

```javascript
const arr = [5, 5, 5];
```

Expected output:

```text
-1
```

### Correct solution

```javascript
function secondLargest(arr) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];

        } else if (
            arr[i] < largest &&
            arr[i] > secondLargest
        ) {
            secondLargest = arr[i];
        }
    }

    return secondLargest === -Infinity
        ? -1
        : secondLargest;
}

console.log(secondLargest([8, 8, 7, 7, 6, 6])); // 7
console.log(secondLargest([5, 5, 5]));          // -1
```

### Important concepts

**1. Why use `-Infinity`?**

It allows any valid number to become the largest or second-largest number, including negative numbers.

**2. Why use `else if`?**

When the first condition is true, JavaScript skips the second condition.

**3. Why check `arr[i] < largest`?**

To avoid treating a duplicate of the largest number as the second largest.

### Complexity

- Time: O(n)
- Space: O(1)

---

## Q4. Two Sum – Using Map

### Question

Given an array and a target, return the indices of two numbers whose sum equals the target.

Input:

```javascript
const nums = [2, 7, 11, 15];
const target = 9;
```

Expected output:

```javascript
[0, 1]
```

Because:

```text
2 + 7 = 9
```

### Correct solution

```javascript
function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {

        const needed = target - nums[i];

        if (map.has(needed)) {
            return [map.get(needed), i];
        }

        map.set(nums[i], i);
    }

    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
// [0, 1]
```

### Explanation

At index 0:

- Current number = 2.
- Needed number = 9 - 2 = 7.
- Map does not contain 7.
- Store `2 → 0`.

At index 1:

- Current number = 7.
- Needed number = 9 - 7 = 2.
- Map contains 2.
- Return `[0, 1]`.

### Important pattern

```javascript
const needed = target - nums[i];

if (map.has(needed)) {
    return [map.get(needed), i];
}

map.set(nums[i], i);
```

### Why check before inserting?

It prevents using the same array element twice.

### Complexity

- Average time: O(n)
- Space: O(n)

---

## Q5. Full-Stack Payment Architecture

### Question

Design a payment transfer system using:

- React Native frontend.
- Node.js/Express backend.
- MySQL database.

A user transfers ₹500 from Account A to Account B.

Explain how to prevent:

1. Duplicate transactions.
2. Negative account balances.
3. Partial transactions.
4. Unauthorized payments.

### Correct answer

**Step 1: Frontend**

Send payment details to the backend.

```javascript
const paymentData = {
    fromAccount: 101,
    toAccount: 202,
    amount: 500
};
```

**Step 2: Backend**

The Node.js backend should:

- Authenticate the user.
- Validate the request.
- Verify account ownership.
- Validate the transfer amount.
- Check the idempotency key.
- Execute the database transaction.

**Step 3: MySQL transaction**

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 500
WHERE account_id = 101
AND balance >= 500;

-- Application checks exactly one row was updated.

UPDATE accounts
SET balance = balance + 500
WHERE account_id = 202;

INSERT INTO transactions
(from_account, to_account, amount, status)
VALUES (101, 202, 500, 'SUCCESS');

COMMIT;
```

If any operation fails:

```sql
ROLLBACK;
```

Both account updates and the transaction record must be validated before COMMIT.

**Step 4: Prevent negative balances**

Use conditional UPDATE:

```sql
UPDATE accounts
SET balance = balance - 500
WHERE account_id = 101
AND balance >= 500;
```

If no row is updated, the debit must not proceed.

**Step 5: Prevent duplicate transactions**

Use an idempotency key and a unique database constraint.

```javascript
const paymentRequest = {
    amount: 500,
    toAccount: 202,
    idempotencyKey: "unique-request-id"
};
```

If the same request is submitted again, return the existing transaction result rather than creating another transaction.

**Step 6: Security**

- HTTPS.
- Authentication.
- Authorization.
- Backend validation.
- Secure token handling.
- Transaction audit logs.

### ACID properties

| Property | Meaning |
|---|---|
| Atomicity | All operations succeed or none |
| Consistency | Database rules remain valid |
| Isolation | Concurrent transactions are handled safely |
| Durability | Committed data persists |

---

# PART 2 – JAVASCRIPT DSA CONCEPTS DISCUSSED

## 1. JavaScript Map

A Map stores data as key-value pairs.

### Creating a Map

```javascript
const map = new Map();
```

### Important methods

```javascript
map.set(10, 0);

console.log(map.get(10));  // 0
console.log(map.has(10));  // true
console.log(map.has(20));  // false
console.log(map.size);     // 1

map.delete(10);
```

| Method | Purpose |
|---|---|
| `set(key, value)` | Insert or update |
| `get(key)` | Retrieve value |
| `has(key)` | Check whether key exists |
| `delete(key)` | Remove key |
| `size` | Number of entries |

### Example: Store numbers and indices

```javascript
const map = new Map();

map.set(2, 0);
map.set(7, 1);

console.log(map.get(2)); // 0
console.log(map.get(7)); // 1
```

Remember:

- Key = array number.
- Value = array index.

We store the numbers and indices, not the target.

---

## 2. Map – Counting Occurrences

Example:

```javascript
const nums = [2, 4, 3, 2, 5, 4];

const map = new Map();

for (let i = 0; i < nums.length; i++) {

    const count = map.get(nums[i]) || 0;

    map.set(nums[i], count + 1);
}

console.log(map.get(2)); // 2
console.log(map.get(4)); // 2
console.log(map.get(3)); // 1
console.log(map.get(5)); // 1
```

### Important expression

```javascript
const count = map.get(nums[i]) || 0;
```

Meaning:

- If the key exists, retrieve its count.
- If it does not exist, start with zero.

Then:

```javascript
map.set(nums[i], count + 1);
```

Increase the count by one.

### Execution table

For `[2, 4, 3, 2, 5, 4]`:

| Number | Count after processing |
|---|---:|
| First 2 | 1 |
| First 4 | 1 |
| First 3 | 1 |
| Second 2 | 2 |
| First 5 | 1 |
| Second 4 | 2 |

Final counts:

```text
2 → 2
4 → 2
3 → 1
5 → 1
```

---

## 3. JavaScript Set

A Set stores unique values only.

### Example

```javascript
const set = new Set();

set.add(5);
set.add(10);
set.add(5);
set.add(15);
set.add(10);

console.log(set.size); // 3
```

Output:

```text
Set(3) { 5, 10, 15 }
```

Even though we inserted five values, only three unique values are stored.

### Important Set methods

| Method | Purpose |
|---|---|
| `set.add(value)` | Add a value |
| `set.has(value)` | Check if value exists |
| `set.delete(value)` | Remove a value |
| `set.size` | Count unique values |

### Example: has()

```javascript
const set = new Set();

set.add(10);
set.add(20);
set.add(30);

console.log(set.has(20)); // true
console.log(set.has(40)); // false
```

### Map vs Set

| Map | Set |
|---|---|
| Stores key-value pairs | Stores unique values |
| `map.set(key, value)` | `set.add(value)` |
| `map.get(key)` | No equivalent get method |
| `map.has(key)` | `set.has(value)` |

**Remember:**

- Map = key-value storage.
- Set = unique values.

---

## 4. Duplicate Detection Using Map

Example:

```javascript
const nums = [2, 2, 2, 4, 4, 5];
```

Expected result:

```javascript
[2, 4]
```

### Solution

```javascript
function findDuplicates(nums) {

    const map = new Map();
    const duplicates = [];

    for (let i = 0; i < nums.length; i++) {

        const count = map.get(nums[i]) || 0;

        if (count === 1) {
            duplicates.push(nums[i]);
        }

        map.set(nums[i], count + 1);
    }

    return duplicates;
}

console.log(findDuplicates([2, 2, 2, 4, 4, 5]));
// [2, 4]
```

### Why `count === 1`?

- First occurrence: count = 0 → not a duplicate.
- Second occurrence: count = 1 → add to result.
- Third occurrence: count = 2 → do not add again.

This ensures each duplicate is added only once.

### Alternative: Using Set

We can also solve duplicate detection with two Sets.

```javascript
function findDuplicates(nums) {

    const seen = new Set();
    const duplicates = new Set();

    for (let i = 0; i < nums.length; i++) {

        if (seen.has(nums[i])) {
            duplicates.add(nums[i]);
        } else {
            seen.add(nums[i]);
        }
    }

    return [...duplicates];
}

console.log(findDuplicates([2, 2, 2, 4, 4, 5]));
// [2, 4]
```

### Complexity

- Time: O(n) average.
- Space: O(n).

---

# PART 3 – PRACTICE EXAMPLES ALREADY DISCUSSED

## Example 1: Two Sum with duplicate numbers

```javascript
const nums = [5, 5, 5];
const target = 10;
```

Answer:

```javascript
[0, 1]
```

Why?

- First iteration stores `5 → 0`.
- Second iteration finds the required 5.
- Function returns immediately.
- Only 2 iterations execute.

## Example 2: Two Sum with a larger array

```javascript
const nums = [1, 2, 3, 4, 5];
const target = 9;
```

Answer:

```javascript
[3, 4]
```

Because:

```text
nums[3] + nums[4]
4 + 5 = 9
```

Number of iterations: 5.

## Example 3: Duplicate counting

```javascript
const nums = [7, 7, 7, 7];
```

Final result:

```text
7 → 4
```

`map.get(7)` returns 4.

## Example 4: Unique Set values

```javascript
const set = new Set();

set.add(5);
set.add(10);
set.add(5);
set.add(15);
set.add(10);
```

Answer:

```text
Set(3) { 5, 10, 15 }
```

`set.size` returns 3.

## Example 5: Checking Set membership

```javascript
const set = new Set([10, 20, 30]);

console.log(set.has(20)); // true
console.log(set.has(40)); // false
```

---

# PART 4 – IMPORTANT ASSESSMENT PATTERNS

## Pattern 1: Find a number in an array

```javascript
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
        return i;
    }
}

return -1;
```

## Pattern 2: Find the largest number

```javascript
let largest = -Infinity;

for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
        largest = arr[i];
    }
}
```

## Pattern 3: Count occurrences

```javascript
const map = new Map();

for (let i = 0; i < arr.length; i++) {
    const count = map.get(arr[i]) || 0;
    map.set(arr[i], count + 1);
}
```

## Pattern 4: Check duplicates using Set

```javascript
const seen = new Set();

for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i])) {
        console.log("Duplicate found");
    } else {
        seen.add(arr[i]);
    }
}
```

## Pattern 5: Two Sum using Map

```javascript
const needed = target - nums[i];

if (map.has(needed)) {
    return [map.get(needed), i];
}

map.set(nums[i], i);
```

---

# PART 5 – TIME AND SPACE COMPLEXITY

| Operation | Time complexity |
|---|---|
| Access array by index | O(1) |
| Traverse array | O(n) |
| Nested loops | O(n²) |
| Map has/get/set | O(1) average |
| Set has/add | O(1) average |
| Two Sum using Map | O(n) average |
| Duplicate detection using Set | O(n) average |
| Second-largest algorithm | O(n) |

### Space complexity examples

| Algorithm | Space |
|---|---|
| Second largest | O(1) |
| Two Sum | O(n) |
| Frequency Map | O(n) |
| Duplicate detection | O(n) |

---

# PART 6 – COMMON EDGE CASES

Always test these cases in HackerRank problems.

### Arrays

```javascript
[]
[5]
[5, 5, 5]
[1, 2]
[-5, -2, -8]
[2, 2, 3, 3]
```

### Two Sum

```javascript
[2, 7], target = 9
[3, 3], target = 6
[1, 2, 3], target = 10
[5, 5, 5], target = 10
```

### Second largest

```javascript
[5, 5, 5]       // -1
[8, 8, 7]       // 7
[-1, -2, -3]    // -2
[1, 2]          // 1
```

### Duplicate detection

```javascript
[1, 2, 3]       // []
[2, 2]          // [2]
[2, 2, 2]       // [2]
[1, 1, 2, 2]    // [1, 2]
```

---

# PART 7 – OUR NEXT PREPARATION PRIORITIES

1. Complete Set and duplicate-detection practice.
2. Practise array and string coding problems.
3. Improve loops, conditions and edge-case handling.
4. Practise JavaScript Event Loop and Promise output questions.
5. Revise React Native API integration.
6. Revise payment architecture, MySQL and idempotency.
7. Complete another timed mock assessment.

**Preparation rule:** Every concept must be relevant to the NPCI BHIM 90-minute assessment. Focus on understanding, independently writing solutions, testing edge cases and solving within time limits.

**Current checkpoint:** Second-largest number, Map fundamentals, Two Sum, frequency counting and basic Set operations have been practised. Continue with Set-based duplicate detection and then move to the next assessment-relevant coding pattern.


# PART 8 – PRACTICAL CODING ROUND: QUESTIONS WITH SOLUTIONS

## Q1. Two Sum – Using Map

### Question

Given an array and a target, return the indices of two numbers whose sum equals the target.

Input:

```javascript
const nums = [2, 7, 11, 15];
const target = 9;
```

Expected output:

```javascript
[0, 1]
```

### Correct solution

```javascript
function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const needed = target - nums[i];

        if (map.has(needed)) {
            return [map.get(needed), i];
        }

        map.set(nums[i], i);
    }

    return [];
}
```

### Explanation

1. Create an empty Map.
2. Traverse the array using a loop.
3. Calculate the required number:

```javascript
const needed = target - nums[i];
```

4. Check whether the Map already contains that number.
5. If found, return the stored index and current index.
6. Otherwise, store the current number and its index.

### Important concepts

- `Map` stores key-value pairs.
- Key = array number.
- Value = array index.
- `map.has()` checks whether a key exists.
- `map.get()` retrieves the stored index.
- Check before inserting to avoid using the same element twice.

### Complexity

- Time: O(n) average.
- Space: O(n).

**Practice result: 10/10**

---

## Q2. Second-Largest Distinct Number

### Question

Find the second-largest distinct number in an array.

Input:

```javascript
const arr = [8, 8, 7, 7, 6, 6];
```

Expected output:

```text
7
```

### Correct solution

```javascript
function secondLargest(arr) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];

        } else if (
            arr[i] < largest &&
            arr[i] > secondLargest
        ) {
            secondLargest = arr[i];
        }
    }

    return secondLargest === -Infinity
        ? null
        : secondLargest;
}
```

### Explanation

Two variables are required:

```javascript
let largest = -Infinity;
let secondLargest = -Infinity;
```

When a new largest number is found:

```javascript
secondLargest = largest;
largest = arr[i];
```

When a number is smaller than the largest but greater than the current second largest:

```javascript
arr[i] < largest &&
arr[i] > secondLargest
```

Update the second-largest value.

### Important mistakes to avoid

1. Use `arr[i]`, not an incorrectly named variable such as `a[i]`.
2. JavaScript uses `-Infinity`, not `- infinity`.
3. Use `arr[i] < largest` to exclude duplicates of the largest value.
4. Use consistent variable names, such as `secondLargest`.
5. Handle the case where no second distinct number exists.

### Edge cases

```javascript
secondLargest([8, 8, 7]);    // 7
secondLargest([5, 5, 5]);    // null
secondLargest([-1, -2, -3]); // -2
secondLargest([1, 2]);       // 1
```

### Complexity

- Time: O(n).
- Space: O(1).

**Practice result: 6/10**

**Revision focus:** Variable naming, conditions, distinct-value checking and return statements.

---

## Q3. First Non-Repeating Character in a String

### Question

Find the first character that occurs only once in a string.

Input:

```javascript
const str = "swisss";
```

Expected output:

```text
w
```

### Correct solution

```javascript
function nonRepeat(str) {
    const map = new Map();

    // First pass: count character occurrences
    for (const char of str) {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }

    // Second pass: find first character with count 1
    for (const char of str) {
        if (map.get(char) === 1) {
            return char;
        }
    }

    return null;
}
```

### Explanation

This problem requires two passes.

**First pass: Count occurrences**

For `"swisss"`:

| Character | Count |
|---|---:|
| s | 4 |
| w | 1 |
| i | 1 |

**Second pass: Find the first character with count 1**

- `s` has count 4.
- `w` has count 1.
- Return `w`.

### Simplified counting expression

```javascript
map.set(char, (map.get(char) || 0) + 1);
```

Meaning:

- If the character exists, retrieve its current count.
- Otherwise, use 0.
- Increase the count by 1.

### Important concepts

- `for...of` iterates through characters in a string.
- `Map` stores each character and its frequency.
- Two passes are useful when counting first and preserving original order for the result.
- Return `null` if no non-repeating character exists.

### Complexity

- Time: O(n).
- Space: O(k), where k is the number of distinct characters.

**Practice result: 10/10**

---

## Q4. Debit Logic – Payment Scenario

### Question

Write a function that deducts an amount from an account balance.

Requirements:

1. If the amount is greater than the balance, return `"INSUFFICIENT_BALANCE"`.
2. If the amount is invalid, return `"INVALID_AMOUNT"`.
3. Otherwise, return the remaining balance.

### Correct solution

```javascript
function debit(balance, amount) {

    if (amount <= 0) {
        return "INVALID_AMOUNT";
    }

    if (amount > balance) {
        return "INSUFFICIENT_BALANCE";
    }

    return balance - amount;
}
```

### Example

```javascript
console.log(debit(1000, 200));  // 800
console.log(debit(1000, 1200)); // INSUFFICIENT_BALANCE
console.log(debit(1000, 0));    // INVALID_AMOUNT
console.log(debit(1000, -50));  // INVALID_AMOUNT
```

### Explanation

**Step 1: Validate the amount**

```javascript
if (amount <= 0)
```

A debit amount must be positive.

**Step 2: Check available balance**

```javascript
if (amount > balance)
```

Do not allow a debit that exceeds the available balance.

**Step 3: Deduct the amount**

```javascript
return balance - amount;
```

### Production payment considerations

- Validate that values are finite numbers.
- Use integer minor units (paise) instead of floating-point rupee calculations.
- Perform the actual balance validation and debit on the backend.
- Use a database transaction for financial operations.

**Practice result: 9/10**

---

## Q5. Prevent Duplicate Payment Submissions – Async/Await

### Question

Write an asynchronous payment function with these requirements:

1. If a payment is already processing, return `"PAYMENT_IN_PROGRESS"`.
2. Otherwise, start the payment.
3. Handle success and failure.
4. Reset the processing flag after success or failure.
5. Simulate an API request using `await`.

### Correct solution

```javascript
let isProcessing = false;

async function makePayment() {

    if (isProcessing) {
        return "PAYMENT_IN_PROGRESS";
    }

    isProcessing = true;

    try {
        // Simulate API call
        const response = await fetch("API");

        if (!response.ok) {
            throw new Error("Payment failed");
        }

        return "SUCCESS";

    } catch (error) {
        return "FAILED";

    } finally {
        isProcessing = false;
    }
}
```

### Explanation

**1. Declare the processing flag**

```javascript
let isProcessing = false;
```

The flag is declared outside the function so multiple function calls share the same state.

**2. Prevent duplicate submissions**

```javascript
if (isProcessing) {
    return "PAYMENT_IN_PROGRESS";
}
```

If a payment is already processing, do not start another request.

**3. Set the flag before the API call**

```javascript
isProcessing = true;
```

This is important because the flag must be updated before the function reaches its first `await`.

**4. Make the asynchronous request**

```javascript
const response = await fetch("API");
```

`await` waits for the Promise to settle.

**5. Check HTTP response status**

```javascript
if (!response.ok) {
    throw new Error("Payment failed");
}
```

Important: `fetch()` does not automatically reject for HTTP error statuses such as 400 or 500. Check `response.ok`.

**6. Handle errors**

```javascript
catch (error) {
    return "FAILED";
}
```

**7. Reset the processing flag**

```javascript
finally {
    isProcessing = false;
}
```

The `finally` block executes after success or failure.

### Important concepts

| Concept | Purpose |
|---|---|
| `async` | Defines an asynchronous function |
| `await` | Waits for a Promise to settle |
| `fetch()` | Sends an HTTP request |
| `response.ok` | Checks HTTP success status |
| `throw` | Raises an error |
| `try` | Contains code that may fail |
| `catch` | Handles errors |
| `finally` | Runs after success or failure |
| Boolean flag | Prevents repeated submissions in the current app instance |

### Important payment security concept

A frontend Boolean flag is not sufficient to guarantee duplicate-payment prevention.

For production payment systems:

- Generate a unique idempotency key for each payment request.
- Send the key to the backend.
- Enforce idempotency on the backend using database constraints and transaction handling.
- If the same request is submitted again, return the existing transaction result instead of creating another debit.

**Practice result: 10/10**

---

# PART 9 – IMPORTANT CONCEPTS REVISED IN THE PRACTICAL ROUND

## 1. JavaScript Map – Frequency Counting

```javascript
const map = new Map();

for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1);
}
```

Purpose:

- Count character occurrences.
- Store numbers and indices.
- Detect repeated values.
- Solve Two Sum efficiently.

## 2. JavaScript Loops

**Traditional for loop**

```javascript
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

Useful when the array index is required.

**for...of loop**

```javascript
for (const char of str) {
    console.log(char);
}
```

Useful when directly accessing array values or string characters.

## 3. JavaScript Conditions

```javascript
if (condition1) {
    // Execute when condition1 is true
} else if (condition2) {
    // Execute when condition2 is true
} else {
    // Execute when neither condition is true
}
```

Important:

- `if` checks the first condition.
- `else if` checks another condition when the previous condition is false.
- `else` handles the remaining case.

## 4. Async/Await and Error Handling

```javascript
async function getData() {
    try {
        const response = await fetch("API");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        return await response.json();

    } catch (error) {
        console.log(error);

    } finally {
        console.log("Request completed");
    }
}
```

Remember:

- `async` functions return Promises.
- `await` pauses execution of that async function until the Promise settles.
- `catch` handles errors.
- `finally` executes whether the operation succeeds or fails.

## 5. Frontend Duplicate Payment Prevention

```javascript
let isProcessing = false;

if (isProcessing) {
    return "PAYMENT_IN_PROGRESS";
}

isProcessing = true;
```

Reset the flag inside `finally`.

Remember: Frontend protection improves user experience. Backend idempotency protects the actual payment transaction.

---

# PART 10 – PRACTICAL ROUND SCORECARD

| Question | Topic | Score |
|---|---|---:|
| Q1 | Two Sum using Map | 10/10 |
| Q2 | Second-largest distinct number | 6/10 |
| Q3 | First non-repeating character | 10/10 |
| Q4 | Debit logic | 9/10 |
| Q5 | Duplicate payment prevention | 10/10 |
| **Total** | **5 practical questions** | **45/50** |

**Current practical score: 90%**

### Strengths

1. Map-based problem solving.
2. Frequency counting.
3. String traversal.
4. Basic payment logic.
5. Async/await and API error handling.
6. Payment duplicate-submission prevention.

### Areas requiring more practice

1. Second-largest distinct number.
2. Variable naming and syntax accuracy.
3. Array edge cases.
4. Writing conditions carefully.
5. Timed independent coding.

---

# PART 11 – NEXT PRACTICAL QUESTION: PAYMENT TRANSACTION STATES

## Q6. Handling a PENDING UPI Transaction

### Question

A UPI payment API returns the status:

```text
PENDING
```

What should the React Native application do?

**Options:**

A. Show payment successful immediately.

B. Retry the debit API repeatedly until it returns success.

C. Show payment pending and check the transaction status using the transaction ID.

D. Mark payment failed immediately.

### Status

**Pending – Not yet answered.**

---

# PART 12 – UPDATED PREPARATION CHECKPOINT

### Completed

- Mock Test 1: 37/80.
- Mock Test 2: 30/30.
- Practical coding questions Q1–Q5: 45/50.
- Two Sum using Map.
- Second-largest distinct number.
- First non-repeating character.
- Debit logic.
- Async payment handling.
- Duplicate payment prevention.
- `try/catch/finally`.
- HTTP response validation using `response.ok`.
- Frontend processing flag versus backend idempotency.

### Next priorities

1. Answer Q6 on pending UPI transaction handling.
2. Continue payment lifecycle and transaction-state scenarios.
3. Practise Set-based duplicate detection.
4. Practise more array and string coding problems.
5. Revise JavaScript Event Loop and Promises.
6. Practise React Native payment API integration.
7. Continue with timed practical coding exercises.

**Preparation goal:** Clear the NPCI BHIM 90-minute HackerRank assessment using JavaScript.

**Preparation rule:** Understand the logic, write the solution independently, test edge cases and practise under time limits.

---

# PART 13 – UPI FUNDAMENTALS AND PAYMENT ARCHITECTURE

## 1. What is UPI?

**UPI = Unified Payments Interface**

UPI is a payment system that enables instant bank-to-bank money transfers through supported UPI applications.

### Important points

- UPI is a payment system, not a bank.
- It enables money transfers between participating bank accounts.
- Users can send and receive money using UPI applications.
- UPI supports person-to-person and person-to-merchant payments.

**Remember:** UPI is the payment infrastructure, not an individual mobile application.

---

## 2. What is NPCI?

**NPCI = National Payments Corporation of India**

NPCI operates the UPI payment network and facilitates transactions between participating banks and payment applications.

### Important points

- NPCI operates the UPI infrastructure.
- It facilitates payment transactions.
- It does not maintain every customer's individual bank account.
- It is not the same as a UPI application such as Google Pay or PhonePe.

**Remember:** NPCI operates the UPI network.

---

## 3. What is PSP?

**PSP = Payment Service Provider**

In the UPI ecosystem, a PSP bank provides UPI services and banking connectivity to participating third-party UPI applications.

### Important points

- PSP banks participate in the UPI ecosystem.
- They provide banking connectivity for UPI applications.
- A PSP bank and the customer's account-holding bank are not necessarily the same.

**Remember:** PSP bank = Banking connectivity for UPI applications.

---

## 4. What is TPAP?

**TPAP = Third Party Application Provider**

A TPAP is a company that provides a customer-facing UPI application in partnership with a PSP bank.

### Examples

- Google Pay
- PhonePe
- Amazon Pay

### Important points

- TPAP provides the UPI application experience.
- It works in partnership with PSP bank(s).
- The TPAP itself is not the customer's bank.
- It does not independently operate the entire NPCI network.

**Remember:** TPAP = Customer-facing UPI application.

---

## 5. Payer and Payee

These terms identify the people involved in a payment transaction.

| Term | Meaning |
|---|---|
| Payer | Person who sends money |
| Payee | Person who receives money |

### Example

You send ₹1,000 to your friend.

- You = Payer
- Your friend = Payee

---

## 6. Remitter Bank and Beneficiary Bank

These terms identify the banks involved in a transaction.

| Term | Meaning |
|---|---|
| Remitter Bank | Bank from which money is sent |
| Beneficiary Bank | Bank into which money is received |

### Example

You send ₹2,000 from your ICICI account to someone's Axis Bank account.

- Payer = You
- Payee = Receiver
- Remitter Bank = ICICI Bank
- Beneficiary Bank = Axis Bank

**Remember:**

- Remitter = Sender's bank.
- Beneficiary = Receiver's bank.

---

## 7. What is VPA?

**VPA = Virtual Payment Address**

A VPA is an address used to identify a UPI account for sending and receiving money.

### Example

```text
vignesh@okaxis
```

Here:

- `vignesh` = Identifier
- `okaxis` = UPI handle

### Benefits

- Users can send money without entering the receiver's bank account number.
- Users do not need to share their bank account number and IFSC for a typical VPA-based payment.
- It identifies the UPI address used for the transaction.

**Remember:** VPA = UPI payment address.

---

## 8. What is UPI PIN?

A UPI PIN is a secret authentication PIN used to authorize UPI transactions.

### Important points

- It is used to authorize payments.
- It is not the same as a mobile screen-lock PIN.
- Never share your UPI PIN.
- A merchant React Native application must never collect or store the user's UPI PIN.
- The trusted UPI application or authorized payment flow handles this authentication.

### Example payment flow

1. User enters the payment amount.
2. User selects a UPI payment option.
3. A trusted UPI application handles the payment.
4. User enters the UPI PIN in that trusted flow.
5. The transaction is processed.

**Remember:** UPI PIN = Authorizes the UPI transaction.

---

## 9. P2P vs P2M

UPI supports different transaction types.

### P2P – Person to Person

Money transferred between two individuals.

Example: You send ₹500 to your friend.

### P2M – Person to Merchant

Money transferred from an individual to a business or merchant.

Example: You scan a supermarket QR code and pay ₹1,500.

| Type | Meaning | Example |
|---|---|---|
| P2P | Person to Person | Sending money to a friend |
| P2M | Person to Merchant | Paying a shopkeeper |

**Remember:**

- P2P = Person to Person.
- P2M = Person to Merchant.

---

# PART 14 – UPI PAYMENT METHODS

## 1. UPI Intent

UPI Intent allows a merchant application to launch a compatible UPI application to complete a payment.

### Example

A user opens your React Native application and clicks:

```text
Pay ₹500
```

Your application initiates a UPI payment intent, which can launch a compatible UPI application.

The user completes the payment in that application.

### Important points

- Your app initiates the payment.
- A compatible UPI application handles the payment flow.
- The user reviews the payment details.
- The user authorizes the payment using their UPI PIN.
- Your application can receive a return response.
- The backend must verify the actual payment status.

**Remember:** UPI Intent = Launching a compatible UPI app to complete a payment.

---

## 2. UPI QR

UPI QR is another way to initiate a UPI payment.

### Example

1. Customer scans a restaurant's QR code.
2. UPI application identifies the payment details.
3. Customer reviews the payment.
4. Customer authorizes the payment.
5. Payment is processed.

### UPI Intent vs UPI QR

| UPI Intent | UPI QR |
|---|---|
| App initiates payment through an intent | User scans a QR code |
| Launches a compatible UPI app | QR identifies payment details |
| Uses app-to-app communication | Uses QR scanning |

---

## 3. UPI Intent Flow in React Native

### Basic architecture

```text
React Native Application
          |
          | User clicks Pay ₹500
          |
          v
Android Linking / Intent
          |
          v
Compatible UPI Application
          |
          | User reviews payment
          | User enters UPI PIN
          |
          v
Payment Processing
          |
          v
Return Response / Callback
          |
          v
React Native Application
          |
          v
Backend Payment Verification
```

### React Native concepts involved

| Concept | Purpose |
|---|---|
| Linking API | Open another application |
| Deep Linking | Return to your application through a supported URL |
| AppState | Detect when the app becomes active again |
| Backend Verification | Confirm the actual payment status |

### Important points

- React Native does not directly connect to NPCI's internal APIs.
- The app initiates the payment through a supported UPI flow.
- Returning to the React Native application does not guarantee payment success.
- A callback response should not be treated as final payment proof.

---

# PART 15 – PAYMENT CALLBACK AND BACKEND VERIFICATION

## 1. What is a Payment Callback?

A callback is a response received by an application after a payment flow returns control to it.

### Example

1. User clicks Pay ₹500.
2. UPI application opens.
3. User completes or cancels the payment.
4. UPI application returns to the merchant application.
5. Merchant application receives a response.

The response may contain a payment status such as SUCCESS, FAILED or another status, depending on the integration.

### Important warning

**A mobile callback alone is not reliable proof of payment.**

It may be manipulated, incomplete or received before the final transaction status is known.

---

## 2. Correct Payment Verification Flow

```text
React Native App
       |
       | Initiate Payment
       v
Payment Provider / UPI Flow
       |
       | Payment Processing
       v
Return Response / Callback
       |
       v
React Native App
       |
       | Send Transaction ID
       v
Node.js Backend
       |
       | Verify with Authorized Provider
       v
Payment Status Confirmation
       |
       v
MySQL Database
       |
       v
Update Order Status
```

### Important points

- Do not trust the frontend callback alone.
- Verify payment through the backend and authorized payment provider.
- Use the provider's verified payment status.
- Update the order only after successful verification.
- Handle pending and failed payments separately.

**Remember:** Backend verification is required before marking an order as paid.

---

# PART 16 – PAYMENT GATEWAY / PROVIDER

## 1. What is a Payment Gateway?

A Payment Gateway / Payment Provider helps a merchant integrate payment methods such as:

- UPI
- Debit and credit cards
- Net banking
- Other supported payment methods

### Examples

- Razorpay
- Cashfree Payments
- PayU

### Important distinction

| Component | Responsibility |
|---|---|
| NPCI | Operates the UPI network |
| PSP Bank | Provides banking connectivity for UPI applications |
| TPAP | Provides the customer-facing UPI application |
| Payment Provider | Offers merchant payment integration and processing services |
| Merchant Backend | Manages orders and verifies payment status |

**Remember:** A payment gateway/provider is not the same as NPCI.

---

## 2. Payment Gateway Architecture

### Example

Imagine your AFMC Mess application wants to collect ₹500 from a user.

```text
React Native Application
          |
          | User clicks Pay ₹500
          |
          v
Node.js / Express Backend
          |
          | Create Payment Order
          |
          v
Payment Provider
          |
          | Process Payment
          |
          v
Payment Status / Webhook
          |
          v
Node.js Backend
          |
          | Verify Payment
          |
          v
MySQL Database
          |
          v
Update Order as PAID
```

### Explanation

**Step 1 – React Native**

User enters the amount and clicks the Pay button.

**Step 2 – Backend**

React Native sends a payment request to the Node.js backend.

**Step 3 – Payment Provider**

The backend communicates with the payment provider to create a payment request.

**Step 4 – Payment Processing**

The provider processes the payment through its supported payment flow.

**Step 5 – Verification**

The backend verifies the payment status with the provider or through an authenticated webhook.

**Step 6 – Database**

The backend updates the payment and order status in MySQL.

---

## 3. Important Security Rule

Never store payment provider secret keys inside:

- React Native JavaScript code.
- Android application configuration.
- Public GitHub repositories.
- Client-side environment variables bundled into the application.

Store secret keys securely on the backend using environment variables or an appropriate secrets-management solution.

Example:

```env
PAYMENT_PROVIDER_KEY=your_secret_key
```

The React Native application should communicate with your backend instead of exposing provider secrets.

---

# PART 17 – REACT NATIVE PAYMENT INTEGRATION CONCEPTS

These are the React Native concepts we need to practise next.

| Concept | Why it is needed |
|---|---|
| Linking API | Launch another application |
| Deep Linking | Receive a return link |
| AppState | Detect when the app becomes active |
| fetch / Axios | Communicate with backend |
| useState | Manage loading and payment status |
| try / catch / finally | Handle asynchronous errors |
| Expo Development Build | Support native integrations that require native configuration |

### Expo Go vs Development Build

**Expo Go**

- Useful for learning and building UI.
- Useful for basic API integration.
- Does not support every native payment SDK or custom native configuration.

**Expo Development Build**

- Supports custom native modules and configuration.
- Useful when integrating native payment SDKs.
- Can be built using EAS Build.

**Remember:** A native payment SDK integration may require an Expo Development Build rather than Expo Go.

---

# PART 18 – PAYMENT ARCHITECTURE REVISION TABLE

| Term | Meaning |
|---|---|
| UPI | Unified Payments Interface |
| NPCI | National Payments Corporation of India |
| PSP | Payment Service Provider |
| TPAP | Third Party Application Provider |
| VPA | Virtual Payment Address |
| Payer | Person sending money |
| Payee | Person receiving money |
| Remitter Bank | Sender's bank |
| Beneficiary Bank | Receiver's bank |
| UPI PIN | Authorizes UPI transaction |
| P2P | Person to Person |
| P2M | Person to Merchant |
| UPI Intent | Launch compatible UPI application |
| UPI QR | QR-based payment initiation |
| Payment Gateway | Merchant payment integration service |
| Callback | Response returned to application |
| Backend Verification | Confirms payment status with provider |

---

# PART 19 – OUR UPI LEARNING PROGRESS

## Completed lessons

| Lesson | Topic | Status |
|---|---|---|
| 1.1 | What is UPI? | Learned |
| 1.2 | What is NPCI? | Learned |
| 1.3 | What is PSP? | Learned |
| 1.4 | What is TPAP? | Learned |
| 1.5 | Payer and Payee | Learned |
| 1.6 | Remitter and Beneficiary Bank | Learned |
| 1.7 | VPA | Learned |
| 1.8 | UPI PIN | Learned |
| 1.9 | P2P and P2M | Learned |
| 1.10 | UPI Intent and QR introduction | Learned |
| 1.10 | Callback and Backend Verification | Learned / Introduced |
| 1.11 | Payment Gateway / Provider | In Progress |

### Knowledge check progress

- UPI fundamentals and architecture questions Q1–Q11: Correct.
- Payment Provider question Q12: Pending.

---

# PART 20 – PENDING TOPICS AND NEXT PREPARATION PRIORITIES

## A. UPI and Payment Architecture

1. Complete Payment Gateway / Provider lesson.
2. UPI Intent vs QR in more detail.
3. UPI Collect flow.
4. Payment transaction lifecycle.
5. Payment states: INITIATED, PENDING, SUCCESS and FAILED.
6. Order ID vs Transaction ID.
7. Payment timeout scenarios.
8. Return response and callback handling.

## B. React Native Implementation

1. Linking API with practical code.
2. Android Intent handling.
3. Deep Linking.
4. AppState.
5. Handle UPI application not installed.
6. Handle user cancellation.
7. Handle payment timeout.
8. Display pending, success and failed screens.
9. Expo Development Build and native configuration.

## C. Backend Payment Processing

1. Create Payment API.
2. Create Order API.
3. Payment Provider API integration.
4. Backend payment verification.
5. Webhook handling.
6. Webhook signature verification.
7. MySQL payment table design.
8. Transaction status updates.

## D. Advanced Payment Concepts

1. Idempotency.
2. Duplicate payment prevention.
3. Retry mechanisms.
4. Timeout handling.
5. Reconciliation.
6. Race conditions.
7. Authentication and authorization.
8. Secure API key management.
9. Payment audit logs.

## E. Practical Project

Build a demo using:

- React Native Expo
- Node.js
- Express.js
- MySQL
- Authorized Payment Provider Sandbox

### Expected functionality

1. Enter payment amount.
2. Create order through backend.
3. Initiate payment.
4. Handle payment return response.
5. Verify payment through backend.
6. Store payment status in MySQL.
7. Display success, pending or failed status.

**Important:** Use a provider sandbox for practice. Production UPI integration requires the appropriate authorized provider arrangements.

---

# PART 21 – ONE-DAY PREPARATION PLAN

| Block | Topics | Suggested time |
|---|---|---:|
| 1 | Revise UPI fundamentals | 30 min |
| 2 | Payment architecture and lifecycle | 60 min |
| 3 | React Native Linking, Deep Linking, AppState | 90 min |
| 4 | Node.js APIs, verification and webhooks | 90 min |
| 5 | Idempotency, retry, timeout and security | 60 min |
| 6 | Practical architecture and revision | 90 min |

### Final preparation goals

By the end, be able to:

1. Explain the UPI architecture.
2. Explain NPCI, PSP and TPAP.
3. Explain UPI Intent and QR.
4. Explain how React Native launches a UPI application.
5. Explain how the user returns to the application.
6. Explain why callback success is not final payment proof.
7. Explain backend verification and webhooks.
8. Explain pending and failed transactions.
9. Explain duplicate payment prevention.
10. Explain how Expo supports native payment integrations.

**Preparation rule:** Learn one concept, understand the flow, write a small example, and answer a tricky knowledge check before moving to the next concept.

---------------------------------------------------------










# PART 22 – REACT NATIVE ARCHITECTURE AND NEW ARCHITECTURE

## 1. What is React Native Architecture?

React Native allows us to build Android and iOS applications using JavaScript or TypeScript while rendering native UI components.

Traditionally, React Native architecture has two main sides:

1. JavaScript side – Executes JavaScript code, business logic and React components.
2. Native side – Handles native Android/iOS functionality and UI rendering.

These sides communicate through the Bridge in the legacy architecture.

### Basic architecture

```text
JavaScript Thread
       |
       | JavaScript-to-native communication
       v
     Bridge
       |
       | Serialized messages
       v
    Native Side
       |
       v
 Android / iOS
```

### Example: UPI Payment Application

When a user clicks the Pay ₹500 button:

1. JavaScript handles the button click.
2. JavaScript executes the required logic.
3. If native functionality is required, communication happens with the native side.
4. The native side performs the required operation.
5. UI updates are rendered based on the application state and native operations.

---

## 2. Legacy Bridge Architecture

The Bridge is the communication mechanism between the JavaScript side and native modules in the legacy React Native architecture.

### How does it work?

1. JavaScript prepares a message for native functionality.
2. The message is serialized into a transferable format.
3. The Bridge transfers the message asynchronously.
4. The native side processes the message.
5. Results or events can be communicated back to JavaScript.

### Important terminology

| Concept | Meaning |
|---|---|
| JavaScript Thread | Executes JavaScript logic |
| Native Side | Handles Android/iOS functionality |
| Bridge | Communication mechanism between JS and native |
| Serialization | Converting data into a transferable format |
| Asynchronous communication | Communication that does not block the caller while waiting for a response |

### Limitations of the old Bridge

- Messages require serialization and deserialization.
- Communication happens through asynchronous message passing.
- Frequent communication or large amounts of data can introduce overhead.
- This overhead can affect performance in communication-heavy scenarios.

### Technical discussion answer

"The limitation of the old Bridge architecture is that communication between JavaScript and native modules requires asynchronous message passing and serialization. Frequent communication or large amounts of data can introduce additional overhead and affect performance."

---

## 3. JSI – JavaScript Interface

JSI stands for JavaScript Interface.

It is one of the key foundations of React Native's New Architecture.

### Why was JSI introduced?

The legacy Bridge relies on serialized asynchronous message passing.

JSI provides a C++ interface that allows JavaScript to interact with C++ objects and native functionality without relying on the legacy Bridge mechanism.

### Architecture comparison

**Legacy Architecture**

```text
JavaScript
    |
    v
  Bridge
    |
    v
Native Modules
```

**New Architecture**

```text
JavaScript
    |
    v
   JSI
    |
    v
C++ / Native Functionality
```

### Important points

- JSI stands for JavaScript Interface.
- It provides an interface between JavaScript and C++.
- It allows JavaScript to interact with C++ objects.
- It avoids the legacy Bridge's serialization-based message-passing mechanism.
- It does not mean every native operation becomes synchronous.

### Example

Suppose a UPI application needs to access native device functionality.

With JSI-based native modules, JavaScript can interact with native C++ functionality without using the legacy Bridge mechanism.

### Bridge vs JSI

| Bridge | JSI |
|---|---|
| Legacy communication mechanism | New Architecture interface |
| Uses serialized messages | Direct interaction through C++ interface |
| Asynchronous message passing | Supports more direct JS/native interaction |
| Message queue overhead | Avoids legacy Bridge serialization overhead |

### Technical discussion answer

"The Bridge is used for communication between JavaScript and native modules through asynchronous serialized messages. JSI provides a C++ interface that allows JavaScript to interact with native C++ objects without relying on the legacy Bridge."

---

## 4. Fabric – New Renderer

Fabric is the new rendering system introduced as part of React Native's New Architecture.

### What problem does Fabric solve?

Fabric improves the rendering process by providing better integration between React and the native rendering system.

It works with React's reconciliation process to efficiently calculate UI changes and commit those updates to native views.

### Example: UPI Payment Screen

Suppose a payment screen has three states:

1. Initial screen.
2. Payment loading screen.
3. Payment success screen.

When the payment state changes, React performs reconciliation to identify what changed.

Fabric handles the rendering and commits the required UI updates to the native view system.

### Basic flow

```text
User clicks Pay
       |
       v
React State Changes
       |
       v
React Reconciliation
       |
       v
Fabric Renderer
       |
       v
Native UI Update
```

### Important terminology

| Concept | Meaning |
|---|---|
| Fabric | New React Native rendering system |
| Reconciliation | Process of calculating differences between UI states |
| Native UI | Actual Android/iOS views displayed to users |

### Technical discussion answer

"Fabric is the new rendering system in React Native's New Architecture. It works with React's reconciliation process to efficiently calculate UI changes and commit those updates to the native UI."

**Remember:** Fabric improves the rendering process; it does not guarantee that every screen renders instantly.

---

## 5. TurboModules

TurboModules are the new native module system in React Native's New Architecture.

They provide improved native module integration and support lazy loading.

### Why do we need TurboModules?

Consider a payment application that requires:

- Biometric authentication.
- Device information.
- Secure storage.
- Native platform functionality.

Some of these capabilities require native modules.

TurboModules provide a modern way for JavaScript to interact with native modules using JSI.

### What is Lazy Loading?

Lazy loading means loading or initializing a module when it is required instead of loading every module at application startup.

### Example: Biometric Authentication

Suppose a UPI application supports fingerprint authentication.

The biometric module may only be needed when the user selects fingerprint authentication.

TurboModules support loading the module when required.

### Legacy Native Modules vs TurboModules

| Legacy Native Modules | TurboModules |
|---|---|
| Use the legacy Bridge | Use JSI-based integration |
| Traditional module loading | Support lazy loading |
| Bridge message serialization | Avoid legacy Bridge message serialization |

### Technical discussion answer

"TurboModules are the new native module system in React Native's New Architecture. They support lazy loading, which means native modules can be initialized when they are required instead of loading everything at application startup."

---

## 6. Codegen – Code Generation

Codegen stands for Code Generation.

It automatically generates the required native interface code based on typed JavaScript or TypeScript specifications.

### Why do we need Codegen?

When creating custom native modules or components, JavaScript and native implementations need a consistent interface.

Codegen helps generate the required interface code automatically.

### Example: Custom Biometric Module

Suppose we define a typed TypeScript specification for a biometric authentication module.

Codegen generates the corresponding native interface code for Android and iOS.

### Basic flow

```text
TypeScript Specification
          |
          v
        Codegen
          |
          v
   Generated Interfaces
          |
       ----------
       |        |
       v        v
    Android    iOS
```

### Important points

- Codegen stands for Code Generation.
- It uses typed specifications.
- It generates native interface code.
- It helps maintain consistency between JavaScript and native implementations.
- It is used with TurboModules and Fabric components.

### Technical discussion answer

"Codegen automatically generates native interface code based on typed JavaScript or TypeScript specifications. It helps maintain consistency between JavaScript and native implementations and reduces manual interface-writing."

---

## 7. Bridgeless Mode

Bridgeless Mode means React Native can run without depending on the legacy Bridge infrastructure.

It uses the New Architecture infrastructure, including JSI, for JavaScript-to-native interaction.

### Legacy Architecture

```text
JavaScript
    |
    v
  Bridge
    |
    v
Native Modules
```

### Bridgeless Mode

```text
JavaScript
    |
    v
   JSI
    |
    v
Native Functionality
```

### Important points

- Does not rely on the legacy Bridge.
- Uses the New Architecture infrastructure.
- Uses JSI for JavaScript/native interaction.
- Avoids the legacy Bridge's serialized message-passing mechanism.

### Technical discussion answer

"Bridgeless Mode means React Native operates without the legacy Bridge. Instead, it uses the New Architecture infrastructure, including JSI, to communicate with native functionality."

---

## 8. React Native Architecture – Complete Comparison

| Component | Main responsibility |
|---|---|
| Legacy Bridge | Asynchronous serialized communication |
| JSI | JavaScript-to-C++ interface |
| Fabric | New UI rendering system |
| TurboModules | Modern native module system with lazy loading |
| Codegen | Generates native interface code |
| Bridgeless Mode | Runs without relying on the legacy Bridge |

### Remember these keywords

- Bridge = Serialized communication.
- JSI = C++ interface.
- Fabric = Rendering.
- TurboModules = Native modules and lazy loading.
- Codegen = Automatic interface generation.
- Bridgeless = No legacy Bridge dependency.

---

## 9. Practical Payment Application Scenario

Imagine an NPCI UPI application.

| Requirement | Related concept |
|---|---|
| JavaScript needs to interact with native functionality | JSI |
| Payment screen UI needs to update | Fabric |
| Load biometric module when required | TurboModules |
| Generate native interfaces from typed specifications | Codegen |
| Run without legacy Bridge infrastructure | Bridgeless Mode |
| Understand old JS/native communication | Legacy Bridge |

---

## 10. Questions Practised and Answers

**Q1. How does JavaScript communicate with native modules in the legacy architecture?**

Answer: Through the Bridge using asynchronous message passing and serialization.

**Q2. What is the limitation of the old Bridge?**

Answer: Serialization and asynchronous message passing can introduce communication overhead, especially with frequent messages or large amounts of data.

**Q3. What is the difference between Bridge and JSI?**

Answer: Bridge uses serialized asynchronous message passing, whereas JSI provides a C++ interface for more direct interaction between JavaScript and native functionality.

**Q4. What is Fabric responsible for?**

Answer: Fabric is the new rendering system that works with React reconciliation to commit UI updates to native views.

**Q5. What are TurboModules?**

Answer: TurboModules are the new native module system and support lazy loading.

**Q6. What is lazy loading?**

Answer: Loading or initializing a module only when it is required.

**Q7. What is Codegen?**

Answer: It generates native interface code based on typed JavaScript or TypeScript specifications.

**Q8. What is Bridgeless Mode?**

Answer: Running React Native without depending on the legacy Bridge infrastructure.

**Q9. Which component loads the biometric module only when required?**

Answer: TurboModules.

---

## 11. Learning Progress

| Topic | Current status |
|---|---|
| Legacy Bridge | Understood |
| JSI | Understood |
| Fabric | Understood |
| TurboModules | Understood |
| Codegen | Understood |
| Bridgeless Mode | Understood |
| Practical architecture scenarios | Needs revision |

**Note:** Concepts are understood at the fundamentals level. Revisit them through practical scenarios before marking them mastered.

---

## 12. Next Topics to Cover

### React Native Threads and Performance

1. JavaScript Thread.
2. UI Thread / Main Thread.
3. Shadow Thread.
4. What happens when the JavaScript thread is blocked?
5. Difference between JS thread and UI thread.
6. How to identify and fix performance issues.
7. FlatList optimization.
8. React.memo, useMemo and useCallback.
9. Payment screen performance scenarios.

**Current checkpoint:** React Native Architecture and New Architecture fundamentals completed. Resume with **Lesson 1 – JavaScript Thread**.

**Learning rule:** Learn one concept, understand the flow, use a practical React Native example, answer a knowledge-check question, and move forward only after understanding.

# PART 23 – REACT NATIVE THREADS AND PERFORMANCE (FUNDAMENTALS)

## 1. What are Threads in React Native?

React Native uses different threads to handle JavaScript execution, native UI operations and layout calculations.

Each thread has a different responsibility.

Understanding threads is important because blocking one thread can affect application performance.

### Main threads

| Thread | Responsibility |
|---|---|
| JavaScript Thread | Executes JavaScript code and React application logic |
| UI Thread / Main Thread | Handles native UI operations and view updates |
| Shadow Thread | Calculates component layouts using the Yoga layout engine |

---

## 2. JavaScript Thread

The JavaScript Thread is where most React Native JavaScript code executes.

### Responsibilities

- Executes JavaScript business logic.
- Processes event handlers such as `onPress`.
- Handles React state updates.
- Processes API responses.
- Executes React component rendering and reconciliation work.

### Example

```jsx
const handlePress = () => {
  console.log("Button clicked");

  setCount(prevCount => prevCount + 1);
};
```

When the user presses a button, JavaScript executes the event handler and processes the state update.

### What happens when the JavaScript Thread is blocked?

Consider a heavy synchronous calculation:

```jsx
const handlePress = () => {
  let total = 0;

  for (let i = 0; i < 1000000000; i++) {
    total += i;
  }

  console.log(total);
};
```

While this calculation executes, other JavaScript tasks must wait.

### Possible effects

- Button actions become delayed.
- API response handling gets delayed.
- React state updates are delayed.
- JS-driven animations may become jerky.

**Important:** The app does not automatically move heavy JavaScript calculations to the UI Thread.

### How to prevent blocking?

- Avoid heavy synchronous calculations.
- Optimise unnecessary component re-renders.
- Use FlatList for large lists.
- Use React.memo, useMemo and useCallback appropriately.
- Move suitable heavy processing to native modules or background processing where appropriate.

---

## 3. UI Thread / Main Thread

The UI Thread is responsible for native UI operations.

### Responsibilities

- Handles native view operations.
- Displays and updates native UI components.
- Processes native touch interactions.
- Supports native-driven animations.

### Example

Consider a payment screen displaying a Pay Now button.

The native UI is displayed and managed through UI operations.

### Important performance concept

If a native-driven animation is already running on the UI Thread, it can continue even when the JavaScript Thread is busy.

This is because the UI Thread and JavaScript Thread have separate responsibilities.

---

## 4. Shadow Thread

The Shadow Thread is responsible for calculating the layout of React Native components.

React Native uses the Yoga layout engine to calculate layouts based on Flexbox rules.

### Responsibilities

- Calculates component positions.
- Calculates width and height.
- Handles alignment.
- Calculates layout based on parent and child relationships.

### Example

```jsx
<View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <Text>Pay Now</Text>
</View>
```

The layout system calculates where the Text component should appear and how it should be positioned.

---

## 5. Difference Between JavaScript, UI and Shadow Threads

| Feature | JavaScript Thread | UI Thread | Shadow Thread |
|---|---|---|---|
| Main responsibility | JS execution | Native UI operations | Layout calculation |
| Handles business logic | Yes | No | No |
| Handles JS event handlers | Yes | No | No |
| Handles native UI operations | No | Yes | No |
| Calculates layout | No | No | Yes |
| Example | Button handler | Native button display | Button positioning |

### Simplified conceptual flow

```text
User Interaction
       |
       v
JavaScript Thread
       |
       v
React State / Rendering
       |
       v
Layout Calculation
(Shadow / Yoga)
       |
       v
UI Thread
       |
       v
Native UI Update
```

**Note:** This is a simplified conceptual flow. Actual scheduling and rendering in the New Architecture are more sophisticated.

---

## 6. Real-world Payment Application Scenario

Imagine a BHIM-like payment application.

The user opens the payment history screen containing thousands of transactions.

If the JavaScript Thread performs a heavy synchronous calculation:

1. JavaScript becomes busy.
2. User taps the Pay button.
3. The JavaScript event handler may be delayed.
4. API response processing may also be delayed.
5. The screen may feel unresponsive.

A native-driven animation may still continue on the UI Thread.

### Technical discussion answer

"If the JavaScript Thread is blocked by heavy synchronous operations, JavaScript event handlers, state updates and API response processing can be delayed. This can make the application feel unresponsive. We should optimise JavaScript execution, reduce unnecessary renders and use efficient list rendering."

---

## 7. ScrollView vs FlatList

Consider a payment history screen containing 5,000 transactions.

### ScrollView

- Renders all its children.
- Can consume more memory with large lists.
- Not ideal for very large datasets.

### FlatList

- Uses virtualisation.
- Renders items around the visible area and manages other items as needed.
- More suitable for large lists.
- Provides performance-related configuration options.

| Feature | ScrollView | FlatList |
|---|---|---|
| Rendering | All children | Virtualised list |
| Large datasets | Less suitable | More suitable |
| Memory usage | Can be higher | More efficient when configured properly |
| Best use | Small static content | Large or dynamic lists |

### Example – FlatList

```jsx
import React from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';

const transactions = [
  { id: '1', amount: 500 },
  { id: '2', amount: 1200 },
  { id: '3', amount: 800 },
];

const TransactionList = () => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>₹{item.amount}</Text>
        </View>
      )}
    />
  );
};

export default TransactionList;
```

### Important FlatList properties

| Property | Purpose |
|---|---|
| data | Array of records |
| renderItem | Defines how each item is displayed |
| keyExtractor | Provides a unique key for each item |
| initialNumToRender | Number of items rendered initially |
| maxToRenderPerBatch | Number of items rendered in each batch |
| windowSize | Controls the number of visible-area windows rendered |
| getItemLayout | Provides item dimensions when layout is fixed |

### Optimisation example

```jsx
<FlatList
  data={transactions}
  keyExtractor={(item) => item.id}
  renderItem={renderTransaction}
  initialNumToRender={10}
  windowSize={5}
/>
```

These properties should be tuned based on actual performance testing and item size.

---

## 8. Questions Practised

**Q1. What is the JavaScript Thread?**

Answer: It executes JavaScript code, business logic, event handlers and React application work.

**Q2. What happens when the JavaScript Thread is blocked?**

Answer: JavaScript interactions, state updates and API response handling may be delayed.

**Q3. What is the responsibility of the UI Thread?**

Answer: It handles native UI operations and supports native-driven animations.

**Q4. Can a native-driven animation continue when the JavaScript Thread is blocked?**

Answer: Yes. It can continue on the UI Thread independently of JavaScript execution.

**Q5. What is the Shadow Thread?**

Answer: It handles component layout calculations using the Yoga layout engine.

**Q6. What happens if we use ScrollView for 5,000 transaction records?**

Answer: All children may be rendered, increasing rendering work and memory usage.

**Q7. Which component is suitable for large lists?**

Answer: FlatList, because it uses virtualisation.

---

## 9. Learning Progress

| Topic | Status |
|---|---|
| JavaScript Thread | Fundamentals understood |
| UI Thread | Fundamentals understood |
| Shadow Thread | Fundamentals understood |
| JS Thread blocking | Fundamentals understood |
| Native-driven animations | Fundamentals understood |
| ScrollView vs FlatList | Fundamentals understood |
| FlatList optimisation properties | Introduced; needs practical revision |
| React.memo | Pending |
| useMemo | Pending |
| useCallback | Pending |
| Payment screen performance | Pending practical scenarios |

**Note:** These topics are understood at the foundational level. Practical scenarios and further revision are needed before marking them mastered.

---

## 10. Next Topics to Cover

1. FlatList optimisation in more detail.
2. React.memo.
3. useMemo.
4. useCallback.
5. Avoiding unnecessary re-renders.
6. React Native performance debugging.
7. Payment screen performance scenarios.

**Learning rule:** Understand one concept, see a practical example, answer a knowledge-check question and then continue.

# PART 24 – NATIVE INTEGRATION AND MOBILE APP LIFECYCLE

## 1. Native Integration in React Native

React Native allows JavaScript/TypeScript code to access native Android and iOS capabilities through native APIs and native modules.

Examples of native functionality:

- Biometric authentication.
- Secure storage.
- Camera and location.
- Push notifications.
- Deep linking.
- Platform-specific functionality.

### Android and iOS examples

| Feature | Android | iOS |
|---|---|---|
| Biometric authentication | BiometricPrompt | LocalAuthentication |
| Secure storage | Android Keystore-backed storage | Keychain |
| Native platform | Android APIs | iOS APIs |

**Remember:** React Native provides the application interface, while native modules provide access to platform-specific functionality.

## 2. App Lifecycle

A mobile application can move between different lifecycle states.

| State | Meaning |
|---|---|
| Active | App is currently in the foreground |
| Background | App is not currently visible |
| Inactive | Temporary inactive state, mainly relevant on iOS |
| Terminated | App process has stopped |

### Example

Suppose a user opens a payment application, switches to another app and then returns.

1. App starts in the foreground.
2. User switches to another app.
3. Payment app moves to the background.
4. User returns to the payment app.
5. App becomes active again.

### Important distinction

- Background does not always mean the app process is terminated.
- When the process is terminated, in-memory component state may be lost.
- Important payment information should be stored and tracked by the backend, not only in React Native state.

## 3. AppState API

React Native provides the `AppState` API to detect application lifecycle changes.

### Example

```jsx
import React, { useEffect } from 'react';
import { AppState, Text } from 'react-native';

const AppLifecycle = () => {

  useEffect(() => {

    const subscription = AppState.addEventListener(
      'change',
      (state) => {
        console.log('App state:', state);
      }
    );

    return () => subscription.remove();

  }, []);

  return <Text>App Lifecycle Example</Text>;
};

export default AppLifecycle;
```

### Important points

- `AppState.currentState` gives the current app state.
- `AppState.addEventListener('change', callback)` listens for changes.
- `subscription.remove()` removes the listener and prevents unnecessary subscriptions.

**Remember:** AppState helps detect whether the application is active or in the background.

## 4. Payment Application Scenario

Suppose a user initiates a payment and closes the app while the transaction is pending.

What should happen?

1. Backend continues tracking the transaction.
2. Payment status is stored on the backend.
3. User reopens the application.
4. App becomes active.
5. React Native fetches the latest payment status from the backend.
6. App displays SUCCESS, FAILED or PENDING.

**Important:** Do not depend only on `useState` for important payment transaction information.

---

# PART 25 – MOBILE APPLICATION SECURITY

## 1. HTTPS and TLS

**HTTPS** is HTTP communication protected using TLS encryption.

It helps protect data exchanged between the mobile application and backend server.

Examples of sensitive information:

- Authentication tokens.
- User information.
- Transaction details.
- API request and response data.

**Remember:** HTTPS helps protect communication from interception and tampering.

## 2. Certificate Pinning

Certificate pinning adds an additional server identity check.

The application checks whether the server's certificate or public key matches an expected value configured in the application.

### Purpose

- Helps protect against certain Man-in-the-Middle (MITM) attacks.
- Adds an additional layer of server identity verification.

| HTTPS/TLS | Certificate Pinning |
|---|---|
| Encrypts network communication and validates the server certificate chain | Adds an application-specific certificate or public-key check |
| Standard secure communication | Additional security control |

**Remember:** Certificate pinning does not replace HTTPS.

## 3. Secure Token Storage

Authentication tokens should be stored using secure platform-backed storage.

| Platform | Secure storage |
|---|---|
| Android | Keystore-backed secure storage |
| iOS | Keychain |

Avoid storing sensitive authentication tokens in plain-text files or hardcoding them in application source code.

### Important distinction

- AsyncStorage is commonly used for non-sensitive persistent application data.
- Keychain/Keystore-backed storage is preferred for sensitive credentials and tokens.

## 4. API Secret Key Protection

Private API secret keys must never be stored inside the React Native application.

### Why?

- Mobile application code can be inspected.
- Application packages can be reverse-engineered.
- Hardcoded secrets can potentially be extracted.

### Correct approach

Store private API keys on the backend using:

- Environment variables.
- A secure secrets manager.
- Appropriate access controls.

**Remember:** React Native frontend = public client. Backend = place for private API secrets.

## 5. UPI PIN Protection

The React Native application must never collect or store the user's UPI PIN.

The UPI PIN is entered through the trusted UPI authorization flow.

Never store a UPI PIN in:

- AsyncStorage.
- React state.
- Local files.
- Application database.

## 6. Man-in-the-Middle (MITM) Attack

A MITM attack occurs when an attacker attempts to intercept or manipulate communication between two parties.

### Example

A mobile application communicates with its backend server. An attacker attempts to intercept the communication and access or modify information.

### Protection methods

- HTTPS/TLS.
- Certificate validation.
- Certificate pinning where appropriate.
- Proper authentication and authorization.
- Secure backend implementation.

## 7. Authentication vs Authorization

| Authentication | Authorization |
|---|---|
| Verifies who the user is | Checks what the user is allowed to access |
| Login, OTP, biometrics | Roles and permissions |
| Example: Is this the correct user? | Example: Can this user access the admin screen? |

**Remember:** Authentication = Who are you? Authorization = What can you access?

## 8. JWT – JSON Web Token

JWT is commonly used to transmit claims between parties, especially for authentication and authorization.

A JWT has three parts:

```text
Header.Payload.Signature
```

| Part | Purpose |
|---|---|
| Header | Token type and signing algorithm |
| Payload | Claims such as user ID and expiry |
| Signature | Helps verify token integrity and authenticity |

### Important security points

- JWT payload is usually Base64URL-encoded, not encrypted by default.
- Never store passwords or UPI PINs in a JWT payload.
- Backend must verify the token signature.
- Validate expiration and relevant claims such as issuer and audience.

**Remember:** JWT signature verification must happen on the backend, not only in the frontend.

## 9. Access Token vs Refresh Token

| Access Token | Refresh Token |
|---|---|
| Used to access protected APIs | Used to obtain a new access token |
| Usually short-lived | Usually longer-lived |
| Sent with protected API requests | Sent to the refresh endpoint |

Refresh tokens should be stored securely and rotated or revoked where supported.

## 10. OWASP

**OWASP = Open Worldwide Application Security Project.**

OWASP provides security guidance, tools and resources for application security.

OWASP Top 10 highlights important application security risks.

Examples:

- Broken Access Control.
- Injection.
- Security Misconfiguration.
- Identification and Authentication Failures.

## 11. SQL Injection

SQL Injection is an attack where malicious SQL statements are inserted into database queries.

### Unsafe example

```javascript
const query =
  `SELECT * FROM users WHERE email = '${email}'`;
```

Directly inserting user input into a SQL query can allow an attacker to manipulate the query.

### Prevention: Parameterized Queries

```javascript
const [rows] = await db.execute(
  'SELECT * FROM users WHERE email = ?',
  [email]
);
```

The `?` placeholder keeps user input separate from SQL instructions.

**Remember:** Use parameterized queries instead of directly concatenating user input into SQL.

## 12. Payment Status Verification

Suppose the React Native application receives a callback saying:

```text
SUCCESS
```

Should the backend immediately trust this callback?

**No.** The backend must independently verify payment status using a trusted payment provider's authenticated webhook or status API.

### Recommended payment flow

```text
React Native App
       |
       v
Node.js Backend
       |
       v
Payment Provider
       |
       v
Backend Verification
       |
       v
Update MySQL Status
       |
       v
React Native Fetches Status
```

### Important points

- Never trust frontend payment callbacks alone.
- Verify payment status on the backend.
- Store the verified transaction status.
- Display the latest backend status in the application.

## 13. Idempotency Key

An idempotency key helps prevent duplicate processing of the same payment request.

### Example

```javascript
const paymentRequest = {
  amount: 500,
  idempotencyKey: 'PAYMENT-12345'
};
```

If the same request is submitted again with the same key, the backend should return the existing transaction result instead of processing another payment.

### Important points

- Idempotency must be enforced on the backend.
- Use a unique database constraint or equivalent transaction-safe mechanism.
- Frontend button disabling is useful for user experience but is not sufficient for financial protection.

**Remember:** Frontend protection improves user experience. Backend idempotency protects the actual payment transaction.

---

# PART 26 – JEST TESTING AND CI/CD FUNDAMENTALS

## 1. What is Jest?

Jest is a JavaScript testing framework commonly used to test JavaScript functions and React Native application logic.

It helps verify whether code behaves as expected.

### Example function

```javascript
const addAmount = (a, b) => {
  return a + b;
};

export default addAmount;
```

### Jest test

```javascript
import addAmount from './addAmount';

test('adds two amounts correctly', () => {
  expect(addAmount(100, 200)).toBe(300);
});
```

### Important Jest functions

| Function | Purpose |
|---|---|
| `test()` | Defines a test case |
| `expect()` | Specifies the value to check |
| `toBe()` | Checks whether the result matches the expected value |
| `describe()` | Groups related test cases |

### Explanation

```javascript
expect(addAmount(100, 200)).toBe(300);
```

1. Calls `addAmount(100, 200)`.
2. Gets the result `300`.
3. Checks whether the result is equal to the expected value `300`.

### Types of testing

| Type | Meaning |
|---|---|
| Unit Testing | Tests an individual function or component |
| Integration Testing | Tests how multiple parts work together |
| End-to-End Testing | Tests a complete user flow |

**Remember:** Jest is a testing framework. React Native Testing Library can be used alongside Jest to test React Native components.

**Learning status:** Jest fundamentals introduced. Component testing, API mocking and advanced testing still need practice.

## 2. What is CI/CD?

CI/CD automates the process of building, testing and delivering software.

**CI = Continuous Integration**

- Developers push code to Git.
- Automated build starts.
- Tests run.
- Code changes are checked.

**CD = Continuous Delivery / Continuous Deployment**

- Application artifacts are prepared for release.
- Deployment can be automated depending on the pipeline.

## 3. What is Jenkins?

Jenkins is an automation server commonly used to build CI/CD pipelines.

### Example: React Native project

```text
Developer pushes code to Git
             |
             v
      Jenkins Pipeline
             |
             v
    Install Dependencies
             |
             v
       Build Application
             |
             v
        Run Jest Tests
             |
             v
       Quality Checks
             |
             v
    Generate APK / AAB
```

### Benefits

- Automates builds.
- Runs automated tests.
- Integrates quality checks.
- Reduces manual deployment steps.
- Helps maintain a consistent release process.

**Remember:** Jenkins = Automation of build, test and deployment workflows.

---

# PART 27 – RECENT PREPARATION PROGRESS

## Topics Practised

| Topic | Status |
|---|---|
| React Native New Architecture | Practised – fundamentals |
| JavaScript, UI and Shadow Threads | Practised |
| FlatList and performance optimization | Practised |
| React.memo, useMemo and useCallback | Practised |
| JavaScript Event Loop and Promises | Practised |
| TypeScript fundamentals | Practised |
| Native integration concepts | Practised |
| App lifecycle and AppState | Practised |
| HTTPS and TLS | Practised |
| Certificate pinning | Practised |
| Secure token storage | Practised |
| API secret management | Practised |
| UPI PIN protection | Practised |
| MITM attacks | Practised |
| Authentication and Authorization | Practised |
| JWT and refresh tokens | Practised |
| OWASP and SQL Injection | Practised |
| Payment verification | Practised |
| Idempotency keys | Practised |
| Jest fundamentals | Introduced |
| Jenkins and CI/CD | Introduced |

## Important Pending Topics

1. Jest component testing and API mocking.
2. Docker and containers.
3. Kubernetes fundamentals.
4. Gradle, Maven and Groovy basics.
5. SonarQube and Checkmarx.
6. HLD and LLD for mobile applications.
7. RxJS – revisit from the basics.
8. Revision of React Native architecture and performance.
9. Revision of UPI payment lifecycle and security.

**Current checkpoint:** Mobile security fundamentals have been practised. Jest and DevOps have been introduced but need further coverage. RxJS is paused for now and can be revisited later.

**Preparation rule:** Focus on understanding concepts, explaining practical scenarios and connecting them to React Native payment application development.


-------------------------------------------
# PART 28 – JEST AND REACT NATIVE TESTING (CONTINUED)

## 1. Jest – Basic Testing

Jest is a JavaScript testing framework used to test JavaScript functions and application logic.

### Example

```javascript
function add(a, b) {
  return a + b;
}

test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

### Important Jest functions

| Function | Purpose |
|---|---|
| `test()` | Defines a test case |
| `expect()` | Defines the expected result |
| `toBe()` | Checks primitive equality |
| `toEqual()` | Checks object/array equality |
| `describe()` | Groups related tests |
| `jest.fn()` | Creates a mock function |

## 2. Unit Testing vs Integration Testing

| Unit Testing | Integration Testing |
|---|---|
| Tests an individual function or component | Tests multiple parts working together |
| Focuses on one unit | Focuses on interaction between units |
| Example: Email validation | Example: Login form + API response |

Remember:
- Unit testing = Individual functionality.
- Integration testing = Combined functionality.

## 3. React Native Testing Library (RNTL)

React Native Testing Library helps test React Native components from the user's perspective.

### Example

```javascript
import { render, screen } from '@testing-library/react-native';

test('Login button is displayed', () => {
  render(<LoginScreen />);

  expect(
    screen.getByText('Login')
  ).toBeTruthy();
});
```

### Important methods

| Method | Purpose |
|---|---|
| `render()` | Renders the component |
| `screen.getByText()` | Finds an element by text |
| `screen.getByTestId()` | Finds an element by test ID |
| `screen.queryByText()` | Checks whether an element exists |
| `screen.findByText()` | Finds an element asynchronously |
| `fireEvent.press()` | Simulates a button press |

Remember:
- Jest = Runs tests and assertions.
- RNTL = Helps render and interact with React Native components.

## 4. getByText vs queryByText vs findByText

This is an important testing concept.

| Method | Behaviour |
|---|---|
| `getByText()` | Finds immediately; throws an error if missing |
| `queryByText()` | Returns `null` if missing |
| `findByText()` | Waits asynchronously for the element to appear |

### Examples

```javascript
// Throws an error if Login is missing
screen.getByText('Login');

// Returns null if Logout is missing
screen.queryByText('Logout');

// Waits for Vignesh to appear
await screen.findByText('Vignesh');
```

### When to use?

**getByText():** When the element should already exist.

**queryByText():** When checking whether an element is absent.

```javascript
expect(
  screen.queryByText('Logout')
).toBeNull();
```

**findByText():** When an element appears after an asynchronous operation, such as an API response.

```javascript
const user = await screen.findByText('Vignesh');

expect(user).toBeTruthy();
```

## 5. API Mocking in Jest

Mocking means replacing an actual dependency with a controlled test implementation.

In React Native, we commonly mock API functions instead of calling production APIs during tests.

### Successful API response

```javascript
jest.mock('./api', () => ({
  loginUser: jest.fn().mockResolvedValue({
    success: true,
    token: 'test-token'
  })
}));
```

`mockResolvedValue()` simulates a successful Promise response.

### Failed API response

```javascript
jest.mock('./api', () => ({
  fetchUsers: jest.fn().mockRejectedValue(
    new Error('Network Error')
  )
}));
```

`mockRejectedValue()` simulates a rejected Promise.

### Important methods

| Method | Purpose |
|---|---|
| `jest.fn()` | Creates a mock function |
| `mockResolvedValue()` | Simulates Promise success |
| `mockRejectedValue()` | Simulates Promise failure |
| `jest.clearAllMocks()` | Clears mock call history |

Remember:
- Resolved = Success.
- Rejected = Failure.

## 6. Asynchronous API Testing – waitFor()

API calls are asynchronous. The UI may update after the API response arrives.

`waitFor()` waits until a specified condition becomes true or times out.

### Example

```javascript
import {
  render,
  screen,
  waitFor
} from '@testing-library/react-native';

test('displays fetched user', async () => {
  render(<UsersScreen />);

  await waitFor(() => {
    expect(
      screen.getByText('Vignesh')
    ).toBeTruthy();
  });
});
```

### Important concepts

| Concept | Purpose |
|---|---|
| `async/await` | Handles asynchronous operations |
| `waitFor()` | Waits for an expected condition |
| `findByText()` | Waits for an element to appear |
| `mockResolvedValue()` | Simulates API success |
| `mockRejectedValue()` | Simulates API failure |

Remember:
- Use `waitFor()` when checking an asynchronous condition.
- Use `findByText()` when waiting for an element to appear.
- Avoid arbitrary `setTimeout()` delays in tests.

## 7. Snapshot Testing

Snapshot testing captures a rendered component's output and compares it with a previously saved snapshot.

### Example

```jsx
<Button title="Login" />
```

A snapshot records the rendered structure.

If someone unexpectedly changes the button text from `Login` to `Submit`, the snapshot test can detect the change.

### Benefits

- Detects unexpected UI structure changes.
- Identifies accidental modifications.
- Helps maintain component consistency.

Important:
Snapshot testing does not guarantee that the UI looks visually correct or behaves correctly.

## 8. Code Coverage

Code Coverage measures how much of the source code is executed by tests.

### Types of Code Coverage

| Type | Meaning |
|---|---|
| Statement Coverage | Checks whether statements were executed |
| Branch Coverage | Checks whether different conditional paths were executed |
| Function Coverage | Checks whether functions were called |
| Line Coverage | Checks whether lines were executed |

### Example

```javascript
function checkAge(age) {
  if (age >= 18) {
    return 'Adult';
  }

  return 'Minor';
}
```

If the test checks only:

```javascript
checkAge(20);
```

The `Minor` branch is not tested.

We should also test:

```javascript
checkAge(15);
```

Remember:
100% code coverage does not guarantee bug-free code. It only indicates how much code was executed by tests.

## 9. Testing User Interactions – fireEvent.press()

`fireEvent.press()` simulates a user pressing a button.

### Example

```javascript
import {
  render,
  fireEvent,
  screen
} from '@testing-library/react-native';

test('button click updates text', () => {
  render(<LoginScreen />);

  fireEvent.press(
    screen.getByText('Login')
  );

  expect(
    screen.getByText('Welcome')
  ).toBeTruthy();
});
```

### Execution flow

1. `render()` – Renders the component.
2. `getByText()` – Finds the Login button.
3. `fireEvent.press()` – Simulates a button press.
4. `expect()` – Checks the expected result.

## 10. Testing Loading, Success and Error States

When an API is called, the application usually has three UI states.

### Loading State

The API request is in progress.

```jsx
{loading && <ActivityIndicator />}
```

### Success State

The API returns successfully.

```jsx
{!loading && <Text>Users loaded</Text>}
```

### Error State

The API request fails.

```jsx
{error && <Text>Something went wrong</Text>}
```

### What should we test?

| State | Expected behaviour |
|---|---|
| Loading | ActivityIndicator appears |
| Success | Loading indicator disappears and data appears |
| Error | Error message appears |

Important:
Test the UI behaviour for API success, API failure and loading states.

## 11. Jest Lifecycle Methods

Jest provides lifecycle methods to execute setup and cleanup logic.

| Method | Execution |
|---|---|
| `beforeEach()` | Runs before every test |
| `afterEach()` | Runs after every test |
| `beforeAll()` | Runs once before all tests |
| `afterAll()` | Runs once after all tests |

### Example – beforeEach()

```javascript
beforeEach(() => {
  console.log('Starting test');
});
```

Runs before every test case.

### Example – afterEach()

```javascript
afterEach(() => {
  jest.clearAllMocks();
});
```

Runs after every test case.

### Example – beforeAll()

```javascript
beforeAll(() => {
  console.log('Setup once');
});
```

Runs once before all test cases.

### Example – afterAll()

```javascript
afterAll(() => {
  console.log('Cleanup once');
});
```

Runs once after all test cases.

Remember:
- beforeEach = Before every test.
- afterEach = After every test.
- beforeAll = Once before all tests.
- afterAll = Once after all tests.

## 12. Important Testing Revision Table

| Question | Answer |
|---|---|
| Which framework is used for JavaScript testing? | Jest |
| What tests React Native components? | RNTL |
| What simulates button press? | `fireEvent.press()` |
| What simulates API success? | `mockResolvedValue()` |
| What simulates API failure? | `mockRejectedValue()` |
| What waits for an asynchronous condition? | `waitFor()` |
| What waits for an element to appear? | `findByText()` |
| What returns null when an element is missing? | `queryByText()` |
| What captures rendered component output? | Snapshot Testing |
| What measures executed code? | Code Coverage |
| What runs before every test? | `beforeEach()` |
| What runs after every test? | `afterEach()` |
| What runs once before all tests? | `beforeAll()` |
| What runs once after all tests? | `afterAll()` |

## 13. Recent Learning Progress

| Topic | Status |
|---|---|
| Jest fundamentals | Practised |
| Unit vs Integration testing | Practised |
| React Native Testing Library | Practised |
| API mocking – success/failure | Practised |
| Async testing – waitFor() | Practised |
| Snapshot testing | Practised |
| Code Coverage | Practised |
| User interactions | Practised |
| Loading and Error states | Practised |
| getByText / queryByText / findByText | Practised |
| Jest lifecycle methods | Needs revision |

### Areas to revisit

1. Difference between `beforeEach()` and `beforeAll()`.
2. Difference between `afterEach()` and `afterAll()`.
3. Practise one complete component testing example.
4. Practise testing API success, loading and error states.

### Preparation Strategy

Since preparation time is limited:

- Do not spend too much time on advanced Jest topics.
- Revise the important methods and their use cases.
- Practise one practical component testing example.
- Prioritise React Native performance, JavaScript, native integrations, payment security and architecture.

**Current checkpoint:** Jest and React Native Testing Library fundamentals have been practised. Lifecycle methods need revision. Continue with the next high-priority React Native performance topic.
