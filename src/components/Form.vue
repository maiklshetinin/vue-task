<script setup>
import { reactive, ref } from "vue";
import {
  formatterTerm,
  formatterCard,
  validateCardNumber,
} from "../utils/validators";
import { ElNotification } from "element-plus";

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

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
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
        <el-input v-model="form.cvv" :show-password="true" :maxlength="4" />
      </el-form-item>
    </div>

    <el-form-item
      label="Сумма перевода"
      prop="amount"
      class="remove-required-star"
    >
      <el-input v-model="form.amount" />
    </el-form-item>

    <el-form-item label="Ваше имя" prop="name" class="remove-required-star">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="Сообщение получателю" prop="message">
      <el-input v-model="form.message" />
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
        height: 52px;
        .el-input__wrapper {
          border-radius: 10px;
          .el-input__inner {
          }
        }
      }
    }
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
