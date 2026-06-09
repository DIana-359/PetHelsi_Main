import { useState } from "react";

export function usePetAvatar() {
  const [image, setImage] = useState<{ preview: string; file: File } | null>(
    null,
  );
  const [showAvatarSuccess, setShowAvatarSuccess] = useState(false);

  return {
    image,
    setImage,
    showAvatarSuccess,
    setShowAvatarSuccess,
  };
}
