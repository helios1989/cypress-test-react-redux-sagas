import { createSelector } from 'reselect';

export const selectUsers = (state) => state.users;

export const selectUsersData = createSelector(
  [selectUsers],
  (users) => users.data
);

export const selectUsersErrorMessage = createSelector(
  [selectUsers],
  (users) => users.errorMessage
);

export const selectUsersFetchStatus = createSelector(
  [selectUsers],
  (users) => users.isFetching
);
