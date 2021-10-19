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
        const postObject = {
            "email": email,
            "password":password
        }
        const response = await axios.post('/api/Accounts/login', postObject, config)
        console.log('Login response is: '+JSON.stringify(response.data))
        dispatch({//dispatch action with type/name USER_LOGIN_SUCCESS. and send data as payload
            type: 'USER_LOGIN_SUCCESS',
            payload: response.data
        })

        //then we want to set our user to local storage. set this 'userInfo' and pass data as as string(json)
        localStorage.setItem('currentUser', response.data.token);


    } catch (error) {//if something fails then dispatch action with type/name PRODUCT_DETAILS_FAIL and pass error data as payload
        console.log(error)
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('currentUser')
    dispatch({ type: 'USER_LOGOUT' })
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

        const response = await axios.post('/api/Accounts/register',
            postObject,
            config
        )

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: response.data,
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: response.data,
        })

        localStorage.setItem('currentUser', response.data.token);

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

export const getUserId = () => async(dispatch, getState)=>{
    try{
        dispatch({
            type: 'USER_DATA_REQUEST'
        });
        const { usersReducer: { currentUser } } = getState();//get user info
        console.log('getUserId token is:'+JSON.stringify(currentUser))
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${currentUser}`
        //     }
        // }//setting authorization to our token
        const response = await axios.get('/api/accounts',{headers: {Authorization: `Bearer ${currentUser}`}});
        console.log('action getUserId: '+response.data);
        dispatch({
            type: 'USER_DATA_SUCCESS',
            payload: response.data
        });
    }catch(error){
        dispatch({
            type: 'USER_DATA_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}