/**
 * check if a variable is a valid url
 */
export const isUrl = (test: unknown): boolean => {
  if (typeof test !== "string" || test === "") return false;

  // url Math
  const result = /^(?:\w+:)?\/\/(\S+)$/u.exec(test);

  if (!result) return false;

  const address = result[1];

  if (!address) return false;

  return (
    // address with localhost
    /^localhost[:?\d]*(?:[^:?\d]\S*)?$/u.test(address) ||
    // address without localhost
    /^[^\s.]+\.\S{2,}$/u.test(address)
  );
};

/**
 * Whether a variable is a valid absolute url
 */
export const isAbsoluteUrl = (test: unknown): boolean =>
  typeof test === "string" && test.startsWith("/");
