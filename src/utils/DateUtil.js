export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const monthIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const beginningOfMonth = (date) => {
  date = date || new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export const beginningOfYear = () =>  { return new Date(new Date().getFullYear(), 0, 1) }

export const today = () => { return new Date() }