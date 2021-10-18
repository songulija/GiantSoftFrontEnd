import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { login } from '../redux/actions/usersActions'
import { Link } from 'react-router-dom'

function LoginScreen({ location, history }) {
    //useState has initial value and function to update initial value
    const [email, setEmail] = useState('')//by default both will be strings
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const usersReducer = useSelector((state)=>state.usersReducer);
    const { loading, error, currentUser } = usersReducer;//we want to distructure userLogin to these

    //check the query string. if there is then take left size of query which is number
    const redirect = location.search ? location.search.split('=')[1] : '/';

    //we want to redirect if we already logged in
    useEffect(() => {
        if (currentUser) {//if user info exist than means we already are logged in
            history.push(redirect)//redirect to whatever is in redirect
        }
    }, [history, currentUser, redirect])//if userInfo changed we want to redirect

    const submitHandler = (e)=> {
        e.preventDefault();//prevemnt default behaviour when submit button is clicked. preved refresh of page
        //DISPATCH LOGIN action. pass email and password that user typed
        dispatch(login(email, password));
    }
    return (
        <>
            <body class="text-center" cz-shortcut-listen="true">
                <Container className="my-auto">
                    <img class="mb-4" src="https://i.pinimg.com/originals/89/7a/61/897a61f56ec18239c658bf02cdba1b6e.jpg" alt="" width="200" height="200" />
                </Container>
                <main class="form-signin">
                    <form onSubmit={submitHandler}>
                        {/* <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                        <div class="form-floating">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                                value={email} onChange={(e)=>setEmail(e.target.value)}
                            />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                            />
                            <label for="floatingPassword">Password</label>
                        </div>

                        <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" />Remember me
                            </label>
                        </div>
                        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        <p class="mt-5 mb-3 text-muted">© 2017–2021</p>
                        <Row className='py-3'>
                            <Col>
                                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                            </Col>
                        </Row>
                    </form>
                </main>





            </body>
        </>
    )
}

export default LoginScreen
