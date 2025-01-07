import React, { useState } from "react";
import { addPet } from "../../firebase/addMethods";
import { Pet } from "@/types";

export default function NewPet() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const newPet: Pet = {
    name: name,
    species: species,
    breed: breed,
    age: age,
    appointments: [
      {
        id: 1,
        title: "Example",
        doctor: "Dr. Example",
        date: "10/10/2024",
      },
    ],
    medications: [
      {
        id: 1,
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
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <label htmlFor="species">Species</label>
          <input
            type="text"
            id="species"
            name="species"
            value={species}
            onChange={(e) => setSpecies(e.currentTarget.value)}
          />
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.currentTarget.value)}
          />
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.currentTarget.value)}
          />
          <button type="submit" className="mt-3">
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
}
