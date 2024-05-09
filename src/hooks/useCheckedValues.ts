import { changeStringInArray } from '@/helpers';
import { useState } from 'react';

const useCheckedValues = (defaultValues: string[]) => {
  const [checkedValues, setCheckedValues] = useState(defaultValues);

  const onCheckedClick = (id: string) => {
    setCheckedValues(changeStringInArray(checkedValues, id));
  };

  return {
    checkedValues,
    onCheckedClick,
  };
};
export { useCheckedValues };
