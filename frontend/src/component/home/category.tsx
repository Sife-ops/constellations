import React from 'react';
import { CategoryAddUpdateForm } from './category-add-update-form';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';
import { Button } from '@chakra-ui/react';

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
    <div>
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
        <>
          <input
            //
            type="checkbox"
            checked={p.category?.selected}
            onChange={() => p.toggleCategorySelected(p.category)}
          />
          <label>{p.category?.name}</label>
        </>
      )}
    </div>
  );
};
