import React from 'react';
import { Formik } from 'formik';
import { SelectableCategory } from '../../utility/type';

interface Props {
  category: SelectableCategory | null;
  toggleCategorySelected: (category: SelectableCategory | null) => void;
}

export const CategorySelect: React.FC<Props> = (p) => {
  const [showEdit, setShowEdit] = React.useState<boolean>(false);

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
          onSubmit={async () => {
            console.log('edit');
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
      <button>Delete</button>
    </div>
  );
};
