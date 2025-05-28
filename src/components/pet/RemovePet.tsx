import { removePet } from "../../../firebase/deleteMethods";

export const handleRemovePet = async (userId: string, petName: string) => {
  try {
    await removePet(userId, petName);
  } catch (error) {
    console.error("Error deleting pet:", error);
  }
};
