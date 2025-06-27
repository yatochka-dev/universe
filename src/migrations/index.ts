import * as migration_20250627_220641 from './20250627_220641';

export const migrations = [
  {
    up: migration_20250627_220641.up,
    down: migration_20250627_220641.down,
    name: '20250627_220641'
  },
];
