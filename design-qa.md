# Minimal Contact verification

Date: October 30, 2026.

final result: passed

## Scope and result

Implemented `/contact` as a minimal extension of the approved About/FAQ page family. The page uses the existing Newsreader/DM Sans fonts, ivory surface, a short introduction, a single form column and one direct-email alternative. The actual homepage Navbar and Footer remain the default. No new image direction or external delivery integration was introduced.

Preview: `http://127.0.0.1:3101/contact`.

Evidence directory: `C:/Users/pawan/.codex/visualizations/2026/10/29/01a18877-8b29-76f3-adf5-d195d0d3ea8a/implementation-contact/`.

Opened and inspected `desktop-initial.png`, `desktop-final.png`, `mobile-320-final.png` and `validation-mobile-final.png`. Also captured `mobile-390-final.png` and `validation-desktop.png`. Desktop checked at the normal approximately 1280px viewport; mobile at 390 x 844 and 320 x 844. Temporary viewport overrides were reset.

## Correction

The first desktop check found that Company occupied only half the form width. CSS Modules had scoped an ID selector inside `:has()`. Replaced it with an attribute selector using the existing input name. After rebuilding and recapturing, Company measures 768px, equal to the entire form, while Name and Email remain paired. Message also spans the form width. No actionable visual or responsive issue remains.

## Verification

- Final production build passed, including TypeScript validation and generation of all 17 static pages.
- All 13 focused checks passed: 11 existing page/asset/taxonomy checks plus the route baseline and shared-navbar check. Updated the Contact route baseline to expect its new visible heading.
- Contact renders exactly one form, existing labeled fields and the truthful Prepare Email Enquiry action. `/contact` and incoming service, scenario and project-brief query links all render successfully.
- HTTP comparisons confirmed exact homepage Footer markup and the shared Navbar class.
- Desktop Name/Email fields share a row. Company and Message span the form width. All fields stack on mobile. Neither mobile width produces horizontal document overflow.
- Submitting an empty form displays the existing three errors, connects each through aria-describedby, marks fields invalid and focuses Name. Keyboard order continues through Email, Company, Message and the submit button, skipping the hidden honeypot.
- Correcting Name, Email and Message with synthetic preview values clears all errors. Company remains empty and valid. No valid browser form was submitted.
- Local API validation rejects empty input with 400 and accepts valid synthetic input with 200 for email-draft preparation. The API does not send email.
- Final browser error log is empty. Input values were cleared and the preview was left at its initial state.
- Existing ContactForm and `/api/contact` source remain unchanged. No neighboring page body, shared chrome or protected project/problem card was edited. The shell change only adds Contact to its accepted page names.
- Build-generated changes to tsconfig.json and next-env.d.ts were restored. `git diff --check` passes. No dependency changes, staging, commit, push or deployment.

## Preserved delivery behavior

The form validates locally, requests server validation, then opens a draft in the visitor's email application and proceeds to the existing thank-you page. The form explicitly states that nothing is sent automatically. The email-application handoff and thank-you transition were preserved in source and were not exercised; no email application was opened and no enquiry was sent.

Previous About/FAQ QA is archived in `docs/superpowers/qa/2026-10-30-about-faq-design-qa.md`. The production preview remains running on port 3101.
