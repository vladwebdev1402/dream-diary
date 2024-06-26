type LabelTheme = 'gray' | 'blue' | 'red' | 'gold' | 'green';

type LabelFormData = {
  name: string;
  theme: LabelTheme;
};

type Label = {
  id: string;
  name: string;
  theme: LabelTheme;
  userUid: string;
};

export type { LabelTheme, LabelFormData, Label };
