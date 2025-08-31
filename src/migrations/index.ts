import * as migration_20250831_121813 from './20250831_121813';

export const migrations = [
  {
    up: migration_20250831_121813.up,
    down: migration_20250831_121813.down,
    name: '20250831_121813'
  },
];
