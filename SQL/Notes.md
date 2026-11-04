# Complete SQL & MySQL Notes – Basics to Advanced

**Focus:** SQL Fundamentals | MySQL Syntax | Practical Queries | Technical Q&A | Coding Problems

---

# 1. Introduction to SQL

### What is SQL?

SQL stands for Structured Query Language. It is used to communicate with relational databases to store, retrieve, update and delete data.

### What is MySQL?

MySQL is a Relational Database Management System (RDBMS) that uses SQL.

### SQL vs MySQL

| SQL | MySQL |
|---|---|
| Query language | Database management system |
| Used to communicate with databases | Stores and manages data |
| Standard language | One implementation of SQL |

### Important Database Terms

| Term | Meaning |
|---|---|
| Database | Collection of tables |
| Table | Collection of related records |
| Row | Individual record |
| Column | Attribute of a record |
| Primary Key | Uniquely identifies a record |
| Foreign Key | Connects two tables |
| Schema | Structure of a database |
| Constraint | Rule applied to data |
| Index | Improves data retrieval speed |

---

# 2. Types of SQL Commands

| Category | Full Form | Commands | Purpose |
|---|---|---|---|
| DDL | Data Definition Language | CREATE, ALTER, DROP, TRUNCATE | Structure |
| DML | Data Manipulation Language | INSERT, UPDATE, DELETE | Modify data |
| DQL | Data Query Language | SELECT | Retrieve data |
| DCL | Data Control Language | GRANT, REVOKE | Permissions |
| TCL | Transaction Control Language | COMMIT, ROLLBACK, SAVEPOINT | Transactions |

### Interview Q&A

**Q1. What are the five types of SQL commands?**

Answer: DDL, DML, DQL, DCL and TCL.

**Q2. What is the difference between DDL and DML?**

Answer:
- DDL modifies database structure.
- DML modifies records stored inside tables.

**Q3. Is SELECT DML or DQL?**

Answer: SELECT is commonly classified as DQL, although some classifications include it under DML.

---

# 3. Database and Table Operations

### Create Database

```sql
CREATE DATABASE company;
```

### Select Database

```sql
USE company;
```

### Create Table

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    email VARCHAR(100) UNIQUE,
    joining_date DATE
);
```

### Display Tables

```sql
SHOW TABLES;
```

### Display Table Structure

```sql
DESCRIBE employees;
```

### Delete Database

```sql
DROP DATABASE company;
```

### Interview Q&A

**Q1. What is a database?**

Answer: A database is an organized collection of data that can be stored, accessed and managed.

**Q2. What is a table?**

Answer: A table stores data in rows and columns.

**Q3. What is AUTO_INCREMENT?**

Answer: It automatically generates a new numeric value when a record is inserted, typically for an ID column.

---

# 4. SQL Data Types

| Data Type | Purpose | Example |
|---|---|---|
| INT | Integer | 100 |
| BIGINT | Large integer | 100000 |
| DECIMAL(10,2) | Precise decimal | 1500.50 |
| FLOAT | Approximate decimal | 10.25 |
| VARCHAR(100) | Variable-length string | Rahul |
| CHAR(10) | Fixed-length string | ABC |
| TEXT | Long text | Description |
| DATE | Date | 2026-10-31 |
| TIME | Time | 10:30:00 |
| DATETIME | Date and time | 2026-10-31 10:30:00 |
| TIMESTAMP | Timestamp | Creation time |
| BOOLEAN | True/false-like value | TRUE |
| JSON | JSON data | {"name":"Rahul"} |

### Interview Q&A

**Q1. Difference between CHAR and VARCHAR?**

Answer:
- CHAR uses fixed-length storage.
- VARCHAR uses variable-length storage.
- VARCHAR is commonly used for names and emails.

**Q2. Difference between FLOAT and DECIMAL?**

Answer:
- FLOAT stores approximate numeric values.
- DECIMAL stores exact decimal values.
- DECIMAL is preferable for financial calculations.

**Q3. Difference between DATE, DATETIME and TIMESTAMP?**

Answer:
- DATE stores date only.
- DATETIME stores date and time.
- TIMESTAMP stores date and time with time-zone conversion behavior in MySQL.

---

# 5. CRUD Operations

CRUD means Create, Read, Update and Delete.

## INSERT – Create Records

```sql
INSERT INTO employees (name, department, salary, email)
VALUES ('Rahul', 'IT', 30000, 'rahul@gmail.com');
```

Insert multiple records:

```sql
INSERT INTO employees (name, department, salary)
VALUES
('Amit', 'HR', 25000),
('Priya', 'IT', 40000),
('Sneha', 'Finance', 35000);
```

## SELECT – Read Records

```sql
SELECT * FROM employees;
```

Retrieve specific columns:

```sql
SELECT name, salary
FROM employees;
```

## UPDATE – Modify Records

```sql
UPDATE employees
SET salary = 45000
WHERE id = 1;
```

## DELETE – Remove Records

```sql
DELETE FROM employees
WHERE id = 1;
```

### Interview Q&A

**Q1. What is CRUD?**

Answer: Create, Read, Update and Delete.

**Q2. What happens if UPDATE is executed without WHERE?**

Answer: Every row in the table will be updated.

**Q3. What happens if DELETE is executed without WHERE?**

Answer: All rows will be deleted, but the table structure remains.

**Q4. Can we insert multiple records in one query?**

Answer: Yes, using multiple VALUES clauses in a single INSERT statement.

---

# 6. WHERE Clause and Operators

WHERE filters records based on conditions.

```sql
SELECT *
FROM employees
WHERE salary > 30000;
```

### Comparison Operators

| Operator | Meaning |
|---|---|
| = | Equal |
| != or <> | Not equal |
| > | Greater than |
| < | Less than |
| >= | Greater than or equal |
| <= | Less than or equal |

### AND

```sql
SELECT *
FROM employees
WHERE department = 'IT'
AND salary > 30000;
```

### OR

```sql
SELECT *
FROM employees
WHERE department = 'IT'
OR department = 'HR';
```

### IN

```sql
SELECT *
FROM employees
WHERE department IN ('IT', 'HR');
```

### NOT IN

```sql
SELECT *
FROM employees
WHERE department NOT IN ('IT', 'HR');
```

### BETWEEN

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 20000 AND 40000;
```

