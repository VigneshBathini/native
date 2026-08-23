# 07 — Real-Time, Device, and Database Extras
Simple, clean additions to your notes — covers what came up in your actual project walkthroughs (Proctoring, Founder app, AFMC, Optics) that wasn't in the original 6 files.

---

## 1. WebRTC — how a video call actually connects

**What it is:** a browser/device API that lets two devices send video, audio, or data directly to each other, without the stream passing through your server.

**Why a server is still needed:** two peers can't find each other or agree on connection details without some communication channel first. That's called **signaling**, and it's just Socket.io doing normal message-passing — nothing WebRTC-specific about the transport.

**The 3-step handshake, in plain terms:**
1. **Offer/Answer** — Peer A creates an "offer" describing what it can send (video codec, resolution, etc.) and sends it through the server to Peer B. Peer B replies with an "answer."
2. **ICE candidates** — each device also shares a list of possible network paths it can be reached on (its local IP, its public IP via STUN, or a relay via TURN). These get exchanged the same way, through the server.
3. **Direct connection** — once both sides have offer+answer+candidates, the browsers/devices connect **directly** to each other. The server's job is done — it only brokered the introduction.

```js
// Signaling server — just relays, never touches video
socket.on('offer', (data) => {
  socket.to(data.to).emit('offer', { signal: data.signal, from: socket.id });
});
socket.on('answer', (data) => {
  socket.to(data.to).emit('answer', { signal: data.signal, from: socket.id });
});
socket.on('ice-candidate', (data) => {
  socket.to(data.to).emit('ice-candidate', { candidate: data.candidate, from: socket.id });
});
```

**STUN vs TURN, one line each:**
- **STUN** — helps a device discover its own public IP so peers can connect directly. Free, fast, works most of the time.
- **TURN** — a relay server used only when direct connection fails (strict NATs/firewalls). Media flows through TURN instead of peer-to-peer — slower, costs bandwidth, but always works.

**Interview one-liner:** "The server never sees the video — it just relays offer, answer, and ICE candidates so the two devices can find and connect to each other directly."

---

## 2. Socket.io rooms — how group real-time features work

**What it is:** Socket.io's built-in way to group connected sockets so you can broadcast to just one group instead of everyone.

```js
socket.join(roomId);                        // this socket now belongs to roomId
socket.to(roomId).emit('user-joined', data); // send to everyone in the room EXCEPT sender
io.to(roomId).emit('chat-message', data);    // send to everyone in the room INCLUDING sender
socket.to(targetSocketId).emit('offer', ...) // send to one specific socket
```

**Key thing to remember:** `socket.to()` excludes the sender, `io.to()` includes everyone in the room. Mixing these up is a common bug — e.g. a chat message that never shows up for the sender because you used `socket.to()` instead of `io.to()`.

**Cleanup on disconnect** — always handle this, or your room state leaks memory over time:
```js
socket.on('disconnect', () => {
  socket.to(socket.roomId).emit('user-left', { userId: socket.id });
  // clean up any in-memory tracking objects here
});
```

---

## 3. AppState + NetInfo — keeping a live connection alive on mobile

**The problem:** unlike a web app, a phone app gets backgrounded constantly — screen locks, user swipes to another app, spotty network on the move. A socket connection that was fine a second ago can silently die.

**AppState** tells you when the app moves between foreground/background/inactive:
```js
useEffect(() => {
  const sub = AppState.addEventListener('change', (nextState) => {
    if (nextState === 'active') {
      // app came back to foreground — check/reconnect the socket
    }
  });
  return () => sub.remove();
}, []);
```

**NetInfo** tells you when the network connection changes:
```js
useEffect(() => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      // network is back — reconnect if needed
    }
  });
  return () => unsubscribe();
}, []);
```

**The stale-closure trap (important, comes up a lot):** if you reference a socket variable directly inside these listeners, you'll often get an old, disconnected version of it — because the listener closed over whatever the socket was when the effect first ran. Fix: keep the live socket in a `useRef` instead of relying on the state variable inside the listener.

```js
const socketRef = useRef(null);
// ...
socketRef.current = newSocket; // always up to date
// inside AppState listener: socketRef.current is always current, no stale closure
```

**Interview one-liner:** "I use AppState and NetInfo to detect when the app comes back to foreground or the network reconnects, and I keep the socket in a ref rather than state so the listener always sees the live connection instead of a stale one."

---

## 4. Barcode / QR scanning in React Native

**What it is:** using the camera to read a barcode or QR code and get structured data back (a string, usually an item code).

