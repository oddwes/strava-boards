export const beginningOfMonth = (date) => {
  date = date || new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}