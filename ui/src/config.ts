export interface HreaModelerConfig {
  zomeName: string;
  avatarMode: 'identicon' | 'avatar';
  additionalFields: string[];
  minNicknameLength: number;
}

export const defaultConfig: HreaModelerConfig = {
  zomeName: 'hreaModeler',
  avatarMode: 'avatar',
  additionalFields: [],
  minNicknameLength: 3,
};
