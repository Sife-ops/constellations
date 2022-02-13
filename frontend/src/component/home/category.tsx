import React from 'react';
import { Formik } from 'formik';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';
import { useCategoryUpdateMutation, useCategoryDeleteMutation } from '../../generated/graphql';

interface Props {
  category: SelectableCategory | null;
  toggleCategorySelected: (category: SelectableCategory | null) => void;
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

export const Category: React.FC<Props> = (p) => {
  const [showEdit, setShowEdit] = React.useState<boolean>(false);
  const [_, categoryUpdateMutation] = useCategoryUpdateMutation();
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
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async ({ name }) => {
            const res = await categoryUpdateMutation({ id: p.category?.id, name });
            if (res.error) return;
            p.userReexec();
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
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
