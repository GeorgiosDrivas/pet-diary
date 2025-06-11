import { stateChange } from "../stateChange";

describe("stateChange tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update state", () => {
    const mockEvent = {
      target: {
        value: "new value",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const mockSetter = jest.fn();
    const mockObj = { key: "value" };
    const valueKey = "key";

    stateChange(mockEvent, valueKey, mockSetter, mockObj);

    expect(mockSetter).toHaveBeenCalledWith({
      ...mockObj,
      [valueKey]: mockEvent.target.value,
    });
  });
});
