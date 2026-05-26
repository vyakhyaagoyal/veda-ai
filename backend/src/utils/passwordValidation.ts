export const validatePassword =
  (password: string) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    return regex.test(
      password
    );
  };