BETWEEN includes both boundary values.

### LIKE

```sql
-- Starts with A
SELECT * FROM employees
WHERE name LIKE 'A%';

-- Ends with a
SELECT * FROM employees
WHERE name LIKE '%a';

-- Contains i
SELECT * FROM employees
WHERE name LIKE '%i%';

-- Exactly one character before ahul
SELECT * FROM employees
WHERE name LIKE '_ahul';
```

- % represents zero or more characters.
- _ represents exactly one character.

### IS NULL

```sql
SELECT *
FROM employees
WHERE salary IS NULL;
```

### IS NOT NULL

```sql
SELECT *
FROM employees
WHERE salary IS NOT NULL;
```

### Interview Q&A

**Q1. Difference between AND and OR?**

Answer:
- AND requires all conditions to be true.
- OR requires at least one condition to be true.

**Q2. Difference between IN and BETWEEN?**

Answer:
- IN checks whether a value matches one of the listed values.
- BETWEEN checks whether a value falls within a range, including the boundaries.

**Q3. Difference between % and _ in LIKE?**

Answer:
- % matches zero or more characters.
- _ matches exactly one character.

**Q4. Can we use = NULL?**

Answer: No. Use IS NULL or IS NOT NULL.

---

# 7. ORDER BY, DISTINCT and LIMIT

### ORDER BY

Sort ascending:

```sql
SELECT *
FROM employees
ORDER BY salary ASC;
```

Sort descending:

