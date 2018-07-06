let intialState = {
    username: '',
    id: 0,
    profile_pic: ''
}
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';


export default function(state=intialState, action){
    switch(action.type){
        case UPDATE_USER_INFO:
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}

export function updateUserInfo(id, username, profile_pic){
    return{
        type: UPDATE_USER_INFO,
        payload:{
            id,
            username, 
            profile_pic
        }
    }
}