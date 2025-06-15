import React, { useState } from "react";
import { Pet } from "@/types";

export default function DemoNewPet({
  setPets,
}: {
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}) {
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
        start: "2024-10-10",
        end: "2024-10-10",
        time: "",
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
    <div className="h-full mt-8 bg-white rounded-[40px]">
      <h1 className="new-pet-title font-bold">Add your pet&apos;s details</h1>
      <p>Don&apos;t worry. You can always change them.</p>
      <div className="mt-5 w-[25%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPets((prevPets) => [...prevPets, newPet]);
          }}
        >
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
              setNewPetState({
                ...newPetState,
                species: e.currentTarget.value,
              })
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
          <div className="mt-4">
            <button type="submit" className="mt-3 submit-btn">
              Add new pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