```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

### DISTINCT

Retrieve unique values:

```sql
SELECT DISTINCT department
FROM employees;
```

### LIMIT

Retrieve only five records:

```sql
SELECT *
FROM employees
LIMIT 5;
```

### OFFSET

Skip the first five records:

```sql
SELECT *
FROM employees
LIMIT 5 OFFSET 5;
```

### Interview Q&A

**Q1. Difference between ASC and DESC?**

Answer:
- ASC sorts in ascending order.
- DESC sorts in descending order.

**Q2. What is DISTINCT?**

Answer: DISTINCT removes duplicate result rows.

**Q3. What is LIMIT?**

Answer: LIMIT restricts the number of rows returned.

---

# 8. Aggregate Functions

Aggregate functions calculate values from multiple records.

| Function | Purpose |
|---|---|
| COUNT() | Count records |
| SUM() | Calculate total |
| AVG() | Calculate average |
| MIN() | Find minimum |
| MAX() | Find maximum |

### COUNT

```sql
SELECT COUNT(*) FROM employees;
```

### SUM

```sql
SELECT SUM(salary) FROM employees;
```

### AVG

```sql
SELECT AVG(salary) FROM employees;
```

### MIN and MAX

```sql
SELECT MIN(salary), MAX(salary)
FROM employees;
```

### Interview Q&A

**Q1. Difference between COUNT(*) and COUNT(column)?**

Answer:
- COUNT(*) counts all rows.
- COUNT(column) counts only non-NULL values in that column.

**Q2. Does AVG() consider NULL values?**

Answer: No. AVG() ignores NULL values.

**Q3. What happens when MAX() is used?**

Answer: It returns the highest non-NULL value in the selected column.

---

# 9. GROUP BY and HAVING

GROUP BY combines rows with the same values into groups.

### Department-wise Employee Count

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

### Department-wise Average Salary

```sql
SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department;
```

### HAVING

HAVING filters grouped results.

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

### WHERE vs HAVING

| WHERE | HAVING |
|---|---|
| Filters individual rows | Filters groups |
| Applied before GROUP BY | Applied after GROUP BY |
| Used for row conditions | Commonly used for aggregate conditions |

### Interview Q&A

**Q1. What is GROUP BY?**

Answer: GROUP BY groups rows that have the same values in specified columns.

**Q2. What is HAVING?**

Answer: HAVING filters groups created by GROUP BY.

**Q3. Can we use WHERE and HAVING together?**

Answer: Yes. WHERE filters rows before grouping, and HAVING filters the resulting groups.

**Q4. Can we use COUNT() with GROUP BY?**

Answer: Yes. It is commonly used to count records in each group.

---

# 10. SQL Joins

Joins combine data from multiple tables.

Assume two tables:

### employees

| id | name | department_id |
|---|---|---|
| 1 | Rahul | 101 |
| 2 | Amit | 102 |
| 3 | Priya | 101 |
| 4 | Sneha | 103 |

### departments

| department_id | department_name |
|---|---|
| 101 | IT |
| 102 | HR |
| 104 | Finance |

## INNER JOIN

Returns only matching records.

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id;
```

## LEFT JOIN

Returns all records from the left table and matching records from the right table.

```sql
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id;
```

## RIGHT JOIN

Returns all records from the right table and matching records from the left table.

```sql
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id;
```

## CROSS JOIN

Returns every possible combination.

```sql
SELECT e.name, d.department_name
FROM employees e
CROSS JOIN departments d;
```

## SELF JOIN

Joins a table with itself.

Example: Employee and manager relationship.

```sql
SELECT e.name AS employee,
       m.name AS manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.id;
```

## FULL OUTER JOIN

MySQL does not directly support FULL OUTER JOIN.

It can be emulated using LEFT JOIN and RIGHT JOIN with UNION.

```sql
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id

UNION

SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d
ON e.department_id = d.department_id;
```

### Interview Q&A

**Q1. What is a JOIN?**

Answer: JOIN combines records from two or more tables based on related columns.

**Q2. Difference between INNER JOIN and LEFT JOIN?**

Answer:
- INNER JOIN returns only matching records.
- LEFT JOIN returns all left-table records and matching right-table records.

**Q3. What is SELF JOIN?**

Answer: SELF JOIN joins a table with itself, for example, to retrieve employee-manager relationships.

**Q4. Does MySQL support FULL OUTER JOIN?**

Answer: No. We can emulate it using LEFT JOIN and RIGHT JOIN with UNION.

**Q5. What is a CROSS JOIN?**

Answer: It produces the Cartesian product of two tables.

---

# 11. Primary Key and Foreign Key

### Primary Key

Uniquely identifies every row in a table.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);
```

### Foreign Key

Creates a relationship between two tables.

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    amount DECIMAL(10,2),

    FOREIGN KEY (user_id)
    REFERENCES users(id)
);
```

### Primary Key vs Foreign Key

| Primary Key | Foreign Key |
|---|---|
| Uniquely identifies records | References another table |
| Cannot contain NULL | Can contain NULL unless restricted |
| Unique | Can contain duplicates |
| One primary key constraint per table | Multiple foreign keys are possible |

