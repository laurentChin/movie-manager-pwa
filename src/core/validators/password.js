const validatePasswordConfirmation = (value, { password }) => {
  return value && value !== password ? "Password fields dont match" : undefined;
};

export { validatePasswordConfirmation };
