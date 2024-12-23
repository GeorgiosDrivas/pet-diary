export interface AppointmentsType {
  title: string;
  doctor: string;
  date: string;
  notes?: string;
}

export interface MedicationType {
  medicationName: string;
  dosage: string;
  notes?: string;
}

export interface Pet {
  name: string;
  appointments: {
    title: string;
    doctor: string;
    date: string;
    notes?: string;
  }[];
  medications: {
    medicationName: string;
    dosage: string;
    notes?: string;
  }[];
}

export interface UserData {
  pets: Pet[];
  displayName: string;
}
