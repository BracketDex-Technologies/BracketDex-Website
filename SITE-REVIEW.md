# BracketDex experience review

Reviewed 1 November 2026 on the local preview. Subjective rating of the reviewed journey after improvements: **8/10**. This is a design and usability assessment, not a performance score or accessibility certification.

## Journey and findings

1. **Homepage / entry — good.** Desktop capture shows a distinct orange and charcoal identity, readable headline and a clear Discuss Your Project action. A transient reveal state was rejected and recaptured once the headline was visible. No desktop horizontal overflow was detected. Evidence: `C:/Users/choud/AppData/Local/Temp/bdex-audit-20261101/06-home-desktop.png`.
2. **Projects / discovery — improved.** Context illustrations and category controls make a substantial portfolio easier to browse. On mobile the context row scrolls horizontally; previously the adjacent count/select toolbar compressed long selected categories. The select now occupies a full row. Evidence: `C:/Users/choud/AppData/Local/Temp/bdex-audit-20261101/04-projects-mobile-after.png`.
3. **Contact / enquiry — improved.** A service URL arrived at an empty message field. Known service, scenario and project-brief links now prefill an editable opening line without replacing existing input. A privacy explanation and policy link now appear before submission. A concrete message prompt helps visitors explain their goals. Browser validation now matches server length limits. Empty-form validation focused Name and displayed field errors. Evidence: `C:/Users/choud/AppData/Local/Temp/bdex-audit-20261101/05-contact-mobile-after.png`.

## Verification and limits

- Browser inspected the rendered homepage, project discovery and mobile enquiry screens in this run; this is a focused journey review, not an exhaustive audit of every section on every route.
- TypeScript passes. Eight relevant tests pass across minimal pages, project categories/assets, missing-page behavior, indexing exclusions and rejected form submissions.
- No real customer enquiry was sent. Inbox delivery and success/failure recovery with the live delivery provider still require configured credentials and a controlled delivery test.
- Screenshots support visual hierarchy and reflow observations; they cannot establish full contrast, screen-reader, keyboard or WCAG compliance. A complete assistive-technology audit remains separate work.
- Customer-approved quotes and project screenshots would strengthen trust. Publish only supplied, approved evidence; no reviews, performance claims, customer identities or business promises were invented.
- Analytics and Search Console account setup remain the items documented in LAUNCH-CHECKLIST.md.

The Product Design audit workflow guided screenshot capture before selecting the fixes. Existing typography, palette, layouts and page structure were retained.

## Second improvement pass

- Project search matches names, categories, business challenges and existing project details. It combines with category selection; the count and cards use one matching function.
- Clear filters restores the complete portfolio; an empty state explains how to recover when nothing matches.
- Each project offers a contextual enquiry link. The form prefills an editable opening line only for known projects and service topics.
- Hero video now has a visible, keyboard-accessible pause/resume control. Reduced-motion and data-saving behavior remain in place.
- Browser verified a WiseMelon query returns one card, an unmatched query shows the empty state, clearing restores 18 cards, the project enquiry preserves its name, and video paused state changes correctly.
- The repeated validation test hit the intended request rate limit. Its requests now use a unique documentation-only test address per run to isolate validation testing from previous runs without weakening production limits.

Evidence: `C:/Users/choud/AppData/Local/Temp/bdex-audit-20261101/08-project-search.png`.

A universal 10/10 cannot be established through code changes: approved customer proof, live delivery, real visitor feedback and broader accessibility/performance checks remain meaningful acceptance criteria.
