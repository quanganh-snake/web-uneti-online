export const AccordionAction = {
    TOGGLE: 'toggle'
}

export const reducer = (state, action) => {
  switch (action) {
    case AccordionAction.TOGGLE: {
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    }
    default: {
      return state
    }
  }
}