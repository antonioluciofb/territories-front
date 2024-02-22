export const createInitials = (name?: string) => {
  if (!name) return "";

  const nameArray = name.split(" ");
  const initials = nameArray.map((name) => name[0]);
  return initials.join("");
};
