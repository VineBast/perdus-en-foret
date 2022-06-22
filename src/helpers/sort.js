export const getSortByDate = (list, isAscending = true) => {
  const sortedList = [...list].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  return isAscending ? sortedList : sortedList.reverse();
}
