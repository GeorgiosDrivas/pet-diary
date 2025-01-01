import { AppointmentsType, MedicationType } from "@/types";

export const stateChange = <T extends MedicationType | AppointmentsType>(
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
