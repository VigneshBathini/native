Limitation of the old Bridge:
- Data must be serialized before being transferred.
- Messages are transferred asynchronously through the Bridge.
- Frequent communication can introduce serialization and communication overhead, potentially affecting performance.
A stronger technical discussion answer
"The limitation of the old Bridge architecture is that communication between JavaScript and native modules requires asynchronous message passing and serialization. When there are frequent communications or large amounts of data, this can introduce additional overhead and affect performance."


What is the main difference between Bridge and JSI?
The Bridge is used for communication between the JavaScript thread and native modules. It requires serialization and asynchronous message passing. JSI provides a more direct communication mechanism through a C++ interface, allowing JavaScript to interact with native C++ objects without relying on the legacy Bridge.

Check your understanding
Suppose an NPCI payment application needs to update its UI from a loading screen to a payment-success screen.

What is Fabric responsible for in this process?![alt text](image.png)
Fabric is the new rendering system in React Native's New Architecture. It works with React's reconciliation process to efficiently calculate UI changes and commit those updates to the native UI


TurboModules support lazy loading, which means native modules are initialized only when they are needed. For example, in a UPI application, the biometric authentication module can be loaded when the user selects fingerprint authentication instead of loading it at application startup.


What is the main purpose of Codegen, and how does it help when creating a custom native module?
Codegen automatically generates native interface code based on typed JavaScript or TypeScript specifications. It helps maintain consistency between JavaScript and native implementations and reduces manual interface-writing


Imagine an NPCI payment application:
1. The user opens the application.
2. The app displays the payment screen.
3. The user selects fingerprint authentication.
4. The app accesses the native biometric functionality.
Match the responsibilities:
- A. JSI
- B. Fabric
- C. TurboModules
- D. Codegen
Question: Which component is responsible for loading the biometric native module only when it is required?

Exactly! TurboModules support lazy loading, so the biometric native module can be loaded when the user selects fingerprint authentication.
Quick revision of all five
- JSI: Communication interface between JavaScript and C++.
- Fabric: UI rendering system.
- TurboModules: Native modules with lazy loading.
- Codegen: Generates native interface code from typed specifications.
- Bridge: Legacy asynchronous, serialized communication mechanism.

Bridgeless Mode means React Native operates without the legacy Bridge. Instead, it uses the New Architecture infrastructure, including JSI, to communicate with native functionality without the legacy Bridge's serialization and message-passing mechanism.

------------------------------------------------------------
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