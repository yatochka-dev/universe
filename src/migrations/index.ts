import * as migration_20250627_220641 from './20250627_220641';
import * as migration_20250712_142734 from './20250712_142734';
import * as migration_20250713_111503_add_inquiry_type from './20250713_111503_add_inquiry_type';
import * as migration_20250718_202909 from './20250718_202909';

export const migrations = [
  {
    up: migration_20250627_220641.up,
    down: migration_20250627_220641.down,
    name: '20250627_220641',
  },
  {
    up: migration_20250712_142734.up,
    down: migration_20250712_142734.down,
    name: '20250712_142734',
  },
  {
    up: migration_20250713_111503_add_inquiry_type.up,
    down: migration_20250713_111503_add_inquiry_type.down,
    name: '20250713_111503_add_inquiry_type',
  },
  {
    up: migration_20250718_202909.up,
    down: migration_20250718_202909.down,
    name: '20250718_202909'
  },
];
