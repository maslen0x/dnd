<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { storage } from '@/utils/storage';
import { requiredRule } from '@/utils/validation';

interface FormValues {
  name: string;
}

const defaultFormValues: FormValues = {
  name: '',
};

const formRef = ref<FormInstance | null>(null);

const form = reactive<FormValues>(storage.get('master') || defaultFormValues);

const rules: FormRules<typeof form> = {
  name: [requiredRule('Введи имя!')],
};

const onSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid) => {
    if (valid) {
      console.log(form);
    }
  });
};

watch(form, (form) => {
  storage.set('master', form);
});
</script>

<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    @submit.prevent="onSubmit"
  >
    <el-form-item
      label="Имя"
      prop="name"
    >
      <el-input
        v-model="form.name"
        placeholder="Миша"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        class="full-width"
      >
        Начать приключение
      </el-button>
    </el-form-item>
  </el-form>
</template>
