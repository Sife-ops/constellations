import { Category } from '../generated/graphql';

export type HandleCategory = (args: { type: 'add' | 'edit' }) => React.MouseEventHandler<HTMLButtonElement>;

export type SelectableCategory = Category & { selected: boolean };
