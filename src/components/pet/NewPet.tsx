import React from "react";
import { addPet } from "../../../firebase/addMethods";
import { PetFormData, petSchema } from "@/schemas/petSchema";
import newPet from "@/utils/newPet";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";

export default function NewPet({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
  });

  const onSubmit = (data: PetFormData) => {
    if (userId) {
      const petData = newPet(data);
      addPet(userId, { id: uuidv4(), ...petData });
      reset();
    }
  };

  return (
    <div className="h-full mt-8 bg-white rounded-[40px]">
      <h1 className="new-pet-title font-bold">Add your pet&apos;s details</h1>
      <p>Don&apos;t worry. You can always change them.</p>
      <div className="mt-5 w-[25%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} required />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <label htmlFor="species">Species</label>
          <input type="text" id="species" {...register("species")} required />
          {errors.species && (
            <p className="text-red-500 text-sm">{errors.species.message}</p>
          )}

          <label htmlFor="breed">Breed</label>
          <input type="text" id="breed" {...register("breed")} required />
          {errors.breed && (
            <p className="text-red-500 text-sm">{errors.breed.message}</p>
          )}

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
            required
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}

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
