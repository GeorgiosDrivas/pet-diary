import React, { useEffect, useState } from "react";
import { Pet } from "@/types";
import { editPetDetails } from "../../../firebase/editMethods";

export default function EditPetDetails({
  setEdit,
  pet,
  userId,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  pet: Pet;
  userId: string;
}) {
  const [updatedPet, setUpdatedPet] = useState<Pet>({
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    appointments: pet.appointments,
    medications: pet.medications,
  });

  useEffect(() => {
    setUpdatedPet(pet);
  }, [pet]);

  const handleSubmit = async () => {
    await editPetDetails(userId, pet.name, updatedPet);
    setEdit(false);
  };

  return (
    <>
      <form onSubmit={() => handleSubmit()} className="w-[30%]">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={updatedPet.name || ""}
            onChange={(e) =>
              setUpdatedPet((prv) => ({ ...prv, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="species">Species</label>
          <input
            type="text"
            id="species"
            value={updatedPet.species || ""}
            onChange={(e) =>
              setUpdatedPet((prv) => ({ ...prv, species: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            value={updatedPet.breed || ""}
            onChange={(e) =>
              setUpdatedPet((prv) => ({ ...prv, breed: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={updatedPet.age || ""}
            onChange={(e) =>
              setUpdatedPet((prv) => ({ ...prv, age: Number(e.target.value) }))
            }
          />
        </div>
        <div className="flex justify-between mt-2">
          <button type="submit" className="mt-0 create-item-button">
            Submit
          </button>
          <button onClick={() => setEdit(false)} className="remove-btn">
            Close
          </button>
        </div>
      </form>
    </>
  );
}
