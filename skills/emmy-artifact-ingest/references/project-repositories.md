# Project Repositories

These repositories are known Emmy project source repositories for repository
ingestion. Do not commit machine-specific checkout paths.

| Repository              | Remote URL                                     | Notes                                                   |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| `CMSgov/emmy-infra`     | `https://github.com/CMSgov/emmy-infra.git`     | CMS Cloud infrastructure and deployment automation.     |
| `CMSgov/emmy-api`       | `https://github.com/CMSgov/emmy-api.git`       | Emmy API source.                                        |
| `CMSgov/emmy-app`       | `https://github.com/CMSgov/emmy-app.git`       | Emmy app/frontend source.                               |
| `DSACMS/iv-cbv-payroll` | `https://github.com/DSACMS/iv-cbv-payroll.git` | Current payroll/income verification application source. |

## Resolving A Local Checkout

Use the first matching checkout from this list:

1. A path supplied by the user.
2. The current working directory, if it is inside a matching Git checkout.
3. A matching repository under `$HOME/cmsgov`.
4. A matching repository under `$HOME/DSACMS`.

If no checkout is found, ask for a local checkout path. Do not use GitHub web
pages as the source of truth for repository ingestion.

## Verification Commands

Use equivalent commands for the local environment:

```bash
git -C <checkout> remote -v
git -C <checkout> branch --show-current
git -C <checkout> rev-parse HEAD
git -C <checkout> status --short
git -C <checkout> rev-parse --show-toplevel
```

Record the remote URL, branch, HEAD commit, clean/dirty status, and relative
source paths used for every extracted claim.
