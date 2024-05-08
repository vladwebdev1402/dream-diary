import { FC } from 'react';

import { Label as LabelComponent } from '@/components/atoms';
import { Label } from '@/types';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';

type Props = {
  label: Label;
  onSelectLabel?(label: Label): void;
};

const LabelCard: FC<Props> = ({ label, onSelectLabel }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    StoreSelectors.labelsList.selectIsActionLoading,
  );

  const onDeleteClick = () => {
    dispatch(StoreActions.labelsList.deleteLabel(label.id));
  };

  return (
    <LabelComponent
      theme={label.theme}
      onDelete={onDeleteClick}
      onClick={() => onSelectLabel && onSelectLabel(label)}
      isLoading={isLoading}
    >
      {label.name}
    </LabelComponent>
  );
};

export { LabelCard };
