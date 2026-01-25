export const updatePetAvatar = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return fetch(`/api/pets/${id}/avatar`, {
    method: "PUT",
    body: formData,
  });
};
