export const getItem = (data, index) => ({
  ...data[index],
});

export const getItemCount = (data) => data.length;
