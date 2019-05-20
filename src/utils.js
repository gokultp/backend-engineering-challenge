export const isValidDate = (date) => !!date && !!Date.parse(date);

export const isValidNumber  =(number) => !!number && typeof(number) == 'number';