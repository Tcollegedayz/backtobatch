# BackToBatch Supabase Login Upgrade

This package connects the GitHub Pages site to the Supabase project:

- Project URL: `https://ohovoqxetqsjcmapdmcm.supabase.co`
- Frontend key: publishable key only
- Live site: `https://tcollegedayz.github.io/backtobatch/`

## 1. Create the profile table

In Supabase:

1. Open **SQL Editor**
2. Click **New query**
3. Open `SUPABASE_SETUP.sql`
4. Copy the entire contents
5. Click **Run**

This creates the profile table, enables Row Level Security and restricts every user to their own profile.

## 2. Configure authentication URLs

Open **Authentication → URL Configuration**.

Set **Site URL** to:

`https://tcollegedayz.github.io/backtobatch/`

Add this **Redirect URL**:

`https://tcollegedayz.github.io/backtobatch/login.html`

## 3. Keep email/password enabled

Open **Authentication → Providers → Email** and keep Email enabled.

For initial testing, you may either:
- keep Confirm email enabled and click the confirmation email; or
- temporarily disable Confirm email while testing.

For public launch, email confirmation is recommended.

## 4. Upload to GitHub

Replace the existing repository files with the files in this ZIP.

Important:
- `index.html` must remain in the repository root.
- Upload the `assets` folder.
- Upload `login.html`, `register.html`, and `dashboard.html`.
- Do not upload any Supabase secret or service-role key.

## 5. Test

1. Open `https://tcollegedayz.github.io/backtobatch/register.html`
2. Register with an accessible email
3. Confirm the email if requested
4. Log in
5. Open the dashboard
6. Save the profile
7. Refresh the page and confirm that the profile remains saved
