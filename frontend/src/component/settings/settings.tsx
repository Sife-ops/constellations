import React from 'react';
import { BoxOutlined } from '../box-outlined';
import { Formik } from 'formik';
import { Input, Button, Text } from '@chakra-ui/react';

export const Settings: React.FC = () => {
  return (
    <>
      <BoxOutlined className="block">
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
      </BoxOutlined>
    </>
  );
};
