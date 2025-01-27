import { createReactOidc } from "oidc-spa/react";
import { z } from "zod";

const KC_HTTP_RELATIVE_PATH = ""; // "/auth";

const KEYCLOAK_ROOT_URL = `https://oidc-spa.cloud-iam.com${KC_HTTP_RELATIVE_PATH}`;

const REALM = "oidc-spa";

export const { OidcProvider, useOidc, getOidc } = createReactOidc({
  issuerUri: `${KEYCLOAK_ROOT_URL}/realms/${REALM}`,
  clientId: "impersonation-test",
  decodedIdTokenSchema: z.object({
    preferred_username: z.string(),
  }),
  BASE_URL: import.meta.env.BASE_URL,
  isAuthGloballyRequired: true,
  doEnableDebugLogs: true,
});

export function getImpersonationLink(params: {
  user: string;
  redirectUrl: string;
}) {
  const { user, redirectUrl } = params;

  const url = new URL(`${KEYCLOAK_ROOT_URL}/admin/${REALM}/console`);

  url.searchParams.append("impersonate.user", user);
  url.searchParams.append("impersonate.redirectUrl", redirectUrl);

  return url.href;
}
