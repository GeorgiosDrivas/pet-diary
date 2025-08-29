import React, { useEffect } from "react";
import { editPetDetails } from "../../../firebase/editMethods";
import { useForm } from "react-hook-form";
import { PetFormData, petSchema } from "@/schemas/petSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/context/appContext";

export default function EditPetDetails({
  setEdit,
  userId,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}) {
  const { refreshUserData, user, currentPet } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    setFocus,
  } = useForm<PetFormData>({
    defaultValues: {
      name: currentPet?.name,
      species: currentPet?.species,
      breed: currentPet?.breed,
      weight: currentPet?.weight,
      age: currentPet?.age,
    },
    resolver: zodResolver(petSchema),
  });

  useEffect(() => {
    setFocus("name");
  }, []);

  const onSubmit = async (data: PetFormData) => {
    if (!currentPet) return;
    await editPetDetails(userId, currentPet.id, {
      ...currentPet,
      ...data,
    });
    await refreshUserData(user);
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
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            {...register("weight", { valueAsNumber: true })}
          />
          {errors.weight && <p className="error">{errors.weight.message}</p>}
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
          <button disabled={isSubmitting} type="submit" className="mt-0 create-item-button">
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
