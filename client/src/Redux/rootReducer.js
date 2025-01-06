const initstate = {
    loginName: ""
}

const rootReducer = (state=initstate,action) => {
    
    switch (action.type) {
        case 'SET':
            return {
                ...state, loginName: action.payload
            };
        default: 
            return state
    }

}

export default rootReducer