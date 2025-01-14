import React, { useEffect, useState } from "react";
import CloseSvg from "@/assets/closeSvg";
import { Pet } from "@/types";
import { editPetDetails } from "../../firebase/editMethods";

export default function EditPetDetails({
  setEdit,
  pet,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  pet: Pet;
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

  return (
    <>
      <div>
        <form onSubmit={() => editPetDetails(1, pet.name, updatedPet)}>
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
              type="text"
              id="age"
              value={updatedPet.age || ""}
              onChange={(e) =>
                setUpdatedPet((prv) => ({ ...prv, age: e.target.value }))
              }
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button className="hide-form-btn" onClick={() => setEdit(false)}>
          <CloseSvg />
        </button>
      </div>
    </>
  );
}
