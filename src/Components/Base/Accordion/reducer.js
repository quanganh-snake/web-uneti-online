export const AccordionAction = {
    TOGGLE: 'toggle',
    OPEN: 'open',
    CLOSE: 'close',
}

export const reducer = (state, action) => {
    switch (action) {
        case AccordionAction.TOGGLE: {
            return {
                ...state,
                isOpen: !state.isOpen,
            }
        }
        case AccordionAction.OPEN: {
            return {
                ...state,
                isOpen: true,
            }
        }
        case AccordionAction.CLOSE: {
            return {
                ...state,
                isOpen: false,
            }
        }
        default: {
            return state
        }
    }
}
