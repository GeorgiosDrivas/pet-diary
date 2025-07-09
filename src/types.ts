import { noteSchemaType } from "./schemas/notesSchemas";

export type AppointmentsType = {
  id: string;
  title: string;
  doctor: string;
  start?: string;
  end?: string;
  date: string;
  time?: string;
  description?: string;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  weight: number;
  age: number;
  appointments: AppointmentsType[];
  notes: noteSchemaType[];
};

export type UserData = {
  pets: Pet[];
  displayName: string;
};

export type User = {
  displayName: string | null;
  email: string | null;
  uid: string;
};

export type Data = {
  pet: Pet | null;
};

export type editNoteTypes = {
  userId: string;
  pet: Pet;
  Note: noteSchemaType | null;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUserData: () => Promise<void>;
};

export type newNoteFormTypes = {
  userId: string;
  newNote: noteSchemaType;
  pet: Pet | null;
};
