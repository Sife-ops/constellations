import React from 'react';
import { Button } from '@chakra-ui/react';
import { CategoryAddUpdateForm } from './category-add-update-form';
import { CategoryCheckbox } from './category-checkbox';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';

interface Props {
  category: SelectableCategory | null;
  toggleCategorySelected: (category: SelectableCategory | null) => void;
  //
  categoryEdit?: {
    categoryEditMode: boolean;
    setCategoryForm: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    userReexec: (opts?: Partial<OperationContext> | undefined) => void;
  };
}

export const Category: React.FC<Props> = (p) => {
  return (
    <div className='categories__button'>
      {p.categoryEdit?.categoryEditMode ? (
        <Button
          onClick={() => {
            p.categoryEdit?.setCategoryForm(
              <CategoryAddUpdateForm
                //
                category={p.category}
                setCategoryForm={p.categoryEdit.setCategoryForm}
                type="edit"
                userReexec={p.categoryEdit.userReexec}
              />
            );
          }}
        >
          {p.category?.name}
        </Button>
      ) : (
        <CategoryCheckbox
          //
          isChecked={p.category?.selected}
          onChange={() => p.toggleCategorySelected(p.category)}
        >
          {p.category?.name}
        </CategoryCheckbox>
      )}
    </div>
  );
};
