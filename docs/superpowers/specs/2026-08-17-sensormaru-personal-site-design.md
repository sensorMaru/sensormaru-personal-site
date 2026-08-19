# SensorMaru Personal Site Design

**Goal:** Build a Chinese-first personal website for Shen Zhiyu that presents profile, education, internships, projects, skills, and contact info, with a clean portfolio style and a deployment path centered on `sensormaru.com`.

## Product Shape

The site will be a content-driven personal portfolio, not a marketing landing page. The first release should work well as a single scrolling homepage with anchored sections so it is fast to ship and easy to maintain.

The visual reference is `lzxmaomao.cn`: restrained, structured, strong typography, clear section breaks, and project-first presentation. The site should feel calm and professional, with enough visual rhythm to stay interesting but without decorative clutter.

## Content Model

### Identity
- Name: 沈智宇
- Site brand: SensorMaru
- Primary language: Chinese
- Public email: 17816501613@163.com

### Sections
1. Hero
2. About
3. Education
4. Internship Experience
5. Project Work
6. Skills
7. Contact

### Content Rules
- Internship entries must be concise.
- Each company must use no more than 4 bullet points.
- Each bullet point must stay within 2 sentences.
- Project Work must include `design-award-meta-search` as one featured project.
- Additional projects will be added later without reworking the page structure.

## Information Architecture

### Hero
The top section should establish the name, current direction, and a short positioning statement. It should immediately tell the visitor who the site belongs to and what kind of work they will find.

### About
This section should summarize the profile in a few sentences: design and product background, AI product focus, and the blend of academic and practical experience.

### Education
Show the two degrees as compact timeline items:
- Zhejiang University, Master, Industrial Design, 2024.09-2027.06
- China Academy of Art, Bachelor, Innovation Design, 2020.09-2024.06

### Internship Experience
Use one block per company. Each block should contain role, company, time range, and up to 4 concise bullets.

The content should be distilled from the resume rather than copied verbatim. The page should emphasize what was done and what changed, not long process narration.

### Project Work
Use a featured-project layout. `design-award-meta-search` should be shown first, with a title, one-line summary, role or stack note, and a link card.

Current live URL: `https://awards.sensormaru.com/`

The site should reserve space for more projects supplied later by the user. Those later projects should drop into the same card/list pattern without layout changes.

### Skills
Group skills into a small number of clear buckets such as product thinking, AI/product tools, design tools, data analysis, and languages.

### Contact
Keep this lightweight and practical. Email should be visible. Other contact methods can be added later if the user wants them public.

## Delivery Architecture

### Frontend
Use Astro for a static-first site. The site should be built from small components and content data, so new experience or project entries can be added without touching layout logic.

### Content Storage
Keep the user-facing content in structured data files rather than hard-coded in page markup. That makes it easier to update internship bullets, add new projects, or swap URLs later when project hosting changes.

### Deployment
Deploy the personal site to Cloudflare Pages and connect it to `sensormaru.com`.

### Domain
Preferred primary domain: `sensormaru.com`.

If the domain is unavailable at purchase time, use the closest available `.com` variant and keep the same site architecture.

### Project Hosting
`design-award-meta-search` should initially be represented as an external project link if needed, then moved under the same domain family later after migration.

## Visual Rules

- Clean, editorial, and sectioned
- Strong hierarchy over decoration
- Minimal radius and restrained motion
- Project cards should be readable at a glance
- No dense text walls in the internship section
- Mobile and desktop should both preserve the same content order

## Risks and Constraints

- The domain has not been purchased yet, so DNS and deployment wiring must be staged carefully.
- Additional project URLs are not available yet, so the project section must support later expansion.
- The internship copy must stay short, which means the content system should favor concise bullets over paragraphs.

## Success Criteria

- The site can be deployed publicly on a custom domain.
- The homepage clearly presents identity, education, internships, projects, skills, and contact.
- Internship content remains concise and scannable.
- The current `design-award-meta-search` project is visible in the project section.
- The page structure can absorb more projects later without redesign.
