import * as migration_20250627_220641 from './20250627_220641';
import * as migration_20250712_142734 from './20250712_142734';

export const migrations = [
  {
    up: migration_20250627_220641.up,
    down: migration_20250627_220641.down,
    name: '20250627_220641',
  },
  {
    up: migration_20250712_142734.up,
    down: migration_20250712_142734.down,
    name: '20250712_142734'
  },
];
