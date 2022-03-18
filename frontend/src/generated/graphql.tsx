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

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkAdd?: Maybe<Bookmark>;
  bookmarkDelete?: Maybe<Bookmark>;
  bookmarkUpdate?: Maybe<Bookmark>;
  categoryAdd?: Maybe<Category>;
  categoryDelete?: Maybe<Category>;
  categoryUpdate?: Maybe<Category>;
  login?: Maybe<LoginResponse>;
  register?: Maybe<User>;
  userExists?: Maybe<Scalars['Boolean']>;
};


export type MutationBookmarkAddArgs = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  description: Scalars['String'];
  url: Scalars['String'];
};


export type MutationBookmarkDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationBookmarkUpdateArgs = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  url?: InputMaybe<Scalars['String']>;
};


export type MutationCategoryAddArgs = {
  name: Scalars['String'];
};


export type MutationCategoryDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationCategoryUpdateArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  remember: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  captcha?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
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
  _dev3?: Maybe<User>;
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  user?: Maybe<User>;
};


export type Query_Dev3Args = {
  id: Scalars['Int'];
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

export type _Dev1QueryVariables = Exact<{ [key: string]: never; }>;


export type _Dev1Query = { __typename?: 'Query', _dev1?: Array<{ __typename?: 'User', id?: number | null, email?: string | null, username?: string | null, bookmarks?: Array<{ __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null } | null> | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null } | null> | null };

export type _Dev2QueryVariables = Exact<{ [key: string]: never; }>;


export type _Dev2Query = { __typename?: 'Query', _dev2?: { __typename?: 'User', id?: number | null } | null };

export type _Dev3QueryVariables = Exact<{
  dev3Id: Scalars['Int'];
}>;


export type _Dev3Query = { __typename?: 'Query', _dev3?: { __typename?: 'User', id?: number | null, email?: string | null, username?: string | null } | null };

export type BookmarkAddMutationVariables = Exact<{
  description: Scalars['String'];
  url: Scalars['String'];
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
}>;


export type BookmarkAddMutation = { __typename?: 'Mutation', bookmarkAdd?: { __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null } | null };

export type BookmarkDeleteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BookmarkDeleteMutation = { __typename?: 'Mutation', bookmarkDelete?: { __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null } | null };

export type BookmarkUpdateMutationVariables = Exact<{
  id: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
}>;


export type BookmarkUpdateMutation = { __typename?: 'Mutation', bookmarkUpdate?: { __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null } | null };

export type BookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarksQuery = { __typename?: 'Query', bookmarks?: Array<{ __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null } | null> | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null, bookmarks?: Array<{ __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null } | null> | null } | null> | null };

export type CategoryAddMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CategoryAddMutation = { __typename?: 'Mutation', categoryAdd?: { __typename?: 'Category', id?: number | null, name?: string | null } | null };

export type CategoryDeleteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CategoryDeleteMutation = { __typename?: 'Mutation', categoryDelete?: { __typename?: 'Category', id?: number | null, name?: string | null } | null };

