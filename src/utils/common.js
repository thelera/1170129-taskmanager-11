const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
  //return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  //return moment(date).format(`DD MMMM`);
  return `DD MMMM`;
};
