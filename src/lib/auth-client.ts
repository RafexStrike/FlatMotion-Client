import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use same-origin /api/auth so Vercel rewrites can preserve the auth cookie scope.
});
