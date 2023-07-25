export const calculateDaysInWeek = (earliestDate: Date): string[] => {
  const daysInWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const startDayIndex = earliestDate.getDay() - 1;
  const daysAfterStart = daysInWeek.slice(startDayIndex);
  const daysBeforeStart = daysInWeek.slice(0, startDayIndex);
  return [...daysAfterStart, ...daysBeforeStart];
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ru-Ru", options);
};
