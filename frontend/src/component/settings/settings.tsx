import { Input, Button, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import { BlockBox } from '../block-box';

export const Settings: React.FC = () => {
  return (
    <>
      <BlockBox className="block">
        <Formik
          initialValues={{ password: '' }}
          onSubmit={async ({ password }) => {
            //
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Text>Change Password</Text>
              <div className="element">
                <Input
                  name="name"
                  onChange={handleChange}
                  placeholder="name"
                  style={{
                    paddingLeft: '.5rem',
                  }}
                  value={values.password}
                />
              </div>
              <Button
                //
                colorScheme="blue"
                className="element"
                size="xs"
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </BlockBox>
    </>
  );
};
