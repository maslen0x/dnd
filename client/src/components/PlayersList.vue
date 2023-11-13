<script setup lang="ts">
import { ref } from 'vue';
import { Edit, Pointer } from '@element-plus/icons-vue';
import { characteristics } from '@/data/characteristics';
import { skills } from '@/data/skills';
import { usePlayersStore } from '@/store/players';
import { useSocketStore } from '@/store/socket';
import { Characteristic } from '@/types/characteristics';
import { Skill } from '@/types/skill';
import { getModifier } from '@/utils/characteristics';
import EditCharacteristicsForm from './EditCharacteristicsForm.vue';
import EditHealthForm from './EditHealthForm.vue';

const playersStore = usePlayersStore();
const socketStore = useSocketStore();

const editHealthDialogVisible = ref(false);
const editCharacteristicsDialogVisible = ref(false);

const getLabel = (key: Characteristic, value: number) => {
  return `${characteristics[key]}: ${value} (${getModifier(value)})`;
};

const getSavingThrows = (key: Characteristic, value: number, savingThrows: string[]) => {
  const selected = savingThrows.includes(characteristics[key]);
  const modifier = getModifier(value, selected ? 2 : 0);
  return `${characteristics[key]}: ${modifier}`;
};

const getSkills = (skill: Skill, value: number, skills: string[]) => {
  const selected = skills.includes(skill.name);
  const modifier = getModifier(value, selected ? 2 : 0);
  return `${skill.name}: ${modifier}`;
};
</script>

<template>
  <h2>Список игроков</h2>

  <template
    v-for="player in playersStore.players"
    :key="player.id"
  >
    <el-divider />

    <div>
      <div>
        Имя: {{ player.name }} <template v-if="player.id === socketStore.id">(Ты)</template>
      </div>

      <div v-if="player.background">
        <el-tooltip
          :content="player.background.replaceAll(/\n/g, '<br />')"
          raw-content
          placement="top"
        >
          <el-space>
            Предыстория

            <el-icon>
              <Pointer />
            </el-icon>
          </el-space>
        </el-tooltip>
      </div>

      <el-text
        v-else
        tag="del"
      >
        Предыстория
      </el-text>

      <el-space class="full-width">
        Здоровье: {{ player.health }}

        <el-tooltip
          v-if="player.id === socketStore.id"
          content="Редактировать"
          placement="top"
        >
          <el-icon
            class="cursor-pointer"
            @click="editHealthDialogVisible = true"
          >
            <Edit />
          </el-icon>
        </el-tooltip>
      </el-space>

      <div>Инициатива: {{ getModifier(player.characteristics.agility) }}</div>

      <div>Раса: {{ player.race }}</div>

      <div>Класс: {{ player.class }}</div>

      <div>Оружие: {{ player.weapon.name }} ({{ player.weapon.value }})</div>

      <div>Доспехи: {{ player.armor.name }} ({{ player.armor.value }})</div>

      <el-space>
        <el-tooltip placement="top">
          <template #content>
            <div
              v-for="[key, value] in Object.entries(player.characteristics)"
              :key="key"
            >
              {{ getLabel(key as Characteristic, value) }}
            </div>
          </template>

          <el-space>
            Характеристики

            <el-icon>
              <Pointer />
            </el-icon>
          </el-space>
        </el-tooltip>

        <el-tooltip
          v-if="player.id === socketStore.id"
          content="Редактировать"
          placement="top"
        >
          <el-icon
            class="cursor-pointer"
            @click="editCharacteristicsDialogVisible = true"
          >
            <Edit />
          </el-icon>
        </el-tooltip>
      </el-space>

      <div>
        <el-tooltip placement="top">
          <template #content>
            <div
              v-for="[key, value] in Object.entries(player.characteristics)"
              :key="key"
            >
              {{ getSavingThrows(key as Characteristic, value, player.savingThrows) }}
            </div>
          </template>

          <el-space>
            Спасброски

            <el-icon>
              <Pointer />
            </el-icon>
          </el-space>
        </el-tooltip>
      </div>

      <div>
        <el-tooltip placement="top">
          <template #content>
            <div
              v-for="skill in skills"
              :key="skill.name"
            >
              {{ getSkills(skill, player.characteristics[skill.characteristic], player.skills) }}
            </div>
          </template>

          <el-space>
            Навыки

            <el-icon>
              <Pointer />
            </el-icon>
          </el-space>
        </el-tooltip>
      </div>
    </div>
  </template>

  <el-dialog
    v-model="editHealthDialogVisible"
    title="Редактирование здоровья"
    :class="$style.dialog"
    :width="300"
  >
    <EditHealthForm @close="editHealthDialogVisible = false" />
  </el-dialog>

  <el-dialog
    v-model="editCharacteristicsDialogVisible"
    title="Редактирование характеристик"
    :class="$style.dialog"
    :width="500"
  >
    <EditCharacteristicsForm @close="editCharacteristicsDialogVisible = false" />
  </el-dialog>
</template>

<style module lang="scss">
.dialog {
  :global(.el-dialog__body) {
    padding: 20px 20px 2px;
  }
}
</style>
