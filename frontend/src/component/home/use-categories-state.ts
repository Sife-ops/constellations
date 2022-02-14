import React from 'react';
import { Category } from '../../generated/graphql';
import { SelectableCategory } from '../../utility/type';

export type CategoriesStateType = (SelectableCategory | null)[] | null;

/**
 * Custom hook for categories state.
 * @param state - Initial categories state.
 * @returns todo
 */
export const useCategoriesState = (state: CategoriesStateType) => {
  const [categories, setCategories] = React.useState<CategoriesStateType>(state);

  /**
   * Merge fetched categories with currently selected categories.
   * @param {(Category | null)[]} newState - New categories state.
   */
  const updateCategories = (newState: (Category | null)[]) => {
    setCategories((currentState) => {
      return newState.map((e1) => {
        const found = currentState?.find((e2) => e2?.id === e1?.id);
        if (found) {
          return {
            ...e1,
            selected: found.selected,
          };
        }
        return {
          ...e1,
          selected: false,
        };
      });
    });
  };

  /**
   * Toggle a category's selected state.
   * @param {SelectableCategory | null} category - Category to toggle.
   */
  const toggleCategorySelected = (category: SelectableCategory | null) => {
    setCategories((currentState) => {
      if (!currentState) return null;
      return currentState.map((e) => {
        if (e?.id === category?.id) {
          return {
            ...e,
            selected: !e?.selected,
          };
        }
        return e;
      });
    });
  };

  return {
    categories,
    setCategories,
    toggleCategorySelected,
    updateCategories,
  };
};
