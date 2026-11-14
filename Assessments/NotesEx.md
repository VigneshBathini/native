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
