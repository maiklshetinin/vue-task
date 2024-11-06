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

export const validateCardNumber = (rule, cardNumber, callback) => {
  if (!cardNumber) return;
  // Удаляем пробелы и нецифровые символы
  const cleanedNumber = cardNumber.replace(/\D/g, "");

  // Переворачиваем номер карты
  const reversedNumber = cleanedNumber.split("").reverse().join("");

  let sum = 0;

  // Проходим по каждой цифре
  for (let i = 0; i < reversedNumber.length; i++) {
    let digit = parseInt(reversedNumber[i], 10);

    // Удваиваем каждую вторую цифру
    if (i % 2 === 1) {
      digit *= 2;
      // Если удвоенная цифра больше 9, вычитаем 9
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  // Проверяем, делится ли сумма на 10
  const isValid = sum % 10 === 0;

  if (isValid && reversedNumber.length === 16) {
    callback();
  } else {
    callback(new Error("Номер карты не соответствует ЛУН алгоритму"));
  }
};
