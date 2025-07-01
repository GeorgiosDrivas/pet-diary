import { handleNewItem } from "../newItem";

const mockNewItem = jest.fn();

describe("handleNewItem tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setter with userId and pet details", () => {
    const pet = {
      name: "Buddy",
      species: "Dog",
      breed: "Poodle",
      age: "3",
      appointments: [],
      Notes: [],
    };

    const newItem = {
      type: "Note",
    };

    handleNewItem("user123", pet, mockNewItem, newItem);

    expect(mockNewItem).toHaveBeenCalledWith("user123", "Buddy", newItem);
  });
});
