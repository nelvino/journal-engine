# Current Application State

Last updated: 2026-09-10.

## Stack

- Next.js 16.3.4 (Turbopack), React 19.2.8, TypeScript.
- Tailwind CSS v4 with `@tailwindcss/postcss`.
- Firebase 12.18.0 (lazy-initialized) when `NEXT_PUBLIC_USE_FIREBASE=true`.
- Storage abstraction: `LocalStorageAdapter` / `FirestoreStorageAdapter` via `useStorage()`.
- i18n: English + Spanish, all new UI copy must be added to both dictionaries.

## Design System

Paper-and-ink, mobile-first:

- Sharp corners (no border radius except avatars).
- No shadows.
- Warm paper background (`bg-paper`), dark ink (`text-ink`), terracotta accent (`bg-accent`), sage support (`bg-sage`).
- Newsreader serif for content, Familjen Grotesk sans for controls/labels.
- 28px ruled writing surfaces.
- Bottom tab navigation on mobile (`Today`, `Pages`, `Practice`, `You`) via `Shell`.
- Minimum 44px hit targets.

## Design-Complete Routes

| Route | Status | Notes |
|---|---|---|
| `/` | Done | Today / Home. Dynamic hero (`homeHero.ts`), `WeekStrip`, recent entries, New page CTA. |
| `/pages` | Done | Archive. Year totals, search, top-4 style chips, month-grouped ledger, reader links. |
| `/journal/new` | Done | 3-step wizard. Step 1 style search, step 2 framework, step 3 write. All three steps use a fixed bottom CTA on mobile. |
| `/journal/[id]` | Done | Full reader. Shows metadata and full text. Delete via `ConfirmDialog`. |
| `/practice` | Done | Record and Intentions tabs. Record uses real journal data. Intentions has full CRUD + pips. |
| `/you` | Done | Settings: profile, language, appearance, default session, reminders, privacy, export, delete all. |

## Legacy / Unlinked Routes

These routes are **not linked from the new bottom navigation** and now redirect via `next.config.ts`:

| Legacy route | Redirect |
|---|---|
| `/journal` | `/journal/new` |
| `/settings` | `/you` |
| `/goals` | `/practice` |
| `/progress` | `/practice` |

`/design` remains the component showcase page.

## Persistence Keys

- `journal_entries` — all journal entries.
- `intentions` — practice intentions (id, text, target, current, createdAt, keptAt).
- `user_settings` — evening reminder, morning pages, monthly reread, app lock, hide previews, default session.
- `language` — app language.
- `theme` — light / dark / system.
- `goals`, `user_progress`, `onboarding_completed`, `recommendation_dismissed_date` — legacy / existing.

All values are sanitized for `undefined` before writing (`cleanUndefined()` in `src/lib/storage.ts`).

## Key Components

- `Shell` — page wrapper + `TabBar`.
- `HomeHero`, `WeekStrip` — Today page.
- `SectionRule`, `LedgerRow`, `SelectRow`, `RuledField` — content blocks and list items.
- `Button`, `Segmented`, `Switch`, `ConfirmDialog` — controls.
- `PracticeBlock`, `EvidenceBlock`, `TypeRow` — journal/practice specific.

## i18n

Source of truth: `src/lib/i18n.ts`.

Whenever adding user-facing text, add to the `en` and `es` dictionaries and to the TypeScript `Translations` type.

## Closed Gaps

- **Legacy routes** are redirected from `next.config.ts` (`/journal`, `/settings`, `/goals`, `/progress`).
- **Hide entry text in previews** is wired: `/pages` reads `hidePreviews` from `user_settings` and hides the excerpt.
- **Default session duration** is now used in `/journal/new` (shown in the header).
- **Export** now downloads a `.txt` file and opens `window.print()` for a PDF.
- **Hardcoded copy in `/journal/new`** has been moved to `t.newEntry` and `t.common` (English + Spanish).
- **Unit test** added for `homeHero` states; `useLanguage` now has an English fallback when no `LanguageProvider` wraps a test.
- **Accessibility basics** in place: `Switch` (`role="switch"`, `aria-checked`), `Segmented` (`role="tablist"`), `TabBar` (`aria-current="page"`), `Button` (`focus-visible` ring).
- **Dark mode** implemented in `globals.css` with `.dark` token overrides.
- **Journal reader** now shows the prompt labels above each saved response; `handleSave` also stores `content.questions` so old and new entries keep the question context.
- **App lock** is wired: `AppLockGate` shows a passcode screen when `appLock` is enabled (a local 4+ digit code, not Face ID, which is not available to a plain web app).
- **Fake hero copy** removed; notes now use real data or honest placeholders.
- **i18n** extended: `t.homeHero` covers the Home hero states and `Shell` nav uses `t.nav`.

## Known Gaps / Next Steps

1. **E2E / visual regression tests** for the redesign are not in place yet.
2. **Full accessibility audit** not completed (keyboard flow, screen-reader tests, reduced-motion edge cases).

## Verification

After any change, run:

```bash
npm run build
```

The build is the current gate for TypeScript + static generation. Existing component tests are old wrappers and need a shared `LanguageProvider`/`AuthProvider` test harness; the new `homeHero` suite passes.
