# BracketDex launch readiness

Implemented in code:

- Real custom 404 response with links to Home, Services, Projects, and Contact.
- Unique page titles, descriptions, canonical URLs, Open Graph, and Twitter metadata.
- Dynamic `/sitemap.xml` and `/robots.txt` using `https://bracketdex.com`.
- `/thank-you` is `noindex` and excluded from the sitemap.
- Contact form server validation, honeypot, and a five-request-per-ten-minute in-memory rate limit.
- Analytics consent banner. GA4 loads only when consent is accepted and `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.
- Privacy template at `/privacy`, linked in the footer.
- Review placeholders only; no invented testimonials or review schema.

Before launch, provide or confirm:

1. The production domain and DNS/HTTPS redirect at the hosting provider.
2. A real GA4 Measurement ID in `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
3. Legal review of `/privacy` and the correct business/contact details.
4. Approved FAQ additions, if the current five questions are incomplete.
5. Customer-approved reviews, names, companies, and images, if testimonials are wanted.
6. A production email delivery provider if enquiries should be sent automatically instead of opening the visitor’s email client.

In GA4, mark the `page_view` for `/thank-you` as a key event after the form flow is connected to your measurement ID.
