import React from 'react';
import { Category } from '../../generated/graphql';
import { SelectableCategory } from '../../utility/type';

interface Props {
  category: SelectableCategory | null;
  toggleCategorySelected: (category: SelectableCategory | null) => void;
}

export const CategorySelect: React.FC<Props> = (p) => {
  return (
    <div>
      <input
        //
        type="checkbox"
        checked={p.category?.selected}
        onChange={() => p.toggleCategorySelected(p.category)}
      />
      <label>{p.category?.name}</label>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};
