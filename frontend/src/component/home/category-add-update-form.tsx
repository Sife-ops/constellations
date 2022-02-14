import React from 'react';
import { Formik } from 'formik';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';
import { useCategoryUpdateMutation, useCategoryAddMutation } from '../../generated/graphql';

interface Props {
  category?: SelectableCategory | null;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'add' | 'update';
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

export const CategoryAddUpdateForm: React.FC<Props> = (p) => {
  const [_, categoryAddMutation] = useCategoryAddMutation();
  const [__, categoryUpdateMutation] = useCategoryUpdateMutation();

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={async ({ name }) => {
        let res;
        if (p.type === 'add') {
          res = await categoryAddMutation({ name });
        }
        if (p.type === 'update') {
          res = await categoryUpdateMutation({ id: p.category?.id, name });
        }
        if (res?.error) return;
        console.log(res);
        p.userReexec();
        p.setShowForm(false);
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
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};
