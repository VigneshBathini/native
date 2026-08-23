# 08 — Express.js, SQL Fundamentals, OS, and SDLC Basics
This file covers what the Infosys JD explicitly asks for that wasn't in your zip at all: "advanced conceptual understanding of one Programming Language, one Database, and one Operating System," plus SDLC. Kept simple and foundational — this is the "make sure you're not caught off guard" layer, not deep specialization.

---

## PART 1 — Express.js Basics

### What Express actually is
A minimal framework on top of Node.js's built-in `http` module. Without Express, you'd manually parse URLs, methods, and request bodies yourself. Express gives you routing, middleware, and request/response helpers so you don't reinvent that every time.

### The request-response cycle, plain and simple
```js
const express = require('express');
const app = express();

app.use(express.json()); // middleware: parses JSON body into req.body

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;   // from the URL path
  const filter = req.query.active; // from ?active=true
  res.json({ id: userId, name: 'Vignesh' });
});

app.listen(3000);
```
- `req.params` — values from the URL path (`/users/:id` → `req.params.id`)
- `req.query` — values after `?` in the URL (`?active=true`)
- `req.body` — the JSON/form data sent in a POST/PUT, only available if you used `express.json()` middleware first

### Middleware — the concept the JD is really testing when it says "understanding of Software Engineering"
**Definition:** a function that runs *between* the request coming in and the response going out. It can inspect/modify the request, and either pass control on with `next()` or stop the chain by sending a response.

```js
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // attach decoded user info for downstream routes
    next();                // continue to the actual route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.name}` });
});
```
**Why this matters:** this is the exact server-side counterpart to the axios interceptor you already know on the RN side. Client interceptor attaches the token before sending; server middleware verifies it before letting the request reach any protected route. Same idea, opposite ends of the request.

### Error handling middleware
Express treats a middleware with **4 parameters** (not 3) as an error handler, and it must be registered *last*:
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});
```

### REST API basics (say this fluently)
| Method | Purpose                 | Idempotent? |
|---     |---                      |---          |
| GET    | Read data               | Yes (calling it twice = same result) |
| POST   | Create new data         | No |
| PUT    | Replace/update entirely | Yes |
| PATCH  | Update partially        | No (usually) |
| DELETE | Remove data             | Yes |

**Route structure convention:** `/orders` (collection) vs `/orders/:id` (single item) — GET on the first lists all, GET on the second fetches one.

### Interview one-liner
"Express routes handle the actual endpoint logic, and middleware runs before that — I use it for things like JWT verification, so any protected route just trusts `req.user` is already there by the time its own code runs."

---

## PART 2 — SQL Fundamentals (before joins/upserts from file 07)

### Tables, rows, keys
- **Primary key** — a column (or set of columns) that uniquely identifies each row. No duplicates, never null. Example: `user_id` in a `users` table.
- **Foreign key** — a column in one table that references a primary key in another, linking the two. Example: `orders.user_id` references `users.id` — this is *how* a database enforces "this order must belong to a real user."

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  amount DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### The core query shape, explained line by line
```sql
SELECT name, amount            -- which columns to return
FROM orders                    -- which table
WHERE amount > 100              -- filter rows
ORDER BY amount DESC            -- sort
LIMIT 10;                       -- cap results
```

### Aggregate functions
`COUNT()`, `SUM()`, `AVG()`, `MAX()`, `MIN()` — always used with `GROUP BY` when you want a value *per group* rather than one number for the whole table:
```sql
-- total revenue per user, not one grand total
SELECT user_id, SUM(amount) AS total_spent
FROM orders
GROUP BY user_id;
```
**Common mixup to avoid:** `WHERE` filters rows *before* grouping; `HAVING` filters groups *after* aggregation.
```sql
SELECT user_id, SUM(amount) AS total_spent
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 1000;   -- only groups where the total exceeds 1000
```

### Normalization — why data gets split across tables instead of one big table
**Plain-English definition:** organizing data so each fact is stored in exactly one place, avoiding repeated/duplicated data that can go out of sync.

