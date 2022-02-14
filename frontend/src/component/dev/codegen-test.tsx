import React from 'react';

import { use_Dev0Query, use_Dev1Query, use_Dev3Query } from '../../generated/graphql';

export const CodegenTest: React.FC = () => {
  const [a, b] = use_Dev3Query({ variables: { dev3Id: 1 } });

  if (a.fetching) return <div>loading...</div>;
  if (a.error) return <div>error</div>;

  console.log(a.data);

  return <div>codegen test</div>;
};
