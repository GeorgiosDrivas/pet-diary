export default function NewPet() {
  return (
    <div className="grid grid-rows-12 gap-4 h-full py-3">
      <div className="row-span-6">
        <h1>Add a new pet</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="species">Species</label>
          <input type="text" id="species" name="species" />
          <label htmlFor="breed">Breed</label>
          <input type="text" id="breed" name="breed" />
          <label htmlFor="age">Age</label>
          <input type="text" id="age" name="age" />
          <button type="submit">Add Pet</button>
        </form>
      </div>
    </div>
  );
}
