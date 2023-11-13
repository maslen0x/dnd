<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { characteristics } from '@/data/characteristics';
import { usePlayersStore } from '@/store/players';
import { useSocketStore } from '@/store/socket';
import { Characteristic } from '@/types/characteristics';
import { Player } from '@/types/players';
import { getLabel } from '@/utils/characteristics';
import { getDelta } from '@/utils/objects';
import { requiredRule } from '@/utils/validation';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const socketStore = useSocketStore();
const playersStore = usePlayersStore();

const player = computed(() => playersStore.findById(socketStore.id));

const formRef = ref<FormInstance | null>(null);

const form = reactive({ ...player.value.characteristics });

const rules: FormRules<typeof form> = {
  strength: [requiredRule('Введи силу')],
  agility: [requiredRule('Введи ловкость')],
  stamina: [requiredRule('Введи выносливость')],
  intelligence: [requiredRule('Введи интеллект')],
  wisdom: [requiredRule('Введи мудрость')],
  charisma: [requiredRule('Введи харизму')],
};

const onSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid) => {
    if (valid) {
      const delta = getDelta(form, player.value.characteristics) as Player['characteristics'];
      if (Object.keys(delta).length) {
        playersStore.update({ characteristics: delta }, 'Характеристики обновлены!');
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
    <el-row :gutter="16">
      <el-col
        v-for="key in Object.keys(characteristics) as Characteristic[]"
        :key="key"
        :span="8"
      >
        <el-form-item
          :label="getLabel(key, form[key])"
          :prop="key"
        >
          <el-input-number
            v-model="form[key]"
            :min="1"
            :max="30"
          />
        </el-form-item>
      </el-col>
    </el-row>

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
