# Changelog

All notable changes to `@stackline/multiselect` are documented here.

## 1.1.3 - 2026-08-19

- Added generic TypeScript declarations for the styled and headless APIs, tested with TypeScript 3.9 and 7.0.
- Hardened configuration and prop-bag assignment against `__proto__`, `prototype`, and `constructor` keys.
- Made the public styled `selectAll()` method idempotent while preserving the interactive select-all toggle.
- Applied `limitSelection` consistently to headless item, group, option-state, and select-all actions.
- Preserved existing keyboard overrides when `setSettings()` receives a partial keyboard update.
- Added real DOM regression coverage for selection, Shadow DOM outside clicks, prototype keys, and headless limits.
- Updated the Vite development toolchain to 8.2.1 and removed all known development audit findings.
- Added deterministic direct-download builds with the license included, package-content checks, pinned CI, and versioned release documentation.

## 1.1.2 - 2026-06-08

- Made outside-click detection work across Shadow DOM boundaries with `Event.composedPath()`.
- Preserved the `Element.contains()` fallback for browsers without composed paths.

## 1.1.1 - 2026-06-07

- Kept the selected item active when it is chosen again in single-selection mode.
- Aligned styled and headless single-selection behavior.

## 1.1.0 - 2026-06-01

- Added headless state APIs, render callbacks, expanded keyboard controls, ARIA state helpers, and object preservation across data refreshes.
