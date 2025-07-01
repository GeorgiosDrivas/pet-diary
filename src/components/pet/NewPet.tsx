import React, { useState } from "react";
import { addPet } from "../../../firebase/addMethods";
import { Pet } from "@/types";
import { PetFormData, petSchema } from "@/schemas/petSchema";

export default function NewPet({ userId }: { userId: string }) {
  const [newPetState, setNewPetState] = useState<PetFormData>({
    name: "",
    species: "",
    breed: "",
    age: 1,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof newPetState, string>>
  >({});

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

  const onSubmit = () => {
    const result = petSchema.safeParse(newPetState);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof newPetState;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    if (userId) {
      addPet(userId, newPet);
      setNewPetState({ name: "", species: "", breed: "", age: 1 });
    }
  };

  return (
    <div className="h-full mt-8 bg-white rounded-[40px]">
      <h1 className="new-pet-title font-bold">Add your pet&apos;s details</h1>
      <p>Don&apos;t worry. You can always change them.</p>
      <div className="mt-5 w-[25%]">
        <form
          onSubmit={() => {
            onSubmit();
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
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

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
            required
          />
          {errors.species && (
            <p className="text-red-500 text-sm">{errors.species}</p>
          )}

          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={newPetState.breed}
            onChange={(e) =>
              setNewPetState({ ...newPetState, breed: e.currentTarget.value })
            }
            required
          />
          {errors.breed && (
            <p className="text-red-500 text-sm">{errors.breed}</p>
          )}

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={newPetState.age}
            onChange={(e) =>
              setNewPetState({
                ...newPetState,
                age: Number(e.currentTarget.value),
              })
            }
            required
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

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
