import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({//first dispatch action with type/name USER_LOGIN_REQUEST. reducer will caught it. and set loading to true
            type: 'USER_LOGIN_REQUEST'
        })

        //then we want to dispatch 'USER_LOGIN_SUCCESS' but we need to check data first
        //but when we're sending data we want to send it in headers

        const config = {//but for now we set content type to application/json'
            headers: {
                'Content-Type': 'application/json'
            }
        }

        
        //we want to make post request and pass object with email and password. and as third argument pass config
        //this post request will return json data. _id,name,email .. TOKEN
        const { data } = await axios.post('/api/Accounts/login', { email, password }, config)

        dispatch({//dispatch action with type/name USER_LOGIN_SUCCESS. and send data as payload
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        //then we want to set our user to local storage. set this 'userInfo' and pass data as as string(json)
        localStorage.setItem('userInfo', JSON.stringify(data));


    } catch (error) {//if something fails then dispatch action with type/name PRODUCT_DETAILS_FAIL and pass error data as payload
        console.log(error)
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo')
    dispatch({ type: 'USER_LOGOUT' })
    dispatch({ type: 'USER_DETAILS_RESET' })//when logout to dispatch these two actions 
    dispatch({ type: 'ORDER_LIST_MY_RESET' })//to emtpy user details and orders of that user that was logged
    dispatch({ type: 'USER_LIST_RESET' })// to reset userlist (admin)
}


export const register = (postObject) => async (dispatch) => {

    try {

        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/Accounts/register',
            postObject,
            config
        )

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data,
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }

}