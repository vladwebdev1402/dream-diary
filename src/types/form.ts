type FormProps<T> = {
  defaultValue?: T;
  formType: 'create' | 'edit';
  isLoading?: boolean;
  onCancel(): void;
  onSuccessSubmit?(data: T, imageFile?: File | null): void;
};

export type { FormProps };
