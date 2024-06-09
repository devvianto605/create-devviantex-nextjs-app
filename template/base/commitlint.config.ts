import { type UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'chore', 'docs', 'feature', 'fix', 'refactor', 'test', 'ci']],
  },
};

export default config;
