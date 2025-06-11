import { handleLogout } from "../handleLogout";
import { signOut } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
}));

jest.mock("../../../firebase/client", () => ({
  auth: "mockAuth",
}));

describe("handleLogout tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call signOut with auth", async () => {
    (signOut as jest.Mock).mockResolvedValueOnce(undefined);

    await handleLogout();

    expect(signOut).toHaveBeenCalledWith("mockAuth");
  });

  it("Should through error if signOut fails", async () => {
    const error = new Error("Sign out failed");
    (signOut as jest.Mock).mockRejectedValueOnce(error);
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await handleLogout();

    expect(console.error).toHaveBeenCalledWith("Error signing out:", error);
    consoleSpy.mockRestore();
  });
});
