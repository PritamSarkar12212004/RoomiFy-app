const phoneValidation = (phone, setphone) => {
  // Check if phone contains any non-numeric characters or dots
  const regex = /^[0-9]*$/; // Allows numeric characters or an empty string

  if (typeof phone !== "string") {
    return;
  }

  if (!regex.test(phone)) {
    return;
  }

  if (phone.length > 10) {
    return;
  }

  // Allow empty string to clear the input
  setphone(phone); // Update phone state if valid
};

export default phoneValidation;
