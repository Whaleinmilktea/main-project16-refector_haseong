export const sanitizeInput = (input : string) : boolean => {
  const scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const scriptTagExists = scriptTagRegex.test(input);
  return scriptTagExists;
}