**Example of the problem (unnormalized):** if you store `customer_name` on every single order row, and that customer's name changes, you now have to update hundreds of rows instead of one. **Fix:** store customers in their own table with an ID, and reference that ID from `orders`. This is exactly why your AFMC/Optics apps have separate `customers`, `orders`, and `order_items` tables instead of one flat table.

### Indexes — why some queries are fast and others aren't
**Definition:** a separate, sorted structure the database keeps so it can find rows without scanning the entire table — like a book's index versus reading every page.
```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
```
**Trade-off to mention if asked:** indexes make reads faster but writes (INSERT/UPDATE) slightly slower, since the index also has to update. You index columns you filter/join on often (like `user_id`), not every column.

### Interview one-liner
"I think about SQL in terms of keeping each fact in one place — normalized tables linked by foreign keys — and reaching for indexes on columns I filter or join on frequently, since that's the difference between a query scanning the whole table versus jumping straight to the right rows."

---

## PART 3 — Operating System Basics (JD explicitly asks for "one Operating System")

You don't need OS internals depth — just be able to hold a basic conversation if it comes up.

### Process vs Thread
- **Process** — an independently running program with its own memory space. Two processes can't directly access each other's memory.
- **Thread** — a unit of execution *within* a process. Threads in the same process share memory, which makes communication easy but also means one thread's bug can corrupt shared data.

**Tie this to something you actually know:** "Node.js runs JavaScript on a single thread, but the actual I/O work — file reads, network calls, DB queries — is handled by the libuv thread pool behind the scenes. That's why Node can handle thousands of concurrent requests without spinning up a thread per request — the main thread isn't blocked waiting on I/O."

### Memory: Stack vs Heap
- **Stack** — fixed-size, fast, stores function calls and local variables. Automatically cleaned up when a function returns.
- **Heap** — larger, flexible, stores objects/data that need to live beyond a single function call. Managed by garbage collection in JS.

### Concurrency vs Parallelism (commonly confused, worth having crisp)
- **Concurrency** — dealing with multiple tasks by switching between them (doesn't require multiple cores). This is what JS's event loop does.
- **Parallelism** — actually running multiple tasks at the exact same time (requires multiple cores/threads).

**One-liner:** "JavaScript is single-threaded and achieves concurrency through the event loop and callback queue, not true parallelism — that's why a long synchronous loop blocks everything else, even async code that's technically 'waiting.'"

### Deadlock (definition only, rarely goes deeper at this level)
Two or more processes stuck waiting on each other to release a resource, so neither ever proceeds. Classic example: Process A holds Resource 1 and waits for Resource 2; Process B holds Resource 2 and waits for Resource 1.

---

## PART 4 — SDLC (the JD says "good understanding of SDLC")

### The phases, plain and short
1. **Requirement gathering** — understand what needs to be built and why
2. **Design** — plan architecture, data models, API contracts before writing code
3. **Development** — actual coding, following the design
4. **Testing** — QA, unit/integration tests, catching bugs before release
5. **Deployment** — releasing to production (for you: EAS Build, App Store/Play Store, OTA updates)
6. **Maintenance** — bug fixes, monitoring, incremental feature work after release — this is most of your actual day-to-day

### Agile, in one paragraph
Instead of doing all 6 phases once for the whole product (that's **Waterfall**), Agile breaks work into short cycles (**sprints**, usually 1-2 weeks) where you plan a small chunk, build it, test it, and ship it — then repeat. This is almost certainly what you already do day-to-day (tickets → dev → review → QA → deploy), even if nobody explicitly called it "Agile" out loud.

### Interview one-liner
"Day to day I work in short cycles — pick up a ticket, build against the existing design, get it code-reviewed, QA tests it, and it ships — then the next cycle starts. That's Agile in practice even when it's not formally labeled that way on the team."

---

## Quick self-test (say these out loud)
1. What's the difference between middleware and a route handler in Express?
2. Why does an error-handling middleware need 4 parameters instead of 3?
3. What's a foreign key for, and why not just repeat the customer's name on every order row?
4. When would you use `HAVING` instead of `WHERE`?
5. Why can Node.js handle many concurrent requests despite being single-threaded?
6. What's the difference between concurrency and parallelism?
7. Name the 6 SDLC phases in order, and say which one your day-to-day work mostly lives in.
