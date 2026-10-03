# Contact form email setup

The contact form can send messages through EmailJS to `vaibhavkubde2003@gmail.com`. EmailJS identifiers are read from environment variables and are not embedded in the source. Without all three configured values, the form directs visitors to email you directly. The EmailJS public key is designed for browser use; never put a private key in a `VITE_*` variable.

1. Create an EmailJS account and connect an email service that delivers to your inbox.
2. Create an email template with these fields:
   - **To email:** `vaibhavkubde2003@gmail.com`
   - **Subject:** `Portfolio message: {{subject}}`
   - **Reply-to:** `{{reply_to}}`
   - **Message body:**

     ```text
     From: {{from_name}} ({{from_email}})

     {{message}}
     ```

3. Copy `.env.example` to `.env.local` and fill in the service ID, template ID, and public key from your account.
4. Restart the dev server after changing environment values. Add those same three `VITE_EMAILJS_*` values to your hosting provider when deploying.

The form sends `from_name`, `from_email`, `subject`, `message`, and `reply_to`, along with `userName` and `email` aliases for templates using those field names. Confirm the template's **To email** is your inbox and that the connected EmailJS service is authorized to send before relying on delivery. The app shows a success message only after EmailJS accepts the request.

The public key is intended for browser use. Configure EmailJS allowed domains and its rate limits before publishing the site. EmailJS sends directly from the visitor's browser, so use the provider's domain restrictions and quotas to limit abuse.

## Gmail `Invalid grant` (HTTP 412)

If the browser console reports `Gmail_API: Invalid grant. Please reconnect your Gmail account`, the Gmail authorization for the EmailJS service has expired or been revoked. In the EmailJS dashboard, open **Email Services**, select the Gmail service used by this site, reconnect/authorize the Gmail account, and run the service test. Keep the existing service ID if you reconnect the same service. If reconnecting cannot restore it, create a replacement Gmail service and update `VITE_EMAILJS_SERVICE_ID` in the deployment environment, then redeploy. This is a Gmail-to-EmailJS authorization issue; changing the form code or template fields does not refresh that authorization.
