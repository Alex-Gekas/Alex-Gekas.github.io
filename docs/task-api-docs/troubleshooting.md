---
title: Troubleshooting
description: Common errors and fixes
---
This section describes common errors that can occur when installing the Task API or testing endpoints from a REST client. Many of these errors result from missing a step during installation. Review the **[Getting Started](getting-started.md)** guide before troubleshooting.

### npm install fails on Windows

**Symptom**: error messages that reference the `node-gyp` or missing Visual Studio.

**Cause:** `better-sqlite3` is a native Node.js module. On Windows, some Node.js packages include native code that npm compiles during installation. If a prebuilt version isn't available, npm uses build tools such as Python and the Visual C++ toolchain.

**There are two ways to resolve this issue:**:

- **Option A: Install the required Windows build tools**
Use this option if you want your system to compile native Node.js modules correctly. This ensures data integrity and performance.
- **Option B: Replace `better-sqlite3` with `sql.js`** 
Use this option to avoid native compilation by using a pure JavaScript SQLite implementation. However, your environment still lacks native-build tools, which may cause problems with other packages later. Use this option only for development or portfolio projects.

### Server won't start: `Cannot find module`

**Symptom:** `Error: Cannot find module` when running `npm run dev`

**Cause:** Two possible causes:

- Files aren't in the correct folder structure-`src/` subfolders missing
- Dependencies not installed-`node_modules` folder missing or incomplete

**Fix:**

- Verify the folder structure matches the one in [System Architecture](system-architecture.md).
- Run `npm install` if `node_modules` is missing.
- Check that all files are in their correct subdirectories.

### 401 errors

**Symptom:** Requests to task endpoints return a 401 response.

**Possible causes**

**Missing Authorization header**

- Cause: no Authorization header included in the request
- Fix: add `Authorization: Bearer: <your_token>` to every task request

**Wrong header format**

- Cause: header syntax is in the wrong format, for example `<your_token>` instead of `<your_token>`
- Fix: make sure the header follows the exact format: `Authorization: <your_token>`

**Expired token**

- Cause: the server issued the token more than seven days ago
- Fix: log in again to generate a new token. There is no refresh mechanism in this API

### 409 Conflict on signup

**Symptom:** `POST /api/auth/signup` returns a 409 Conflict response.

**Cause:** The email address is already registered in the database.

**Fix:** Two options:

- Log in using the existing account at `POST /api/auth/login`.
- Sign up using a different email address.

### 404 on task endpoints

**Symptom** A task request returns a 404 NotFound response even though the task exists.

**Two causes and fixes:**

**Wrong task ID**

- Cause: the task ID in the request path is incorrect or malformed
- Fix: copy the exact task ID from the response when you created the task, or retrieve it using `GET /api/tasks`

**Wrong user**

- Cause: the task exists but belongs to a different user account. Tasks are private and scoped to the authenticated user
- Fix: confirm you are using the token for the correct user account

### 400 validation errors

**Symptom:** A request returns a 400 ValidationError response.

**Three causes and fixes:**

**Missing title on task creation**

- Cause: the `POST /api/tasks` request didn't include a title field
- Fix: include a title field in the request body. It's the only required field when creating a task

**Invalid status value**

- Cause: the status field contains a value not accepted by the API
- Fix: use one of the accepted values: `pending`, `in_progress`, `completed`

**Invalid priority value**

- Cause: the priority field contains a value not accepted by the API
- Fix: use one of the accepted values: `low`, `medium`, `high`

### **Data not persisting between restarts**

**Symptom:** Tasks and user accounts from a previous session disappear after you restart the server.

**Cause:** If `DB_PATH` isn't set in .env, the server uses the default path ./data/tasks.db. This works in most cases. If you start the server from a different directory, it can't find the database. As a result, the server creates a new empty database. Previously created users and tasks seem to disappear.

**Fix**

- Open your `.env` file and confirm that it sets `DB_PATH=./data/tasks.db`
- Confirm the `data/` folder exists in your project root
- Restart the server and verify the `tasks.db` file appears in the `data/` folder after startup