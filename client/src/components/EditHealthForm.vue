<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { usePlayersStore } from '@/store/players';
import { useSocketStore } from '@/store/socket';
import { requiredRule } from '@/utils/validation';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const socketStore = useSocketStore();
const playersStore = usePlayersStore();

const player = computed(() => playersStore.findById(socketStore.id));

const formRef = ref<FormInstance | null>(null);

const form = reactive({
  health: player.value.health,
});

const rules: FormRules<typeof form> = {
  health: [requiredRule('Введи здоровье!')],
};

const onSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid) => {
    if (valid) {
      if (player.value.health !== form.health) {
        playersStore.update(form, 'Здоровье обновлено');
      }
      emit('close');
    }
  });
};
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
      label="Здоровье"
      prop="health"
    >
      <el-input-number
        v-model="form.health"
        class="full-width"
        :min="1"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        class="full-width"
      >
        Редактировать
      </el-button>
    </el-form-item>
  </el-form>
</template>
