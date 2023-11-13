<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { InternalRuleItem } from 'async-validator';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { characteristics } from '@/data/characteristics';
import { skills } from '@/data/skills';
import { usePlayersStore } from '@/store/players';
import { useSocketStore } from '@/store/socket';
import { Characteristic } from '@/types/characteristics';
import { Equipment } from '@/types/equipment';
import { getModifier } from '@/utils/characteristics';
import { storage } from '@/utils/storage';

interface FormValues {
  name: string;
  background: string;
  race: string;
  class: string;
  weapon: Equipment;
  armor: Equipment;
  characteristics: Record<Characteristic, number>;
  savingThrows: string[];
  skills: string[];
}

const characteristicsMax = 72;

const weaponValues = [4, 6, 8, 10, 12];

const defaultFormValues: FormValues = {
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

const socketStore = useSocketStore();
const playersStore = usePlayersStore();

const formRef = ref<FormInstance | null>(null);
const error = ref<string | null>(null);

const form = reactive<FormValues>(storage.get('player') || defaultFormValues);

const characteristicsSum = computed(() => {
  return Object.values(form.characteristics).reduce((acc, item) => acc + item, 0);
});

const requiredRule = (message: string) => ({
  required: true,
  message,
  trigger: 'blur',
});

const characteristicsRule = {
  validator: (_rule: InternalRuleItem, _value: number, callback: (error?: Error) => void) => {
    error.value = null;

    if (characteristicsSum.value > characteristicsMax) {
      callback(new Error());
      error.value = `Сумма характеристик не должна быть больше ${characteristicsMax}!`;
      return;
    }

    callback();
  },
  trigger: 'change',
};

const rules: FormRules<typeof form> = {
  name: [requiredRule('Введи имя!')],
  race: [requiredRule('Введи расу!')],
  class: [requiredRule('Введи класс!')],
  'weapon.name': [requiredRule('Введи название оружия!')],
  'weapon.value': [requiredRule('Введи урон!')],
  'armor.name': [requiredRule('Введи название доспехов!')],
  'armor.value': [requiredRule('Введи защиту!')],
  'characteristics.strength': [requiredRule('Введи силу'), characteristicsRule],
  'characteristics.agility': [requiredRule('Введи ловкость'), characteristicsRule],
  'characteristics.stamina': [requiredRule('Введи выносливость'), characteristicsRule],
  'characteristics.intelligence': [requiredRule('Введи интеллект'), characteristicsRule],
  'characteristics.wisdom': [requiredRule('Введи мудрость'), characteristicsRule],
  'characteristics.charisma': [requiredRule('Введи харизму'), characteristicsRule],
};

const onSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid) => {
    if (valid) {
      socketStore.emit({
        event: 'createPlayer',
        data: form,
        callback: (player) => {
          ElMessage({
            message: 'Добро пожаловать!',
            type: 'success',
          });
          console.log('createPlayer', player);
          playersStore.current = player;
        },
      });
    }
  });
};

const getLabel = (key: Characteristic) => {
  const value = form.characteristics[key];
  return `${characteristics[key]} (${getModifier(value)})`;
};

watch(form, (form) => {
  storage.set('player', form);
});
</script>

<template>
  <el-container :class="$style.container">
    <el-card :class="$style.card">
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
              :label="getLabel(key)"
              :prop="`characteristics.${key}`"
              :validate-status="error ? 'error' : ''"
            >
              <el-input-number
                v-model="form.characteristics[key]"
                :min="1"
                :max="30"
              />
            </el-form-item>
          </el-col>

          <el-col
            v-if="error"
            :class="$style.offset"
            :span="24"
          >
            <el-alert
              :title="error"
              :description="`Сейчас: ${characteristicsSum}`"
              type="error"
              :closable="false"
            />
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
            <!-- <div :class="$style.label">Навыки</div>

            <el-space
              direction="vertical"
              alignment="start"
              :size="0"
            >
              <template
                v-for="[key, value] in Object.entries(skills)"
                :key="key"
              >
                <el-checkbox
                  v-for="skill in value"
                  :key="skill"
                  :label="`${skill} (${characteristics[key as Characteristic].slice(0, 3)})`"
                  class="full-width"
                />
              </template>
            </el-space> -->
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
    </el-card>
  </el-container>
</template>

<style module lang="scss">
.container {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}

.card {
  width: 100%;
  max-width: 500px;

  :global(.el-card__body) {
    padding-bottom: 2px;
  }
}

.offset {
  margin-bottom: 18px;
}
</style>
