# Farmtastic — Agribusiness Website

A full multi-page website for an agribusiness brand built with HTML, CSS and JavaScript.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## About

Farmtastic is a multi-page website designed for an agribusiness brand. Built as a capstone project during my web development certificate at [GoMyCode Kenya](https://gomycode.com/ke). The site is fully designed and coded from scratch — no templates or frameworks used.

**Pages included:**

- Home — hero section with background image, tagline and call-to-action
- About — brand story and mission
- Services — offerings for farmers
- Features — platform highlights
- Contact — contact form and team contacts
- Sign Up — user registration page

---

## Preview

<img width="1917" height="848" alt="image" src="https://github.com/user-attachments/assets/59af7710-4018-4c69-8b1a-07e71e5702f9" />
<img width="1919" height="848" alt="image" src="https://github.com/user-attachments/assets/131fa7bf-cd77-4a51-ab0a-e0fe649bd5ca" />
<img width="1920" height="841" alt="image" src="https://github.com/user-attachments/assets/a293ace9-a069-45b8-8add-7a3673169a7d" />

---

## Getting started

```bash
git clone https://github.com/Emmy788/Farmtastic-web.git
cd Farmtastic-web
```

Serve the project from a local web server (rather than opening the pages as `file://` URLs):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/home.html`.

## Supabase setup

The signup and login forms use Supabase Auth. The database starter schema creates farmer profiles and service requests, with row-level security so authenticated users can only read their own records and submit requests for their own account.

1. In the Supabase Dashboard, open **SQL Editor**, paste in `supabase/schema.sql`, and run it.
2. Copy `supabase-config.example.js` to `supabase-config.js`.
3. In **Project Settings → API**, copy the Project URL and the publishable key into `supabase-config.js`. The publishable key is intended for browser use; never put a `service_role` or secret key in this website.
4. In **Authentication → URL Configuration**, set the Site URL to your local site while developing (for example `http://localhost:8000`) and add `http://localhost:8000/login.html` to the allowed redirect URLs. Add your production domain and its login URL before deploying.
5. In **Authentication → Providers → Email**, choose whether users need to confirm their email. When confirmation is enabled, users follow the email link back to the login page.

The project URL and publishable key are not included in the repository. The local `supabase-config.js` file is ignored by Git. Do not rely on that ignore rule as a security boundary: database access must remain protected by the row-level security policies in the schema.

The schema does not create an admin dashboard. Staff can review or update requests through Supabase Dashboard for now; a staff-facing workflow can be added after the farmer signup and request flow is confirmed.

---

## What I learned

- Building and linking a multi-page website structure
- Creating a full hero section with background image and overlay text
- Designing a consistent navbar with logo and social media icons across pages
- Applying branding (colours, typography, logo) consistently throughout a site

---

## Built at

This project was built as part of the **Web Development Certificate** at **GoMyCode Kenya** 🇰🇪

---

## Author

**Emmy** · [GitHub](https://github.com/Emmy788) · [emeraldmwaniga80@gmail.com](mailto:emeraldmwaniga80@gmail.com)
