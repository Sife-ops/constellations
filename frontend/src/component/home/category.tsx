import React from 'react';
import { Button, ButtonProps, ThemingProps } from '@chakra-ui/react';
import { CategoryAddUpdateForm } from './category-add-update-form';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';

interface Props {
  category: SelectableCategory | null;
  toggleCategorySelected: (category: SelectableCategory | null) => void;
  //
  categoryEdit?: {
    categoryEditMode: boolean; // todo: rename to 'editMode?'
    setCategoryForm: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    userReexec: (opts?: Partial<OperationContext> | undefined) => void;
  };
}

export const Category: React.FC<Props & ButtonProps> = (p) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (p.categoryEdit?.categoryEditMode) {
      p.categoryEdit?.setCategoryForm(
        <CategoryAddUpdateForm
          category={p.category}
          setCategoryForm={p.categoryEdit.setCategoryForm}
          type="edit"
          userReexec={p.categoryEdit.userReexec}
        />
      );
      return;
    }
    p.toggleCategorySelected(p.category);
  };

  const buttonVariant = () => {
    if (p.categoryEdit?.categoryEditMode) return 'solid';
    if (p.category?.selected) return 'solid';
    return 'outline';
  };

  return (
    <Button
      className="element"
      colorScheme={p.categoryEdit?.categoryEditMode ? 'green' : 'blue'}
      onClick={handleClick}
      size={p.size}
      variant={buttonVariant()}
    >
      {p.category?.name}
    </Button>
  );
};