### Interview Q&A

**Q1. Can a table have multiple primary keys?**

Answer: A table has one PRIMARY KEY constraint, but it can contain multiple columns as a composite primary key.

**Q2. Can a foreign key contain duplicate values?**

Answer: Yes. Multiple records can reference the same parent record.

**Q3. Can a foreign key contain NULL?**

Answer: Yes, unless the column is defined as NOT NULL.

**Q4. What is a composite primary key?**

Answer: A primary key consisting of two or more columns.

---

# 12. SQL Constraints

Constraints enforce rules on table data.

| Constraint | Purpose |
|---|---|
| PRIMARY KEY | Unique record identifier |
| FOREIGN KEY | Establishes relationship |
| UNIQUE | Prevents duplicate values |
| NOT NULL | Prevents NULL values |
| CHECK | Validates conditions |
| DEFAULT | Assigns default values |

Example:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 18),
    status VARCHAR(20) DEFAULT 'Active'
);
```

### Interview Q&A

**Q1. Difference between UNIQUE and PRIMARY KEY?**

Answer:
- PRIMARY KEY uniquely identifies each record and cannot be NULL.
- UNIQUE prevents duplicate values. MySQL allows NULL values in UNIQUE columns, subject to its NULL semantics.

**Q2. What is NOT NULL?**

Answer: It ensures that a column cannot store NULL values.

**Q3. What is DEFAULT?**

Answer: It assigns a predefined value when no explicit value is supplied.

**Q4. What is CHECK?**

Answer: It validates data against a specified condition.

---

# 13. DELETE vs TRUNCATE vs DROP

| DELETE | TRUNCATE | DROP |
|---|---|---|
| Deletes records | Deletes all records | Removes entire table |
| Supports WHERE | Does not support WHERE | Does not support WHERE |
| Table remains | Table remains | Table is removed |
| DML | DDL in MySQL | DDL |
| Can be rolled back in a transaction using InnoDB | Causes implicit commit | Causes implicit commit |

### Syntax

```sql
DELETE FROM employees
WHERE id = 1;
```

```sql
TRUNCATE TABLE employees;
```

```sql
DROP TABLE employees;
```

### Interview Q&A

**Q1. Which command deletes all records but keeps the table?**

Answer: TRUNCATE or DELETE without WHERE.

**Q2. Which command removes the table structure?**

Answer: DROP.

**Q3. Which command supports WHERE?**

Answer: DELETE.

---

# 14. ALTER TABLE

Used to modify an existing table.

### Add Column

```sql
ALTER TABLE employees
ADD COLUMN phone VARCHAR(15);
```

### Modify Column

```sql
ALTER TABLE employees
MODIFY COLUMN name VARCHAR(150);
```

### Rename Column

```sql
ALTER TABLE employees
RENAME COLUMN name TO employee_name;
```

### Drop Column

```sql
ALTER TABLE employees
DROP COLUMN phone;
```

---

# 15. Subqueries

A subquery is a query written inside another query.

### Employees earning above average salary

```sql
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

### Find the highest salary

```sql
SELECT *
FROM employees
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
);
```

### Find employees in IT

```sql
SELECT *
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM departments
    WHERE department_name = 'IT'
);
```

### Interview Q&A

**Q1. What is a subquery?**

Answer: A subquery is a SQL query nested inside another SQL query.

**Q2. What is a correlated subquery?**

Answer: A subquery that references columns from the outer query and is logically evaluated for the outer rows.

**Q3. Difference between IN and EXISTS?**

Answer:
- IN checks whether a value matches a value in a result set.
- EXISTS checks whether the subquery returns at least one row.

---

# 16. UNION vs UNION ALL

Combines results from multiple SELECT statements.

### UNION

Removes duplicate rows.

```sql
SELECT name FROM employees
UNION
SELECT name FROM managers;
```

### UNION ALL

Keeps duplicate rows.

```sql
SELECT name FROM employees
UNION ALL
SELECT name FROM managers;
```

### Interview Q&A

**Q1. Difference between UNION and UNION ALL?**

Answer:
- UNION removes duplicate result rows.
- UNION ALL retains duplicate rows.
- UNION ALL is generally faster because it does not perform duplicate elimination.

**Q2. What conditions are required for UNION?**

