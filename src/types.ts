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

export type MedicationType = {
  id: string;
  medicationName: string;
  dosage: string;
  notes?: string;
};

export type Pet = {
  name: string;
  species: string;
  breed: string;
  age: number;
  appointments: AppointmentsType[];
  medications: MedicationType[];
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
