import React from 'react';
import { Filter } from './filter';
import { useUserQuery } from '../generated/graphql';

export const Home: React.FC = () => {
  // const [userResult, userReexec] = useUserQuery();
  const userQuery = useUserQuery();
  const [{ fetching, error }] = userQuery;

  if (fetching) return <div>loading...</div>;
  if (error) return <div>error</div>;

  // const { user } = userResult.data!;

  return (
    //
    <div>
      <h1>home</h1>
      {/* <Filter bookmarks={user?.bookmarks!} /> */}
      <Filter userQuery={userQuery} />
    </div>
  );
};