export type CategoryUpdateMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type CategoryUpdateMutation = { __typename?: 'Mutation', categoryUpdate?: { __typename?: 'Category', id?: number | null, name?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  remember: Scalars['Boolean'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', token: string } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  captcha?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id?: number | null, email?: string | null, username?: string | null } | null };

export type UserExistsMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type UserExistsMutation = { __typename?: 'Mutation', userExists?: boolean | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: number | null, email?: string | null, username?: string | null, bookmarks?: Array<{ __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null } | null> | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null, bookmarks?: Array<{ __typename?: 'Bookmark', id?: number | null, url?: string | null, description?: string | null, categories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null } | null> | null } | null> | null } | null };

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
        "name": "LoginResponse",
        "fields": [
          {
            "name": "token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
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
            "name": "bookmarkAdd",
            "type": {
              "kind": "OBJECT",
              "name": "Bookmark",
              "ofType": null
            },
            "args": [
              {
                "name": "categoryIds",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "description",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "url",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "bookmarkDelete",
            "type": {
              "kind": "OBJECT",
              "name": "Bookmark",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "bookmarkUpdate",
            "type": {
              "kind": "OBJECT",
              "name": "Bookmark",
              "ofType": null
            },
            "args": [
              {
                "name": "categoryIds",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "description",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "url",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "categoryAdd",
            "type": {
              "kind": "OBJECT",
              "name": "Category",
              "ofType": null
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "categoryDelete",
            "type": {
              "kind": "OBJECT",
              "name": "Category",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "categoryUpdate",
            "type": {
              "kind": "OBJECT",
              "name": "Category",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "login",
            "type": {
              "kind": "OBJECT",
              "name": "LoginResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "remember",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
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
                "name": "captcha",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
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
            "name": "_dev3",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
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
export const _Dev1Document = gql`
    query _dev1 {
  _dev1 {
    id
    email
    username
    bookmarks {
      id
      url
      description
    }
    categories {
      id
      name
    }
  }
}
    `;

export const _Dev1Component = (props: Omit<Urql.QueryProps<_Dev1Query, _Dev1QueryVariables>, 'query'> & { variables?: _Dev1QueryVariables }) => (
  <Urql.Query {...props} query={_Dev1Document} />
);


export function use_Dev1Query(options?: Omit<Urql.UseQueryArgs<_Dev1QueryVariables>, 'query'>) {
  return Urql.useQuery<_Dev1Query>({ query: _Dev1Document, ...options });
};
export const _Dev2Document = gql`
    query _dev2 {
  _dev2 {
    id
  }
}
    `;

export const _Dev2Component = (props: Omit<Urql.QueryProps<_Dev2Query, _Dev2QueryVariables>, 'query'> & { variables?: _Dev2QueryVariables }) => (
  <Urql.Query {...props} query={_Dev2Document} />
);


export function use_Dev2Query(options?: Omit<Urql.UseQueryArgs<_Dev2QueryVariables>, 'query'>) {
  return Urql.useQuery<_Dev2Query>({ query: _Dev2Document, ...options });
};
export const _Dev3Document = gql`
    query _dev3($dev3Id: Int!) {
  _dev3(id: $dev3Id) {
    id
    email
    username
  }
}
    `;

export const _Dev3Component = (props: Omit<Urql.QueryProps<_Dev3Query, _Dev3QueryVariables>, 'query'> & { variables: _Dev3QueryVariables }) => (
  <Urql.Query {...props} query={_Dev3Document} />
);


export function use_Dev3Query(options: Omit<Urql.UseQueryArgs<_Dev3QueryVariables>, 'query'>) {
  return Urql.useQuery<_Dev3Query>({ query: _Dev3Document, ...options });
};
export const BookmarkAddDocument = gql`
    mutation BookmarkAdd($description: String!, $url: String!, $categoryIds: [Int]) {
  bookmarkAdd(description: $description, url: $url, categoryIds: $categoryIds) {
    id
    url
    description
    categories {
      id
      name
    }
  }
}
    `;

export const BookmarkAddComponent = (props: Omit<Urql.MutationProps<BookmarkAddMutation, BookmarkAddMutationVariables>, 'query'> & { variables?: BookmarkAddMutationVariables }) => (
  <Urql.Mutation {...props} query={BookmarkAddDocument} />
);


export function useBookmarkAddMutation() {
  return Urql.useMutation<BookmarkAddMutation, BookmarkAddMutationVariables>(BookmarkAddDocument);
};
export const BookmarkDeleteDocument = gql`
    mutation BookmarkDelete($id: Int!) {
  bookmarkDelete(id: $id) {
    id
    url
    description
  }
}
    `;

export const BookmarkDeleteComponent = (props: Omit<Urql.MutationProps<BookmarkDeleteMutation, BookmarkDeleteMutationVariables>, 'query'> & { variables?: BookmarkDeleteMutationVariables }) => (
  <Urql.Mutation {...props} query={BookmarkDeleteDocument} />
);


export function useBookmarkDeleteMutation() {
  return Urql.useMutation<BookmarkDeleteMutation, BookmarkDeleteMutationVariables>(BookmarkDeleteDocument);
};
export const BookmarkUpdateDocument = gql`
    mutation BookmarkUpdate($id: Int!, $description: String, $url: String, $categoryIds: [Int]) {
  bookmarkUpdate(
    id: $id
    description: $description
    url: $url
    categoryIds: $categoryIds
  ) {
    id
    url
    description
    categories {
      id
      name
    }
  }
}
    `;

export const BookmarkUpdateComponent = (props: Omit<Urql.MutationProps<BookmarkUpdateMutation, BookmarkUpdateMutationVariables>, 'query'> & { variables?: BookmarkUpdateMutationVariables }) => (
  <Urql.Mutation {...props} query={BookmarkUpdateDocument} />
);


export function useBookmarkUpdateMutation() {
  return Urql.useMutation<BookmarkUpdateMutation, BookmarkUpdateMutationVariables>(BookmarkUpdateDocument);
};
export const BookmarksDocument = gql`
    query Bookmarks {
  bookmarks {
    id
    url
    description
    categories {
      id
      name
    }
  }
}
    `;

export const BookmarksComponent = (props: Omit<Urql.QueryProps<BookmarksQuery, BookmarksQueryVariables>, 'query'> & { variables?: BookmarksQueryVariables }) => (
  <Urql.Query {...props} query={BookmarksDocument} />
);


export function useBookmarksQuery(options?: Omit<Urql.UseQueryArgs<BookmarksQueryVariables>, 'query'>) {
  return Urql.useQuery<BookmarksQuery>({ query: BookmarksDocument, ...options });
};
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
    bookmarks {
      id
      url
      description
      categories {
        id
        name
      }
    }
  }
}
    `;

export const CategoriesComponent = (props: Omit<Urql.QueryProps<CategoriesQuery, CategoriesQueryVariables>, 'query'> & { variables?: CategoriesQueryVariables }) => (
  <Urql.Query {...props} query={CategoriesDocument} />
);


export function useCategoriesQuery(options?: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CategoriesQuery>({ query: CategoriesDocument, ...options });
};
export const CategoryAddDocument = gql`
    mutation CategoryAdd($name: String!) {
  categoryAdd(name: $name) {
    id
    name
  }
}
    `;

export const CategoryAddComponent = (props: Omit<Urql.MutationProps<CategoryAddMutation, CategoryAddMutationVariables>, 'query'> & { variables?: CategoryAddMutationVariables }) => (
  <Urql.Mutation {...props} query={CategoryAddDocument} />
);


export function useCategoryAddMutation() {
  return Urql.useMutation<CategoryAddMutation, CategoryAddMutationVariables>(CategoryAddDocument);
};
export const CategoryDeleteDocument = gql`
    mutation CategoryDelete($id: Int!) {
  categoryDelete(id: $id) {
    id
    name
  }
}
    `;

export const CategoryDeleteComponent = (props: Omit<Urql.MutationProps<CategoryDeleteMutation, CategoryDeleteMutationVariables>, 'query'> & { variables?: CategoryDeleteMutationVariables }) => (
  <Urql.Mutation {...props} query={CategoryDeleteDocument} />
);


export function useCategoryDeleteMutation() {
  return Urql.useMutation<CategoryDeleteMutation, CategoryDeleteMutationVariables>(CategoryDeleteDocument);
};
export const CategoryUpdateDocument = gql`
    mutation CategoryUpdate($id: Int!, $name: String!) {
  categoryUpdate(id: $id, name: $name) {
    id
    name
  }
}
    `;

export const CategoryUpdateComponent = (props: Omit<Urql.MutationProps<CategoryUpdateMutation, CategoryUpdateMutationVariables>, 'query'> & { variables?: CategoryUpdateMutationVariables }) => (
  <Urql.Mutation {...props} query={CategoryUpdateDocument} />
);


export function useCategoryUpdateMutation() {
  return Urql.useMutation<CategoryUpdateMutation, CategoryUpdateMutationVariables>(CategoryUpdateDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $remember: Boolean!) {
  login(email: $email, password: $password, remember: $remember) {
    token
  }
}
    `;

export const LoginComponent = (props: Omit<Urql.MutationProps<LoginMutation, LoginMutationVariables>, 'query'> & { variables?: LoginMutationVariables }) => (
  <Urql.Mutation {...props} query={LoginDocument} />
);


export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!, $captcha: String) {
  register(
    email: $email
    username: $username
    password: $password
    captcha: $captcha
  ) {
    id
    email
    username
  }
}
    `;

export const RegisterComponent = (props: Omit<Urql.MutationProps<RegisterMutation, RegisterMutationVariables>, 'query'> & { variables?: RegisterMutationVariables }) => (
  <Urql.Mutation {...props} query={RegisterDocument} />
);


export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UserExistsDocument = gql`
    mutation UserExists($email: String, $username: String) {
  userExists(email: $email, username: $username)
}
    `;

export const UserExistsComponent = (props: Omit<Urql.MutationProps<UserExistsMutation, UserExistsMutationVariables>, 'query'> & { variables?: UserExistsMutationVariables }) => (
  <Urql.Mutation {...props} query={UserExistsDocument} />
);


export function useUserExistsMutation() {
  return Urql.useMutation<UserExistsMutation, UserExistsMutationVariables>(UserExistsDocument);
};
export const UserDocument = gql`
    query User {
  user {
    id
    email
    username
    bookmarks {
      id
      url
      description
      categories {
        id
        name
      }
    }
    categories {
      id
      name
      bookmarks {
        id
        url
        description
        categories {
          id
          name
        }
      }
    }
  }
}
    `;

export const UserComponent = (props: Omit<Urql.QueryProps<UserQuery, UserQueryVariables>, 'query'> & { variables?: UserQueryVariables }) => (
  <Urql.Query {...props} query={UserDocument} />
);


export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};