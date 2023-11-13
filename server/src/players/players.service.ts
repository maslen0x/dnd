import { Injectable } from '@nestjs/common';
import { getModifier } from '@/utils/characteristics';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  private players: Record<string, Player> = {
    vasya: {
      id: 'vasya',
      name: 'Вася',
      background: 'Закончил школу магии и пошел по дороге приключений',
      health: 10,
      class: 'Маг',
      race: 'Эльф',
      armor: {
        name: 'Стеганый',
        value: 11,
      },
      weapon: {
        name: 'Кинжал',
        value: 4,
      },
      characteristics: {
        agility: 15,
        charisma: 14,
        intelligence: 13,
        stamina: 12,
        strength: 10,
        wisdom: 8,
      },
      savingThrows: ['Интеллект', 'Мудрость'],
      skills: ['Анализ', 'Магия'],
    },
  };

  create(id: string, dto: CreatePlayerDto) {
    this.players[id] = {
      ...dto,
      id,
      health: 10 + getModifier(dto.characteristics.stamina),
    };
    return this.players[id];
  }

  findAll() {
    return Object.values(this.players);
  }

  findOne(id: string) {
    return this.players[id];
  }

  update(id: string, dto: UpdatePlayerDto) {
    this.players[id] = {
      ...this.players[id],
      ...dto,
      characteristics: {
        ...this.players[id].characteristics,
        ...dto.characteristics,
      },
    };
    return this.players[id];
  }

  remove(id: string) {
    delete this.players[id];
  }
}
