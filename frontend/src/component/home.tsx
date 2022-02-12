import React from 'react';
import { useUserQuery, useBookmarksQuery } from '../generated/graphql';

export const Home: React.FC = () => {
  // const [userResult] = useBookmarksQuery();
  const [userResult] = useUserQuery();

  if (userResult.fetching) return <div>loading...</div>;
  if (userResult.error) return <div>error</div>;

  console.log(userResult.data);

  return <div>home</div>;
};
