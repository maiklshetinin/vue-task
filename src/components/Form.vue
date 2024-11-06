<script setup>
import { h, reactive, ref } from "vue";
import {
  formatterTerm,
  formatterCard,
  validateCardNumber,
  inputNumberFormatter,
  formatCurrency,
} from "../utils/validators";
import { ElMessageBox } from "element-plus";

const props = defineProps({
  initiator: String,
  nameCollection: String,
});

const formRef = ref(null);

const formInit = {
  cardNumber: null, //Номер карты
  term: null, //Срок действия
  cvv: null, //CVV
  amount: null, //Сумма платежа в рублях
  name: null, //Ваше имя
  message: null, //Сообщение получателю
};

const form = reactive({ ...formInit });

const rules = reactive({
  //-- Номер карты
  cardNumber: [
    {
      required: true,
      message: "Введите номер карты",
    },
    {
      validator: (rule, value, callback) => {
        validateCardNumber(rule, value, callback);
      },
    },
  ],
  //--Срок действия
  term: {
    required: true,
    message: "Введите срок",
  },
  //-- CVV
  cvv: {
    required: true,
    message: "Введите CVV",
  },
  //-- Сумма перевода
  amount: {
    required: true,
    message: "Введите сумму",
  },
  //-- Ваше имя
  name: {
    required: true,
    message: "Введите имя",
  },
  //-- Сообщение получателю
  message: {
    required: false,
    message: "Обязательное поле",
  },
});

// const submitForm = (formEl) => {
//   if (!formEl) return;
//   formEl.validate((valid) => {
//     if (valid) {
//       ElMessageBox({
//         title: "Body post запроса",
//         message: h("p", null, [
//           h("span", null, "Message can be"),
//           h("i", { style: "color: teal" }, "VNode"),
//         ]),
//       });
//     } else {
//       return false;
//     }
//   });
// };

const submitForm = (formEl) => {
  if (!formEl) return;

  formEl.validate((valid) => {
    if (valid) {
      const body = {
        hash_sum:
          "14d85e69dc948e2f04e7494e4f5cdbc89ec2a19d30900c180516098ad365bedb",
        transaction: "3243243244324",
        description: "описание_платежа",
        api_key: "fcee9d8e-cf54-4e88-8911-517b6708367b",
        amount: form.amount,
        email: "электронная_почта",
        custom_data: {
          initiator: props.initiator,
          nameCollection: props.nameCollection,
        },
      };

      // Преобразуем данные запроса в JSON-строку с отступами для улучшенного отображения
      const formattedData = JSON.stringify(body, null, 2);

      ElMessageBox({
        title: "Данные запроса",
        message: h("p", null, [
          h("span", null, "Отправленные данные:"),
          h(
            "pre",
            {
              style:
                "background-color: #f6f8fa; padding: 10px; border-radius: 5px;",
            },
            h("code", { style: "color: #d63384;" }, formattedData)
          ),
        ]),
      });
    } else {
      return false;
    }
  });
};
</script>

<template>
  <el-form
    ref="formRef"
    class="form-wrapper"
    :model="form"
    :rules="rules"
    label-width="auto"
    label-position="top"
    :size="formSize"
  >
    <h3>{{ initiator }} собирает на {{ nameCollection }}</h3>
    <el-form-item
      label="Номер карты"
      prop="cardNumber"
      class="remove-required-star"
    >
      <el-input
        v-model="form.cardNumber"
        @input="formatterCard($event, form, 'cardNumber')"
        :maxlength="19"
      />
    </el-form-item>

    <div class="flex">
      <el-form-item
        label="Срок действия"
        prop="term"
        class="remove-required-star"
      >
        <el-input
          v-model="form.term"
          placeholder="ММ/ГГ"
          @input="formatterTerm($event, form, 'term')"
          :maxlength="5"
        />
      </el-form-item>

      <el-form-item label="CVV" prop="cvv" class="remove-required-star">
        <el-input
          v-model="form.cvv"
          :show-password="true"
          :maxlength="3"
          :formatter="inputNumberFormatter"
          :parser="inputNumberFormatter"
        />
      </el-form-item>
    </div>

    <el-form-item
      label="Сумма перевода"
      prop="amount"
      class="remove-required-star"
    >
      <el-input v-model="form.amount" :formatter="formatCurrency" />
    </el-form-item>

    <el-form-item label="Ваше имя" prop="name" class="remove-required-star">
      <el-input v-model="form.name" :maxlength="50" />
    </el-form-item>

    <el-form-item label="Сообщение получателю" prop="message">
      <el-input v-model="form.message" :maxlength="50" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)"
        >Перевести</el-button
      >
      <el-button>Вернуться</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.form-wrapper {
  max-width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;

  .el-form-item {
    .el-form-item__content {
      .el-input {
        height: 42px;
        .el-input__wrapper {
          border-radius: 10px;
          .el-input__inner {
          }
          .el-input__suffix {
            position: absolute;
            right: 10px;
          }
        }
      }
    }
  }

  h3 {
    color: #000;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.el-form-item--label-top {
  width: 100%;
}

.el-form-item__label-wrap {
  margin: 0;
}
</style>
