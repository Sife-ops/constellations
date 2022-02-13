import React from 'react';
import { CategoryAddUpdateForm } from './category-add-update-form';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';
import { useCategoryDeleteMutation } from '../../generated/graphql';

interface Props {
  category: SelectableCategory | null;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
  toggleCategorySelected: (category: SelectableCategory | null) => void;
}

export const Category: React.FC<Props> = (p) => {
  const [showEdit, setShowEdit] = React.useState<boolean>(false);
  const [__, categoryDeleteMutation] = useCategoryDeleteMutation();

  const handleDelete: React.MouseEventHandler = async (e) => {
    const res = await categoryDeleteMutation({ id: p.category?.id });
    if (res.error) return;
    console.log(res);
    p.userReexec();
  };

  return (
    <div>
      <input
        //
        type="checkbox"
        checked={p.category?.selected}
        onChange={() => p.toggleCategorySelected(p.category)}
      />
      <label>{p.category?.name}</label>
      <button onClick={() => setShowEdit((s) => !s)}>Edit</button>
      {showEdit && (
        <CategoryAddUpdateForm
          //
          category={p.category}
          setShowForm={setShowEdit}
          type="update"
          userReexec={p.userReexec}
        />
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
