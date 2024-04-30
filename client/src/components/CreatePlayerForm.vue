<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { characteristics } from '@/data/characteristics';
import { skills } from '@/data/skills';
import { usePlayersStore } from '@/store/players';
import { Characteristic } from '@/types/characteristics';
import { CreatePlayerData } from '@/types/players';
import { getLabel } from '@/utils/characteristics';
import { storage } from '@/utils/storage';
import { requiredRule } from '@/utils/validation';

const weaponValues = [4, 6, 8, 10, 12];

const defaultFormValues: CreatePlayerData = {
  name: '',
  background: '',
  race: '',
  class: '',
  weapon: {
    name: '',
    value: weaponValues[0],
  },
  armor: {
    name: '',
    value: 1,
  },
  characteristics: {
    strength: 1,
    agility: 1,
    stamina: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },
  savingThrows: [],
  skills: [],
};

const playersStore = usePlayersStore();

const formRef = ref<FormInstance | null>(null);

const form = reactive<CreatePlayerData>(storage.get('player') || defaultFormValues);

const rules: FormRules<CreatePlayerData> = {
  name: [requiredRule('Введи имя!')],
  race: [requiredRule('Введи расу!')],
  class: [requiredRule('Введи класс!')],
  'weapon.name': [requiredRule('Введи название оружия!')],
  'weapon.value': [requiredRule('Введи урон!')],
  'armor.name': [requiredRule('Введи название доспехов!')],
  'armor.value': [requiredRule('Введи защиту!')],
  'characteristics.strength': [requiredRule('Введи силу')],
  'characteristics.agility': [requiredRule('Введи ловкость')],
  'characteristics.stamina': [requiredRule('Введи выносливость')],
  'characteristics.intelligence': [requiredRule('Введи интеллект')],
  'characteristics.wisdom': [requiredRule('Введи мудрость')],
  'characteristics.charisma': [requiredRule('Введи харизму')],
};

const onSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid) => {
    if (valid) {
      playersStore.create(form);
    }
  });
};

watch(form, (form) => {
  storage.set('player', form);
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
        placeholder="Мишгронак (Миша)"
      />
    </el-form-item>

    <el-form-item
      label="Предыстория"
      prop="background"
    >
      <el-input
        v-model="form.background"
        :rows="3"
        type="textarea"
        placeholder="Все, что душе угодно"
      />
    </el-form-item>

    <el-row :gutter="16">
      <el-col :span="12">
        <el-form-item
          label="Раса"
          prop="race"
        >
          <el-input
            v-model="form.race"
            placeholder="Орк"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="Класс"
          prop="class"
        >
          <el-input
            v-model="form.class"
            placeholder="Воин"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-form-item
          label="Оружие"
          prop="weapon.name"
        >
          <el-input
            v-model="form.weapon.name"
            placeholder="Боевой топор"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item
          label="Урон"
          prop="weapon.value"
        >
          <el-select v-model="form.weapon.value">
            <el-option
              v-for="value in weaponValues"
              :key="value"
              :label="value"
              :value="value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-form-item
          label="Доспехи"
          prop="armor.name"
        >
          <el-input
            v-model="form.armor.name"
            placeholder="Кожаный"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item
          label="Защита"
          prop="armor.value"
        >
          <el-input-number
            v-model="form.armor.value"
            :min="1"
            :max="30"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col
        v-for="key in Object.keys(characteristics) as Characteristic[]"
        :key="key"
        :span="8"
      >
        <el-form-item
          :label="getLabel(key, form.characteristics[key])"
          :prop="`characteristics.${key}`"
        >
          <el-input-number
            v-model="form.characteristics[key]"
            :min="1"
            :max="30"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row
      :gutter="16"
      :class="$style.offset"
    >
      <el-col :span="12">
        <el-form-item
          label="Спасброски"
          prop="savingThrows"
        >
          <el-checkbox-group v-model="form.savingThrows">
            <el-checkbox
              v-for="characteristic in Object.values(characteristics)"
              :key="characteristic"
              :label="characteristic"
              class="full-width"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="Навыки"
          prop="skills"
        >
          <el-checkbox-group v-model="form.skills">
            <el-checkbox
              v-for="skill in skills"
              :key="skill.name"
              :label="skill.name"
              class="full-width"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        class="full-width"
      >
        Отправиться в приключение
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style module lang="scss">
.offset {
  margin-bottom: 18px;
}
</style>
