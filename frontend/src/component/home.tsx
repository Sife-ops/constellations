import React from 'react';
import { Filter } from './filter';
import { useUserQuery, Bookmark } from '../generated/graphql';

export const Home: React.FC = () => {
  const [userResult, userReexec] = useUserQuery();

  if (userResult.fetching) return <div>loading...</div>;
  if (userResult.error) return <div>error</div>;

  const { user } = userResult.data!;

  return (
    //
    <div>
      <h1>home</h1>
      <Filter bookmarks={user?.bookmarks!} />
    </div>
  );
};
