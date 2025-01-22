export interface AppointmentsType {
  id: string;
  title: string;
  doctor: string;
  start: string;
  end: string;
  description?: string;
}

export interface MedicationType {
  id: string;
  medicationName: string;
  dosage: string;
  notes?: string;
}

export interface Pet {
  name: string;
  species: string;
  breed: string;
  age: string;
  appointments: AppointmentsType[];
  medications: MedicationType[];
}

export interface UserData {
  pets: Pet[];
  displayName: string;
}

export interface User {
  displayName: string | null;
  email: string | null;
  uid: string | null;
}

export interface Data {
  pet: Pet | null;
}
