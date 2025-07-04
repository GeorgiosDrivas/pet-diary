import { noteSchemaType } from "./schemas/notesSchemas";

export type AppointmentOptions = {
  [key: string]: string | number | boolean;
};

export type AppointmentsType = {
  id: string;
  title: string;
  doctor: string;
  start: string;
  end: string;
  time: string;
  description?: string;
  people?: string[];
  calendarId?: string | null;
  location?: string;
  _options?: AppointmentOptions;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
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
};

export type newNoteFormTypes = {
  userId: string;
  newNote: noteSchemaType;
  setNewNote: React.Dispatch<React.SetStateAction<noteSchemaType>>;
  pet: Pet | null;
};
