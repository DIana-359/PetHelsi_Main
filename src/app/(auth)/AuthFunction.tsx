export const handleGoogleLogin = (role?: "CLIENT" | "VET"): void => {
  const redirectUri = encodeURIComponent(
    `${window.location.origin}/oauth-callback`
  );

  const state = role ? encodeURIComponent(JSON.stringify({ role })) : undefined;
  window.location.href =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${redirectUri}&` +
    `response_type=code&` +
    `scope=email profile openid` +
    (state ? `&state=${state}` : "");
};
