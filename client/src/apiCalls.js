import axios from 'axios'


export const loginCall =async (user,dispatch)=> {
    dispatch({type:" LOGIN_START"})
    try {
        const res = await axios.post("auth/login",user)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE",payload:error})
    }
   
}
export const changeImg =async (user,dispatch)=> {
    
    try {
        const res = await axios.post("auth/login",user)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE",payload:error})
    }
   
}
export const logoutCall =async (dispatch)=> {
    
    try {
        localStorage.clear()
        dispatch({type:" LOGOUT",payload:null})
        window.location.assign("http://localhost:3000/")
        
    } catch (error) {
        console.log(error)
    }
}