Answer: Both SELECT statements must return the same number of columns, in compatible positions and with compatible data types.

---

# 17. CASE Statement

CASE provides conditional logic in SQL.

```sql
SELECT name, salary,
CASE
    WHEN salary >= 40000 THEN 'High'
    WHEN salary >= 30000 THEN 'Medium'
    ELSE 'Low'
END AS salary_category
FROM employees;
```

Similar to if/else in JavaScript.

### Interview Q&A

**Q1. What is CASE in SQL?**

Answer: CASE evaluates conditions and returns a value based on the first matching condition.

**Q2. Can CASE be used inside SELECT?**

Answer: Yes. It can also be used in ORDER BY and other expressions.

---

# 18. CTE – Common Table Expression

A CTE creates a named temporary result set for a single SQL statement.

```sql
WITH high_salary AS (
    SELECT *
    FROM employees
    WHERE salary > 30000
)
SELECT *
FROM high_salary;
```

### Interview Q&A

**Q1. What is a CTE?**

Answer: A Common Table Expression is a named temporary result set defined using WITH.

**Q2. Difference between CTE and subquery?**

Answer:
- CTE gives a complex query a reusable, readable structure within one statement.
- A subquery is nested directly inside another query.
- CTEs can also be recursive.

---

# 19. Window Functions

Window functions calculate values across related rows without collapsing them into one row per group.

### ROW_NUMBER()

Assigns a unique sequential number.

```sql
SELECT name, salary,
ROW_NUMBER() OVER (
    ORDER BY salary DESC
) AS row_num
FROM employees;
```

### RANK()

Assigns ranks with gaps after ties.

```sql
SELECT name, salary,
RANK() OVER (
    ORDER BY salary DESC
) AS salary_rank
FROM employees;
```

### DENSE_RANK()

Assigns ranks without gaps after ties.

```sql
SELECT name, salary,
DENSE_RANK() OVER (
    ORDER BY salary DESC
) AS salary_rank
FROM employees;
```

### Difference

| Salary | ROW_NUMBER | RANK | DENSE_RANK |
|---|---:|---:|---:|
| 50000 | 1 | 1 | 1 |
| 40000 | 2 | 2 | 2 |
| 40000 | 3 | 2 | 2 |
| 30000 | 4 | 4 | 3 |

### Interview Q&A

**Q1. What is a window function?**

Answer: It performs calculations across a set of related rows while retaining individual rows in the result.

**Q2. Difference between ROW_NUMBER and RANK?**

Answer:
- ROW_NUMBER assigns unique numbers even for tied values.
- RANK assigns the same rank to ties and skips subsequent ranks.

**Q3. Difference between RANK and DENSE_RANK?**

Answer:
- RANK leaves gaps after ties.
- DENSE_RANK does not leave gaps.

---

# 20. Indexes

Indexes help improve data retrieval performance.

### Create Index

```sql
CREATE INDEX idx_employee_name
ON employees(name);
```

### Composite Index

```sql
CREATE INDEX idx_dept_salary
ON employees(department, salary);
```

### Delete Index

```sql
DROP INDEX idx_employee_name
ON employees;
```

### Interview Q&A

**Q1. What is an index?**

Answer: An index is a data structure that helps the database find records more efficiently.

**Q2. Does an index improve INSERT performance?**

Answer: No. Indexes generally add overhead to INSERT, UPDATE and DELETE operations because the index must also be maintained.

**Q3. What is a composite index?**

Answer: An index created using multiple columns.

**Q4. What is the disadvantage of indexes?**

Answer:
- Additional storage.
- Slower writes due to index maintenance.
- Too many indexes can reduce overall performance.

**Q5. What is EXPLAIN?**

Answer: EXPLAIN displays the execution plan of a query and helps identify how MySQL accesses tables and indexes.

```sql
EXPLAIN
SELECT *
FROM employees
WHERE department = 'IT';
```

---

# 21. Transactions and ACID Properties

A transaction is a group of database operations treated as one logical unit.

### Example: Bank Transfer

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;
```

If something goes wrong:

```sql
ROLLBACK;
```

### SAVEPOINT

```sql
START TRANSACTION;

UPDATE employees
SET salary = 35000
WHERE id = 1;

SAVEPOINT sp1;

UPDATE employees
SET salary = 45000
WHERE id = 2;

