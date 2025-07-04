import React, { useState } from "react";
import { addPet } from "../../../firebase/addMethods";
import { PetFormData, petSchema } from "@/schemas/petSchema";
import newPet from "@/utils/newPet";
import { useForm } from "react-hook-form";

export default function NewPet({ userId }: { userId: string }) {
  const { register, handleSubmit, reset } = useForm<PetFormData>();
  const [errors, setErrors] = useState<
    Partial<Record<keyof PetFormData, string>>
  >({});

  const onSubmit = (data: PetFormData) => {
    const result = petSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof PetFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    if (userId) {
      addPet(userId, newPet(data));
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label htmlFor="species">Species</label>
          <input type="text" id="species" {...register("species")} required />
          {errors.species && (
            <p className="text-red-500 text-sm">{errors.species}</p>
          )}

          <label htmlFor="breed">Breed</label>
          <input type="text" id="breed" {...register("breed")} required />
          {errors.breed && (
            <p className="text-red-500 text-sm">{errors.breed}</p>
          )}

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
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
