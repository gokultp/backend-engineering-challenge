const dateFormat = require('dateformat')
export const isValidDate = (date) => !!date && !!Date.parse(date);

export const isValidNumber  =(number) => !!number && typeof(number) == 'number';

export const formatDate = (dateString) =>  dateFormat(dateString, "yyyy-mm-dd HH:MM") + ":00";
