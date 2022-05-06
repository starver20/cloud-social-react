const getInitials = (firstName, lastName) => {
  let initials = firstName.slice(0, 1) + lastName.slice(0, 1);
  return initials;
};

export default getInitials;
