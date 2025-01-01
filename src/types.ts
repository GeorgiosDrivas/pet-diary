export interface AppointmentsType {
  id: number;
  title: string;
  doctor: string;
  date: string;
  notes?: string;
}

export interface MedicationType {
  id: number;
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
