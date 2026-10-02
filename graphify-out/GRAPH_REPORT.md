# Graph Report - almera  (2026-10-01)

## Corpus Check
- Corpus is ~13,234 words - fits in a single context window. You may not need a graph.

## Summary
- 98 nodes · 133 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Remote Clicker & Device Pairing
- Socket.io Server & Realtime Hub
- Presenter Slide Engine Logic
- Remote Client Control Logic
- Presenter Page Shell & HUD
- Project Manifest & Entry Point
- Brand Identity & Logo
- Runtime Dependencies
- Business Plan Content Domains
- NPM Scripts
- Slide Content Data

## God Nodes (most connected - your core abstractions)
1. `Remote Clicker Page Shell` - 13 edges
2. `Presenter Page Shell` - 10 edges
3. `renderSlide()` - 6 edges
4. `Mobile Remote Controller (Smartphone Web Clicker)` - 6 edges
5. `updateSubStep()` - 5 edges
6. `joinRoom()` - 5 edges
7. `Web Slide Presenter (Laptop/Projector)` - 5 edges
8. `Room Code Pairing Model` - 4 edges
9. `HUD Top Right (Stopwatch, Remote, Fullscreen)` - 4 edges
10. `Slide Wrapper (Dynamic Render Container)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Slide Wrapper (Dynamic Render Container)` --implements--> `Web Slide Presenter (Laptop/Projector)`  [INFERRED]
  public/index.html → README.md
- `QR Code Pairing Modal` --implements--> `Room Code Pairing Model`  [INFERRED]
  public/index.html → README.md
- `Remote Clicker Page Shell` --implements--> `Mobile Remote Controller (Smartphone Web Clicker)`  [INFERRED]
  public/remote.html → README.md
- `Socket.io Client (Presenter)` --implements--> `Socket.io Realtime Sync`  [INFERRED]
  public/index.html → README.md
- `Socket.io Client (Remote)` --implements--> `Socket.io Realtime Sync`  [INFERRED]
  public/remote.html → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Presenter-Remote Pairing and Realtime Control Flow** — public_index_qr_modal, public_index_remote_status_badge, public_index_socket_io_client, public_remote_room_pill, public_remote_socket_io_client, public_remote_manual_room_form, readme_room_code_pairing [INFERRED 0.85]
- **Cross-Device Theme Synchronization** — public_index_presenter_js, public_remote_theme_toggle, readme_dual_theme_engine [INFERRED 0.75]
- **Mirrored Presentation State (slide, substep, timer)** — public_index_slide_wrapper, public_index_progress_bar, public_remote_slide_badge, public_remote_timer_large, public_index_slides_data_js, public_remote_remote_js [INFERRED 0.85]
- **Almera Primary Logo Lockup** — public_img_almera_logo, public_img_almera_mark, public_img_almera_wordmark [EXTRACTED 1.00]

## Communities (11 total, 1 thin omitted)

### Community 0 - "Remote Clicker & Device Pairing"
Cohesion: 0.13
Nodes (21): Remote Connection Status Badge, Socket.io Client (Presenter), GIANT NEXT Button, PREVIOUS Button, Disconnected Banner & Reconnect Overlay, Manual Room Code Join Form, remote.css Stylesheet, remote.js Remote Logic (+13 more)

### Community 1 - "Socket.io Server & Realtime Hub"
Cohesion: 0.13
Nodes (12): ref_http, ref_os, ref_path, app, express, http, io, os (+4 more)

### Community 2 - "Presenter Slide Engine Logic"
Cohesion: 0.24
Nodes (8): applyTheme(), renderSlide(), setupFinancialPillarsClick(), setupPriceCalculator(), triggerNext(), triggerPrev(), triggerThemeToggle(), updateSubStep()

### Community 3 - "Remote Client Control Logic"
Cohesion: 0.29
Nodes (8): handleNext(), handlePrev(), hideOverlay(), joinRoom(), showReconnecting(), showRoomInputCard(), triggerHaptic(), updateUIState()

### Community 4 - "Presenter Page Shell & HUD"
Cohesion: 0.33
Nodes (10): HUD Top Right (Stopwatch, Remote, Fullscreen), presenter.css Stylesheet, presenter.js Presenter Logic, Presenter Page Shell, Slide Progress Bar, QR Code Pairing Modal, Slide Wrapper (Dynamic Render Container), slides-data.js Content Module (+2 more)

### Community 5 - "Project Manifest & Entry Point"
Cohesion: 0.25
Nodes (7): description, main, name, version, express, qrcode, socket.io

### Community 6 - "Brand Identity & Logo"
Cohesion: 0.53
Nodes (6): Almera Brand, Almera Logo Image, Stylized 'A' Mountain Glyph, Monochrome Single-Color Brand Identity, Mountain / Peak Motif, ALMERA Wordmark (stylized uppercase lettering)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.50
Nodes (4): dependencies, express, qrcode, socket.io

### Community 8 - "Business Plan Content Domains"
Cohesion: 0.67
Nodes (4): Vendor Supply Chain & BEP Analysis, Live Profit Simulation Calculator, Web Slide Presenter (Laptop/Projector), Zero-Risk DP 50% Payment Scheme

### Community 9 - "NPM Scripts"
Cohesion: 0.67
Nodes (3): scripts, dev, start

## Knowledge Gaps
- **22 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 35 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Remote Clicker Page Shell` connect `Remote Clicker & Device Pairing` to `Presenter Page Shell & HUD`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `Presenter Page Shell` connect `Presenter Page Shell & HUD` to `Remote Clicker & Device Pairing`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Remote Clicker & Device Pairing` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `Socket.io Server & Realtime Hub` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._