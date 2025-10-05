export const handleGoogleLogin = (): void => {
  const redirectUrl = "https://pet-helsi-main-zs4f.vercel.app/owner/profile";
  window.location.href = `https://ec2-16-170-244-37.eu-north-1.compute.amazonaws.com/api/oauth2/authorization/google?redirect_uri=${encodeURIComponent(
    redirectUrl
  )}`;
};
