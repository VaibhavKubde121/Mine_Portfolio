# Vaibhav Kubde - Portfolio

Personal portfolio built with React, Vite, Tailwind CSS, and Lucide icons.

## Run locally

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist` directory to a static host. The `/projects` page uses
client-side routing; configure the host to serve `index.html` for that path.
The included `public/_redirects` file provides this fallback on Netlify and
Cloudflare Pages. Add the three `VITE_EMAILJS_*` values from
[`.env.example`](.env.example) to the hosting environment if you want the contact
form to send email. Without those values, the page gives visitors your direct
email link instead. See [CONTACT_SETUP.md](CONTACT_SETUP.md) for EmailJS setup.

Use a custom domain with HTTPS for a public launch. Add a social preview image
and canonical URL once the final domain is known.
