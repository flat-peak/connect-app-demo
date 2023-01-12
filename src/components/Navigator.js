let navigationRef;
export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

export const dispatchNavigationAction = (action) => {
  if (navigationRef) {
    navigationRef.dispatch(action);
  }
};
