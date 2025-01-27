import { OidcProvider, useOidc, getImpersonationLink } from "./oidc";

export function App() {
  return (
    <OidcProvider>
      <ContextualizedApp />
    </OidcProvider>
  );
}

const USER= "alice";
const REDIRECT_URL= "https://example-tanstack-router.oidc-spa.dev"

const impersonationLink = getImpersonationLink({
  user: USER,
  redirectUrl: REDIRECT_URL
});

export function ContextualizedApp() {
  const { logout, oidcTokens } = useOidc();

  return (
    <>
      <h1>Hello {oidcTokens.decodedIdToken.preferred_username}</h1>
      <br />
      <p> Click on the following link to impersonate <code>{USER}</code> on <code>{REDIRECT_URL}</code></p>
      <br />
      <a href={impersonationLink}>{impersonationLink}</a>
      <br />
      <br />
      <button
        onClick={() =>
          logout({
            redirectTo: "home",
          })
        }
      >
        Logout
      </button>
    </>
  );
}
