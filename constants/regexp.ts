export const password =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

export const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const phone = /^\d{3}-\d{3,4}-\d{4}$/;
