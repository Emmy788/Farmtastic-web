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
<img width="1902" height="841" alt="image" src="https://github.com/user-attachments/assets/086f7cf1-1034-473c-ad91-e03badbb5e72" />
<img width="1890" height="836" alt="image" src="https://github.com/user-attachments/assets/370c57bb-bc44-4213-b1c0-8dc84ab8484d" />
<img width="1917" height="852" alt="image" src="https://github.com/user-attachments/assets/b94afd62-4b24-42b0-a6f4-e72b5e1132a6" />
<img width="1913" height="846" alt="image" src="https://github.com/user-attachments/assets/8f41a678-e09b-42e6-aae4-3cb67e65e8a2" />
<img width="1889" height="839" alt="image" src="https://github.com/user-attachments/assets/270f4fa8-3c07-4086-abae-932b56e970ef" />

---

## Getting started

```bash
git clone https://github.com/Emmy788/Farmtastic-web.git
cd Farmtastic-web
```

Run the site from a local web server rather than opening the files directly:

- **VS Code Live Server (recommended):** open the project folder, right-click `home.html`, and choose **Open with Live Server**. The site runs at `http://127.0.0.1:5500/home.html`.
- **Python alternative:** run `python -m http.server 8000` and open `http://localhost:8000/home.html`.

Live Server's port can change (for example to 5501) if 5500 is busy. Check the address bar and use that address in the Supabase settings below.

---

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
- Using **Supabase** as a backend for a static website:
  - **Authentication:** connecting the sign-up and login forms to Supabase Auth, so accounts are created and checked securely instead of storing passwords myself
  - **Database:** setting up PostgreSQL tables (farmer profiles and service requests) by running a SQL schema in the Supabase SQL Editor
  - **Row-level security:** writing policies so each signed-in user can only read and change their own records
  - **Configuration:** keeping the project URL and publishable key in a local config file that stays out of the repository, and never exposing the secret key in browser code
  - **Redirects and email settings:** setting allowed redirect URLs and handling email confirmation and rate limits
- Giving users feedback with success and error messages, and redirecting them after login
- Debugging real problems, including relative file paths in CSS and mismatched local addresses (`localhost` vs `127.0.0.1`)
  
---

## Built at

This project was built as part of the **Web Development Certificate** at **GoMyCode Kenya** 🇰🇪

---

## Author

**Emmy** · [GitHub](https://github.com/Emmy788) · [emeraldmwaniga80@gmail.com](mailto:emeraldmwaniga80@gmail.com)
