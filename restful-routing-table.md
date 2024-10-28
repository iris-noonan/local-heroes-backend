| Name               | Route                        | HTTP Method | Purpose                                  | Authed? | Authorized |
|--------------------|------------------------------|-------------|------------------------------------------|---------|------------|
| Landing Page       | `/`                          | GET         | Render landing page                      | No      | No         |
| Dashboard          | `/`                          | GET         | Render personalized dashboard            | Yes     | No         |
| Create User Page   | `auth/sign-up`               | GET         | Renders form to sign up                  | No      | No         |
| Create User Path   | `auth/sign-up`               | POST        | Creates user, saves to DB, sign in       | No      | No         |
| Sign In Page       | `auth/sign-in`               | GET         | Renders form to sign in                  | No      | No         |
| Sign In Route      | `auth/sign-in`               | POST        | Sends user data to be authenticated      | No      | No         |
| Profile Page       | `auth/profile/:userId`       | GET         | Renders profile page                     | Yes     | Yes        |
| Profile Update Route| `auth/profile/:userId`      | POST        | Submit changes and save                  | Yes     | Yes        |
| Jobs Index         | `jobs/`                      | GET         | Show all jobs                            | Yes     | No         |
| Job Show Page      | `jobs/:jobId`                | GET         | Details of a job                         | Yes     | No         |
| Job Create Route   | `jobs/`                      | POST        | Submit job and post it (go live)         | Yes     | No         |
| Job Delete Route   | `jobs/:jobId`                | DELETE      | Delete a job                             | Yes     | Yes        |
| Job Update Page    | `jobs/:jobId/edit`           | GET         | Render populated form to edit            | Yes     | Yes        |
| Job Update Route   | `jobs/:jobId`                | PUT         | Submit changes and save                  | Yes     | Yes        |
| Helper Index       | `helpers/`                   | GET         | Show all helpers                         | Yes     | No         |
| Helper Show Page   | `helpers/:helperId`          | GET         | Details of a helper                      | Yes     | No         |
| Helper Create Route| `helpers/new`                | POST        | Submit helper application (go live)      | Yes     | No         |
| Helper Delete Route| `helpers/:helperId`          | DELETE      | Delete a helper                          | Yes     | Yes        |

### Phase 2

| Name               | Route                        | HTTP Method | Purpose                                  | Authed? | Authorized |
|--------------------|------------------------------|-------------|------------------------------------------|---------|------------|
| I Can Help         | `jobs/:jobId/`               | POST        | Helper offers to take on a job           | Yes     | Yes        |
| Remove I Can Help  | `jobs/:jobId/`               | DELETE      | Helper retracts offer to help            | Yes     | Yes        |
| Offers Index       | `jobs/:jobId/:helperId`      | GET         | Shows a list of offers to help           | Yes     | Yes        |
| Accept Offer       | `jobs/:jobId/:helperId`      | POST        | Helpee accepts a helper's offer          | Yes     | Yes        |
| Remove Accepted Offer| `jobs/:jobId/:helperId`    | DELETE      | Helpee retracts offer acceptance         | Yes     | Yes        |
| Job Done (Appreciate) | `jobs/:jobId/:helperId`   | POST/PUT    | Helpee marks job as done                 | Yes     | Yes        |
| Create Comment     | `jobs/:jobId/comments`       | POST        | Post a comment on a job                  | Yes     | No         |
| Update Comment     | `jobs/:jobId/comment/:commentId` | PUT | Submit changes and save                 | Yes     | Yes        |
| Delete Comment     | `jobs/:jobId/comment/:commentId` | DELETE| Delete a comment                         | Yes     | Yes        |
| Local Area Feed    | `jobs/:jobId/comment/:commentId` | GET | Display feed of comments & completed jobs| Yes     | No         |
| Filter/Search      | ` `                          | GET         | Filter or search                         | Yes     | Yes        |

### Phase 3

| Name               | Route                        | HTTP Method | Purpose                                  | Authed? | Authorized |
|--------------------|------------------------------|-------------|------------------------------------------|---------|------------|
| Profile Delete Route | `auth/:profile/userId`     | DELETE      | Delete a user and all their content      | Yes     | Yes        |
| Map Route          | ` `                          | GET         | Display map                              | Yes     | No         |
