export const asterixValidator = (value: unknown) => {
  const val = value as string;
  let counter = 0;
  for (const char of val) {
    if (char === "*") {
      counter++;
    }
  }
  if (counter % 2 !== 0) {
    return "Number of * should be even";
  }
  return true;
};
