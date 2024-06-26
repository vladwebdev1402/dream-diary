import { ChangeEvent, ComponentProps, FC, useRef } from 'react';

import RemoveSVG from '@/assets/decoration/remove.svg?react';

import style from './style.module.scss';
import { Typography } from '../Typography';
import { Button } from '../Button';

type Props = {
  currentSrc?: string;
  onFileChange: (image: File) => void;
  onClear?: () => void;
} & ComponentProps<'input'>;

const ImageLoader: FC<Props> = ({
  currentSrc,
  onFileChange,
  onClear = () => {},
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onDeleteButtonClick = () => {
    onClear();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className={style.wrapper}>
      {currentSrc && (
        <div className={style.delete}>
          <Button
            size="small"
            colorTheme="delete"
            type="button"
            Icon={
              <RemoveSVG className={style.icon} onClick={onDeleteButtonClick} />
            }
          ></Button>
        </div>
      )}

      <span className={style.text}>
        <Typography>Добавить изображение</Typography>
      </span>
      <input
        ref={inputRef}
        type="file"
        className={style.input}
        {...props}
        accept="image/*"
        onChange={onInputChange}
      />
      {currentSrc && (
        <img
          className={style.image}
          src={currentSrc}
          alt="Текущее изображение"
        />
      )}
    </div>
  );
};

export { ImageLoader };
