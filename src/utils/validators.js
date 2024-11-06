export const formatterTerm = (value, form, field) => {
  if (value.length <= 4) {
    form[field] = value.replace(/\D/g, "");
  }
  if (value.includes("/") || value.length > 2) {
    form[field] = value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/");
  }
};

export const formatterCard = (value, form, field) => {
  // Удаляем все, кроме цифр
  const cleanedValue = value.replace(/\D/g, "");

  // Форматируем строку в виде 0000 0000 0000 0000
  const formattedValue = cleanedValue.replace(/(.{4})/g, "$1 ").trim();

  // Обновляем значение в форме
  form[field] = formattedValue;
};
