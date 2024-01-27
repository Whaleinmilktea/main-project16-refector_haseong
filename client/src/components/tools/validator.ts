export const passwordTest = (data: string) => {
  if (data === "") {
    return null;
  } else {
    return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/g.test(data);
  }
};
