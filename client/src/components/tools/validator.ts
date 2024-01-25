export const passwordTest = (data: string) => {
  return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/g.test(data);
};
