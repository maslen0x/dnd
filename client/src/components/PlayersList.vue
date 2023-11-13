<script setup lang="ts">
import { Pointer } from '@element-plus/icons-vue';
import { characteristics } from '@/data/characteristics';
import { skills } from '@/data/skills';
import { usePlayersStore } from '@/store/players';
import { useSocketStore } from '@/store/socket';
import { Characteristic } from '@/types/characteristics';
import { Skill } from '@/types/skill';
import { getModifier } from '@/utils/characteristics';

const playersStore = usePlayersStore();
const socketStore = useSocketStore();

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

      <el-space v-if="player.background">
        <el-tooltip
          :content="player.background.replaceAll(/\n/g, '<br />')"
          raw-content
          placement="top"
        >
          Предыстория
        </el-tooltip>

        <el-icon>
          <Pointer />
        </el-icon>
      </el-space>

      <el-text
        v-else
        tag="del"
      >
        Предыстория
      </el-text>

      <div>Здоровье: {{ player.health }}</div>

      <div>Инициатива: {{ getModifier(player.characteristics.agility) }}</div>

      <div>Раса: {{ player.race }}</div>

      <div>Класс: {{ player.class }}</div>

      <div>Оружие: {{ player.weapon.name }} ({{ player.weapon.value }})</div>

      <div>Доспехи: {{ player.armor.name }} ({{ player.armor.value }})</div>

      <el-space class="full-width">
        <el-tooltip placement="top">
          <template #content>
            <div
              v-for="[key, value] in Object.entries(player.characteristics)"
              :key="key"
            >
              {{ getLabel(key as Characteristic, value) }}
            </div>
          </template>

          Характеристики
        </el-tooltip>

        <el-icon>
          <Pointer />
        </el-icon>
      </el-space>

      <el-space class="full-width">
        <el-tooltip placement="top">
          <template #content>
            <div
              v-for="[key, value] in Object.entries(player.characteristics)"
              :key="key"
            >
              {{ getSavingThrows(key as Characteristic, value, player.savingThrows) }}
            </div>
          </template>

          Спасброски
        </el-tooltip>

        <el-icon>
          <Pointer />
        </el-icon>
      </el-space>

      <el-space class="full-width">
        <el-tooltip placement="top">
          <template #content>
            <div
              v-for="skill in skills"
              :key="skill.name"
            >
              {{ getSkills(skill, player.characteristics[skill.characteristic], player.skills) }}
            </div>
          </template>

          Навыки
        </el-tooltip>

        <el-icon>
          <Pointer />
        </el-icon>
      </el-space>
    </div>
  </template>
</template>