ROLLBACK TO SAVEPOINT sp1;

COMMIT;
```

### ACID Properties

| Property | Meaning |
|---|---|
| Atomicity | All operations succeed or none |
| Consistency | Database remains valid |
| Isolation | Concurrent transactions are isolated |
| Durability | Committed data persists |

### Interview Q&A

**Q1. What is a transaction?**

Answer: A transaction is a group of SQL operations executed as one logical unit.

**Q2. What is COMMIT?**

Answer: COMMIT permanently saves the transaction's changes.

**Q3. What is ROLLBACK?**

Answer: ROLLBACK reverses uncommitted transaction changes.

**Q4. What is a SAVEPOINT?**

Answer: SAVEPOINT creates a point inside a transaction to which we can roll back.

**Q5. What are ACID properties?**

Answer: Atomicity, Consistency, Isolation and Durability.

---

# 22. Views

A view is a virtual table based on a SQL query.

### Create View

```sql
CREATE VIEW it_employees AS
SELECT *
FROM employees
WHERE department = 'IT';
```

### Use View

```sql
SELECT * FROM it_employees;
```

### Drop View

```sql
DROP VIEW it_employees;
```

### Interview Q&A

**Q1. What is a view?**

Answer: A view is a virtual table that displays data based on a stored SELECT query.

**Q2. Does a normal view store data separately?**

Answer: No. A regular view stores the query definition, not a separate copy of the result data.

---

# 23. Stored Procedures

A stored procedure is a reusable collection of SQL statements stored in the database.

### Create Procedure

```sql
DELIMITER //

CREATE PROCEDURE GetEmployees()
BEGIN
    SELECT * FROM employees;
END //

DELIMITER ;
```

### Execute Procedure

```sql
CALL GetEmployees();
```

### Interview Q&A

**Q1. What is a stored procedure?**

Answer: A stored procedure is a reusable set of SQL statements stored in the database and executed using CALL.

**Q2. What are its advantages?**

Answer:
- Reusability.
- Centralized database logic.
- Reduced repeated query code.
- Can support controlled database access.

---

# 24. Triggers

A trigger automatically executes when a specified database event occurs.

### Example

```sql
CREATE TABLE employee_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    action VARCHAR(50)
);
```

```sql
DELIMITER //

CREATE TRIGGER after_employee_insert
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employee_logs(employee_id, action)
    VALUES (NEW.id, 'INSERTED');
END //

DELIMITER ;
```

### Interview Q&A

**Q1. What is a trigger?**

Answer: A trigger is a database object that automatically executes when a specified INSERT, UPDATE or DELETE event occurs.

**Q2. Difference between a stored procedure and a trigger?**

Answer:
- A stored procedure is explicitly called.
- A trigger automatically executes when its defined event occurs.

**Q3. What are NEW and OLD?**

Answer:
- NEW refers to the new row values.
- OLD refers to the previous row values.
- Availability depends on the trigger event.

---

# 25. Database Normalization

Normalization organizes data to reduce duplication and improve consistency.

| Normal Form | Concept |
|---|---|
| 1NF | Atomic values; no repeating groups |
| 2NF | 1NF + no partial dependency on a candidate key |
| 3NF | 2NF + no transitive dependency of non-key attributes |

### Interview Q&A

**Q1. What is normalization?**

Answer: Normalization organizes database tables to reduce redundancy and prevent data anomalies.

**Q2. What is denormalization?**

Answer: Denormalization intentionally introduces some redundancy to improve read performance in suitable situations.

**Q3. What is 1NF?**

Answer: Each column should contain atomic values, and repeating groups should be eliminated.

**Q4. What is 2NF?**

Answer: A table must be in 1NF, and every non-key attribute must depend on the whole candidate key, not just part of a composite candidate key.

**Q5. What is 3NF?**

Answer: A table must be in 2NF and non-key attributes should not depend transitively on candidate keys.

---

# 26. SQL Execution Order

SQL is written in one order but logically processed in another order.

### Query

```sql
SELECT department, AVG(salary)
FROM employees
WHERE salary > 20000
GROUP BY department
HAVING AVG(salary) > 30000
ORDER BY AVG(salary) DESC
LIMIT 5;
```

### Logical Execution Order

1. FROM / JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT

### Interview Q&A

**Q1. Why can't we generally use a SELECT alias in WHERE?**

Answer: Because WHERE is logically processed before SELECT.

**Q2. Which executes first, WHERE or HAVING?**

Answer: WHERE executes before GROUP BY and HAVING.

---

# 27. Important SQL Coding Problems with Solutions

Assume the following tables:

### employees

| id | name | department | salary | email | joining_date |
|---|---|---|---:|---|---|
| 1 | Rahul | IT | 30000 | rahul@gmail.com | 2024-01-10 |
| 2 | Amit | HR | 25000 | amit@gmail.com | 2024-02-15 |
| 3 | Priya | IT | 40000 | priya@gmail.com | 2023-06-10 |
| 4 | Sneha | Finance | 35000 | sneha@gmail.com | 2024-05-20 |
| 5 | Kiran | HR | 25000 | kiran@gmail.com | 2025-01-10 |
| 6 | Raj | IT | 50000 | rahul@gmail.com | 2025-02-01 |

### Problem 1: Find the highest salary

```sql
SELECT MAX(salary)
FROM employees;
```

### Problem 2: Find the second-highest distinct salary

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

### Problem 3: Find the third-highest distinct salary

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;
```

