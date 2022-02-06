import React from 'react';
import { use_Dev2Query } from '../../generated/graphql';

export const AuthTest: React.FC = () => {
  const [res, reexec] = use_Dev2Query({
    requestPolicy: 'network-only',
  });

  if (res.fetching) return <div>loading...</div>;

  if (res.error) {
    console.log(res.error);
    return <div>error</div>;
  }

  return (
    <div className="auto-authTest">
      {/* // */}
      authtest: {JSON.stringify(res.data)}
    </div>
  );
};
