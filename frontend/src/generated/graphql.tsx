import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  categories?: Maybe<Array<Maybe<Category>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Category = {
  __typename?: 'Category';
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  register?: Maybe<User>;
  userExists?: Maybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  remember?: InputMaybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUserExistsArgs = {
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _dev0?: Maybe<Scalars['String']>;
  _dev1?: Maybe<Array<Maybe<User>>>;
  _dev2?: Maybe<User>;
  categories?: Maybe<Array<Maybe<Category>>>;
};

export type User = {
  __typename?: 'User';
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type _Dev0QueryVariables = Exact<{ [key: string]: never; }>;


export type _Dev0Query = { __typename?: 'Query', _dev0?: string | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Bookmark",
        "fields": [
          {
            "name": "categories",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Category",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Category",
        "fields": [
          {
            "name": "bookmarks",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Bookmark",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "login",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "remember",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "register",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userExists",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "_dev0",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "_dev1",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_dev2",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "categories",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Category",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "bookmarks",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Bookmark",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "categories",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "Category",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const _Dev0Document = gql`
    query _dev0 {
  _dev0
}
    `;

export const _Dev0Component = (props: Omit<Urql.QueryProps<_Dev0Query, _Dev0QueryVariables>, 'query'> & { variables?: _Dev0QueryVariables }) => (
  <Urql.Query {...props} query={_Dev0Document} />
);


export function use_Dev0Query(options?: Omit<Urql.UseQueryArgs<_Dev0QueryVariables>, 'query'>) {
  return Urql.useQuery<_Dev0Query>({ query: _Dev0Document, ...options });
};