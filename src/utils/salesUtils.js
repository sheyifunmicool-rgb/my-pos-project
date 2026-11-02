export const getDateKey = (date) => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Get the beginning of the week (Monday)
export const getWeekStart = (date) => {
  const d = new Date(date);

  const day = d.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + difference);

  return getDateKey(d);
};

// Format currency
export const formatMoney = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};