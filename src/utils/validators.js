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

export const inputNumberFormatter = (value) => value.replace(/\D/g, "");

export const formatCurrency = (value) => {
  // Удаляем все нецифровые символы
  const cleanedValue = value.replace(/\D/g, "");

  // Если очищенное значение пустое, возвращаем пустую строку
  if (!cleanedValue) {
    return "";
  }

  // Добавляем знак рубля к числовому значению
  return `${cleanedValue} ₽`;
};

export const generateSignature = async (
  apiKey,
  transaction,
  amount,
  secretKey
) => {
  const amountInCents = Math.floor(amount * 100);
  const dataToSign = `${apiKey}${transaction}${amountInCents}${secretKey}`;

  // Кодируем строку в Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToSign);

  // Генерируем хеш SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Преобразуем хеш в шестнадцатеричную строку
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("");

  return hashHex;
};
