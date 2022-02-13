import { Category } from '../generated/graphql';

export type SelectableCategory = Category & { selected: boolean };
