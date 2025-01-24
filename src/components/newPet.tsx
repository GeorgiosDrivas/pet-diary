import React, { useState } from "react";
import { addPet } from "../../firebase/addMethods";
import { Pet } from "@/types";

export default function NewPet() {
  const [newPetState, setNewPetState] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  });

  const newPet: Pet = {
    name: newPetState.name,
    species: newPetState.species,
    breed: newPetState.breed,
    age: newPetState.age,
    appointments: [
      {
        id: "1",
        title: "Example",
        doctor: "Dr. Example",
        start: "10/10/2024",
        end: "10/10/2024",
        description: "This is an example appointment",
      },
    ],
    medications: [
      {
        id: "1",
        medicationName: "Example",
        dosage: "Dr. Example",
      },
    ],
  };

  return (
    <div className="grid grid-rows-12 gap-4 h-full py-3">
      <div className="new-pet row-span-6">
        <h1>Add a new pet</h1>
        <form onSubmit={() => addPet(1, newPet)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newPetState.name}
            onChange={(e) =>
              setNewPetState({ ...newPetState, name: e.currentTarget.value })
            }
          />
          <label htmlFor="species">Species</label>
          <input
            type="text"
            id="species"
            name="species"
            value={newPetState.species}
            onChange={(e) =>
              setNewPetState({ ...newPetState, species: e.currentTarget.value })
            }
          />
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={newPetState.breed}
            onChange={(e) =>
              setNewPetState({ ...newPetState, breed: e.currentTarget.value })
            }
          />
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={newPetState.age}
            onChange={(e) =>
              setNewPetState({ ...newPetState, age: e.currentTarget.value })
            }
          />
          <button type="submit" className="mt-3">
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
}
