import React from "react";
import CloseSvg from "@/assets/closeSvg";
import { Pet } from "@/types";

export default function EditPetDetails({
  setEdit,
  pet,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  pet: Pet;
}) {
  return (
    <>
      <div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={pet.name} />
          </div>
          <div>
            <label htmlFor="species">Species</label>
            <input type="text" id="species" value={pet.species} />
          </div>
          <div>
            <label htmlFor="breed">Breed</label>
            <input type="text" id="breed" value={pet.breed} />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input type="text" id="age" value={pet.age} />
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