**Typical flow with Expo:**
```js
import { CameraView, useCameraPermissions } from 'expo-camera';

function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission?.granted) {
    // show a button that calls requestPermission()
  }

  const handleScan = ({ data }) => {
    if (scanned) return;       // prevent double-fires from rapid re-scans
    setScanned(true);
    // data = the decoded barcode string, e.g. an item code
  };

  return (
    <CameraView
      onBarcodeScanned={handleScan}
      barcodeScannerSettings={{ barcodeTypes: ['ean13', 'code128', 'qr'] }}
    />
  );
}
```

**Things worth knowing for interviews:**
- Always request camera permission first — same pattern as `ImagePicker`/`expo-camera` capture, just a different permission prompt.
- Debounce/guard against multiple fires (`scanned` flag above) — a barcode sitting in frame can trigger the callback dozens of times a second otherwise.
- After scanning, the string is just a lookup key — you still make a normal API call to fetch the item's real details (price, stock, name) using that code.

---

## 5. PDF generation in React Native (Expo)

**What it is:** turning app data into a downloadable/shareable PDF — for receipts, reports, invoices.

**How it actually works with `expo-print`:** you're not drawing a PDF directly — you build an **HTML string**, and `expo-print` renders that HTML to a PDF file under the hood (same rendering engine the device uses for web content).

```js
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const generateReport = async (transactions) => {
  const html = `
    <html><body>
      <h1>Transaction Report</h1>
      <table>
        ${transactions.map(t => `<tr><td>${t.name}</td><td>${t.amount}</td></tr>`).join('')}
      </table>
    </body></html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await shareAsync(uri); // opens OS share sheet — WhatsApp, email, save, etc.
};
```

**Interview one-liner:** "I build the report as an HTML string with inline styles, hand it to `Print.printToFileAsync`, and share the resulting file through `expo-sharing`. It's an HTML-to-PDF pipeline, not a native drawing API."

**Good to know:** on the web side (React.js), a common alternative is `jsPDF` + `jspdf-autotable`, which builds the PDF by adding elements/tables programmatically instead of rendering HTML — different approach to the same problem, worth mentioning if asked to compare mobile vs. web PDF generation.

---

## 6. SQL essentials — joins, upsert, and reporting queries

Your notes don't cover backend SQL at all, but you'll get asked basics if the interviewer sees Node/Express + MySQL/Oracle on your resume.

### Joins (the ones that actually come up)
```sql
-- INNER JOIN: only rows that match in both tables
SELECT o.id, u.name FROM orders o
INNER JOIN users u ON o.user_id = u.id;

-- LEFT JOIN: all rows from the left table, matched rows from the right (NULL if no match)
SELECT u.name, o.id FROM users u
LEFT JOIN orders o ON o.user_id = u.id;
```
**Plain-English rule:** INNER JOIN drops anything that doesn't match on both sides. LEFT JOIN keeps everything on the left even if there's no match — useful for "show all users, including ones with zero orders."

### Upsert — insert or update in one query
```sql
INSERT INTO instant_participants (instant_meeting_id, name, email, joined_at)
VALUES (?, ?, ?, NOW())
ON DUPLICATE KEY UPDATE joined_at = NOW(), left_at = NULL;
```
**What it solves:** without this, you'd have to first SELECT to check if a row exists, then decide INSERT or UPDATE — two queries and a race condition risk. Upsert does it atomically in one.

### GROUP BY for report-style features
```sql
SELECT item_code, SUM(quantity) as total_qty, SUM(price * quantity) as revenue
FROM order_items
WHERE order_date BETWEEN ? AND ?
GROUP BY item_code;
```
**Why this matters for a "free item" style feature:** if free items aren't flagged separately, they get summed into `revenue` along with paid ones. The fix is a `WHERE is_free = 0` or a `CASE WHEN` inside the SUM so free items are excluded from revenue but still counted in `total_qty` for stock movement.

### Not every backend is MySQL/Postgres
Worth saying explicitly if it comes up: some production backends use **Oracle** through **ORDS (Oracle REST Data Services)** — you hit a REST endpoint instead of writing a driver-level SQL connection yourself. Functionally the same relational concepts (joins, upserts, aggregates) still apply — it's mostly a different way of *reaching* the database, not a different way of thinking about it.

---

## Quick self-test (say these out loud)
1. What does the signaling server actually do in a WebRTC call, and what does it *not* do?
2. What's the difference between `socket.to(room)` and `io.to(room)`?
3. Why do you need a `useRef` instead of state for a socket inside an AppState listener?
4. Walk through what happens end-to-end when a barcode is scanned.
5. How does `expo-print` actually generate a PDF — what are you handing it?
6. Why would you use `ON DUPLICATE KEY UPDATE` instead of a SELECT-then-INSERT-or-UPDATE?
