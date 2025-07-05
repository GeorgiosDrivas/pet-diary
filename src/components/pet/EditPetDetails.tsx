import React from "react";
import { Pet } from "@/types";
import { editPetDetails } from "../../../firebase/editMethods";
import { useForm } from "react-hook-form";
import { PetFormData, petSchema } from "@/schemas/petSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditPetDetails({
  setEdit,
  pet,
  userId,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  pet: Pet;
  userId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetFormData>({
    defaultValues: {
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
    },
    resolver: zodResolver(petSchema),
  });

  const onSubmit = async (data: PetFormData) => {
    await editPetDetails(userId, pet.id, {
      ...pet,
      ...data,
    });
    setEdit(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[30%]">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="species">Species</label>
          <input type="text" id="species" {...register("species")} />
          {errors.species && <p className="error">{errors.species.message}</p>}
        </div>
        <div>
          <label htmlFor="breed">Breed</label>
          <input type="text" id="breed" {...register("breed")} />
          {errors.breed && <p className="error">{errors.breed.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
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
