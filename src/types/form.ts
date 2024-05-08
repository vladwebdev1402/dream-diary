type FormProps<T> = {
  defaultValue?: T;
  formType: 'create' | 'edit';
  isLoading?: boolean;
  onCancel(): void;
  onSuccessSubmit?(data: T): void;
};

export type { FormProps };
