export const getVeganIcon = (rating: number): string => {
  let veganIconString = "/vegan-icon-default.svg";
  if (rating >= 6) {
    veganIconString = "/vegan-icon-green.svg";
  } else if (rating < 6 && rating > 3) {
    veganIconString = "/vegan-icon-yellow.svg";
  } else if (rating <= 3) {
    veganIconString = "/vegan-icon-red.svg";
  }
  return veganIconString;
};
