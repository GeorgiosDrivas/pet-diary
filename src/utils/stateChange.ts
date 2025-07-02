import { noteSchemaType } from "@/schemas/notesSchemas";
import { AppointmentsType } from "@/types";

export const stateChange = <T extends noteSchemaType | AppointmentsType>(
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  value: keyof T,
  setter: React.Dispatch<React.SetStateAction<T>>,
  obj: T
) => {
  setter({
    ...obj,
    [value]: e.target.value,
  });
};
