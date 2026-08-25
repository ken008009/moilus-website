# Mobius Strip Website

Official site, served at `/official` on the product domain.

| Path | App |
| --- | --- |
| `/` | User client |
| `/adminsystem` | Admin |
| `/official` | This website |

```bash
pnpm dev
```

Then visit `http://127.0.0.1:5173/official/`.

```bash
pnpm build
```

Output goes to `official/`. Copy that folder to the server as `/var/www/official/`.

On the main domain, route `/official` to this site **before** the user-client catch-all.
