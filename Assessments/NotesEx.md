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