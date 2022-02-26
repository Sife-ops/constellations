import React from 'react';
import { Button, Input, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import { OperationContext } from 'urql';
import { SelectableCategory } from '../../utility/type';

import {
  //
  useCategoryUpdateMutation,
  useCategoryAddMutation,
  useCategoryDeleteMutation,
} from '../../generated/graphql';

interface Props {
  category?: SelectableCategory | null;
  setCategoryForm: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  type: 'add' | 'edit';
  userReexec: (opts?: Partial<OperationContext> | undefined) => void;
}

export const CategoryAddUpdateForm: React.FC<Props> = (p) => {
  const [_, categoryAddMutation] = useCategoryAddMutation();
  const [__, categoryUpdateMutation] = useCategoryUpdateMutation();
  const [___, categoryDeleteMutation] = useCategoryDeleteMutation();

  const resetForm = () => {
    p.userReexec();
    p.setCategoryForm(null);
  };

  const handleDelete = async () => {
    const res = await categoryDeleteMutation({ id: p.category?.id! });
    if (res?.error) {
      console.log(res.error);
      return;
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: p.category?.name || '' }}
      onSubmit={async ({ name }) => {
        let res;
        if (p.type === 'add') {
          res = await categoryAddMutation({ name });
        }
        if (p.type === 'edit') {
          res = await categoryUpdateMutation({ id: p.category?.id!, name });
        }
        if (res?.error) {
          console.log(res.error);
          return;
        }
        resetForm();
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
              }}
            >
              <div
                style={{
                  marginRight: '.5rem',
                }}
              >
                <Text>{p.type === 'add' ? 'Add ' : 'Edit '}Category</Text>
                <Input
                  className="element"
                  name="name"
                  onChange={handleChange}
                  placeholder="name"
                  style={{
                    paddingLeft: '.5rem',
                  }}
                  value={values.name}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Button
                  //
                  className="element"
                  colorScheme="blue"
                  size="xs"
                  type="submit"
                >
                  Submit
                </Button>
                {p.type === 'edit' && (
                  <Button
                    //
                    className="element"
                    colorScheme="red"
                    onClick={handleDelete}
                    size="xs"
                    type="button"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </form>
      )}
    </Formik>
  );
};
