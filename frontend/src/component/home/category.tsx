import React from 'react';
import { Formik } from 'formik';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';
import { useCategoryUpdateMutation, useCategoryDeleteMutation } from '../../generated/graphql';

interface PropsCommon {
  category: SelectableCategory | null;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

interface PropsCategory {
  toggleCategorySelected: (category: SelectableCategory | null) => void;
}

interface PropsCategoryForm {
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Category: React.FC<PropsCommon & PropsCategory> = (p) => {
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
        <CategoryUpdateForm
          //
          category={p.category}
          setShowEdit={setShowEdit}
          userReexec={p.userReexec}
        />
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const CategoryUpdateForm: React.FC<PropsCommon & PropsCategoryForm> = (p) => {
  const [_, categoryUpdateMutation] = useCategoryUpdateMutation();

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={async ({ name }) => {
        const res = await categoryUpdateMutation({ id: p.category?.id, name });
        if (res.error) return;
        p.userReexec();
        p.setShowEdit(false);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        //
        <form onSubmit={handleSubmit}>
          <input
            //
            name="name"
            onChange={handleChange}
            placeholder="name"
            value={values.name}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};