### Problem 4: Find duplicate emails

```sql
SELECT email, COUNT(*) AS total
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

### Problem 5: Count employees by department

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

### Problem 6: Find employees earning above average salary

```sql
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

### Problem 7: Find employees without a department

```sql
SELECT *
FROM employees
WHERE department IS NULL;
```

If department is maintained in a separate table:

```sql
SELECT e.*
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.department_id
WHERE d.department_id IS NULL;
```

### Problem 8: Find the highest salary per department

```sql
SELECT department, MAX(salary) AS highest_salary
FROM employees
GROUP BY department;
```

### Problem 9: Find the top three salary ranks per department

```sql
SELECT *
FROM (
    SELECT name, department, salary,
    DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS salary_rank
    FROM employees
) AS ranked
WHERE salary_rank <= 3;
```

### Problem 10: Find employees who joined in the last 30 days

```sql
SELECT *
FROM employees
WHERE joining_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
AND joining_date <= CURDATE();
```

### Problem 11: Find departments having more than five employees

```sql
SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

### Problem 12: Find employees with duplicate salaries

```sql
SELECT salary, COUNT(*) AS total
FROM employees
GROUP BY salary
HAVING COUNT(*) > 1;
```

To retrieve the actual employee records:

```sql
SELECT *
FROM employees
WHERE salary IN (
    SELECT salary
    FROM employees
    GROUP BY salary
    HAVING COUNT(*) > 1
);
```

### Problem 13: Find the highest-paid employee in each department

```sql
SELECT *
FROM (
    SELECT *,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS rn
    FROM employees
) AS ranked
WHERE rn = 1;
```

### Problem 14: Find employees earning more than Rahul

```sql
SELECT *
FROM employees
WHERE salary > (
    SELECT salary
    FROM employees
    WHERE name = 'Rahul'
);
```

### Problem 15: Find employees whose names start with A

```sql
SELECT *
FROM employees
WHERE name LIKE 'A%';
```

### Problem 16: Find employees with the same salary

```sql
SELECT e1.name, e2.name, e1.salary
FROM employees e1
JOIN employees e2
ON e1.salary = e2.salary
AND e1.id < e2.id;
```

### Problem 17: Find employees earning more than their department's average

```sql
SELECT e.*
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e.department
);
```

### Problem 18: Find the second-highest salary in each department

```sql
SELECT *
FROM (
    SELECT name, department, salary,
    DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS salary_rank
    FROM employees
) AS ranked
WHERE salary_rank = 2;
```

---

# 28. SQL Security and Node.js Integration

SQL is commonly used with Node.js backends through packages such as mysql2.

### Example: Connect Node.js to MySQL

```javascript
const mysql = require("mysql2/promise");

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "company"
});

const [rows] = await connection.execute(
    "SELECT * FROM employees"
);

