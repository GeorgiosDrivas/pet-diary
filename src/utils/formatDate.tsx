export function convertDateToInputFormat(date: string): string {
  if (!date || typeof date !== "string") {
    throw new Error("Invalid input: date must be a non-empty string.");
  }

  if (date.includes("/")) {
    // Handle DD/MM/YYYY format
    const parts = date.split("/");
    if (parts.length !== 3) {
      throw new Error(
        `Invalid date format: expected 'DD/MM/YYYY', received '${date}'.`
      );
    }

    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  } else if (date.includes("-")) {
    // Handle YYYY-MM-DD format (assume it's already correct)
    return date;
  }

  throw new Error(`Unsupported date format: '${date}'`);
}
