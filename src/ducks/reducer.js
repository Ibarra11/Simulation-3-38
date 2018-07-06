let intialState = {
    username: '',
    profile_pic: ''
}
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const CLEAR_USER_INFO = 'CLEAR_USER_INFO';


export default function(state=intialState, action){
    switch(action.type){
        case UPDATE_USER_INFO:
            return Object.assign({}, state, action.payload)
        case CLEAR_USER_INFO:   
            return intialState;
        default:
            return state;
    }
}

export function updateUserInfo( username, profile_pic){
    return{
        type: UPDATE_USER_INFO,
        payload:{
            username, 
            profile_pic
        }
    }
}

export function clearUserInfo(){
    return{
        type: CLEAR_USER_INFO
    }
}