console.log(rows);
```

### Parameterized Query

Recommended:

```javascript
const [rows] = await connection.execute(
    "SELECT * FROM employees WHERE id = ?",
    [1]
);
```

Avoid:

```javascript
const query = `SELECT * FROM employees WHERE id = ${id}`;
```

### Interview Q&A

**Q1. What is SQL Injection?**

Answer: SQL Injection is a security vulnerability where malicious SQL input is inserted into a query to manipulate database operations.

**Q2. How do you prevent SQL Injection in Node.js?**

Answer:
- Use parameterized queries.
- Avoid directly concatenating user input into SQL.
- Validate user input.
- Apply appropriate database permissions.

**Q3. What is connection pooling?**

Answer: Connection pooling maintains reusable database connections instead of creating a new connection for every request.

**Q4. Why use mysql2/promise?**

Answer: It supports Promise-based database operations and async/await syntax in Node.js.

Example:

```javascript
const [rows] = await pool.execute(
    "SELECT * FROM employees WHERE department = ?",
    ["IT"]
);
```

---

# 29. Important Tricky SQL Interview Questions

| No. | Question | Answer |
|---|---|---|
| 1 | Does COUNT(*) count NULL rows? | Yes, it counts all rows |
| 2 | Does COUNT(column) count NULL values? | No |
| 3 | Can WHERE use aggregate functions directly? | Generally no; use HAVING or a subquery |
| 4 | Does BETWEEN include boundaries? | Yes |
| 5 | Does UNION remove duplicates? | Yes |
| 6 | Does UNION ALL remove duplicates? | No |
| 7 | Can a foreign key contain duplicates? | Yes |
| 8 | Can a foreign key contain NULL? | Yes, unless NOT NULL is specified |
| 9 | Does LEFT JOIN return unmatched left records? | Yes |
| 10 | Does DELETE remove table structure? | No |
| 11 | Does TRUNCATE support WHERE? | No |
| 12 | Does MySQL support FULL OUTER JOIN directly? | No |
| 13 | Does AVG() consider NULL? | No |
| 14 | What happens when WHERE salary > NULL is evaluated? | It evaluates to UNKNOWN |
| 15 | What is the difference between RANK and DENSE_RANK? | RANK leaves gaps; DENSE_RANK does not |
| 16 | Can a table have multiple primary key columns? | Yes, as a composite primary key |
| 17 | Can an index slow down INSERT? | Yes, due to index maintenance |
| 18 | What does DISTINCT do? | Removes duplicate result rows |
| 19 | What does EXISTS check? | Whether a subquery returns at least one row |
| 20 | What does ROLLBACK do? | Reverses uncommitted transaction changes |

---

# 30. Recommended SQL Revision Priority

| Priority | Topics |
|---|---|
| High | SELECT, INSERT, UPDATE, DELETE |
| High | WHERE, AND, OR, IN, BETWEEN, LIKE |
| High | ORDER BY, LIMIT, DISTINCT |
| High | COUNT, SUM, AVG, MIN, MAX |
| High | GROUP BY and HAVING |
| High | INNER JOIN and LEFT JOIN |
| High | Primary Key, Foreign Key, Constraints |
| High | Subqueries |
| High | Second-highest salary and duplicate records |
| High | Indexes and Transactions |
| Medium | CASE, UNION, UNION ALL |
| Medium | CTEs and Window Functions |
| Medium | Normalization |
| Medium | Stored Procedures, Views and Triggers |
| Medium | Query Optimization and EXPLAIN |
| Medium | SQL Injection and Connection Pooling |

---

# 31. Final Revision Checklist

- [ ] SQL fundamentals and database terminology
- [ ] DDL, DML, DQL, DCL and TCL
- [ ] Database and table creation
- [ ] SQL data types
- [ ] CRUD operations
- [ ] WHERE and filtering operators
- [ ] ORDER BY, DISTINCT and LIMIT
- [ ] Aggregate functions
- [ ] GROUP BY and HAVING
- [ ] All major SQL joins
- [ ] Primary Key and Foreign Key
- [ ] Constraints
- [ ] DELETE vs TRUNCATE vs DROP
- [ ] ALTER TABLE
- [ ] Subqueries and correlated subqueries
- [ ] UNION and UNION ALL
- [ ] CASE statements
- [ ] CTEs
- [ ] Window functions
- [ ] Indexes and EXPLAIN
- [ ] Transactions and ACID
- [ ] Views, Stored Procedures and Triggers
- [ ] Database Normalization
- [ ] SQL coding problems
- [ ] SQL Injection prevention
- [ ] Node.js and MySQL integration

**Goal:** Understand the concepts, write the queries independently, and be able to explain why each query works.