import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/usersActions';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

function RegisterScreen({ location, history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')

    const dispatch = useDispatch();
    //useSelector is function. we 'll access entire state(Store). we can just pull out state.userRegister
    const usersReducer = useSelector((state) => state.usersReducer);
    // getting userInfo from userRegister state
    const { loading, error, currentUser } = usersReducer;

    //check the query string. if there is then take left size of query which is number
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (currentUser) {//if user info exist than means we already are logged in
            history.push(redirect)//redirect to whatever is in redirect
        }
    }, [history, currentUser, redirect]);

    //we want to redirect if we already logged in
    const submitHandler = function (e) {
        e.preventDefault();//prevemnt default behaviour when submit button is clicked. preved refresh of page
        const postObject = {
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "roles": [
                "USER"
            ]
        }
        if (password === confirmPassword) {
            dispatch(register(postObject))
        }  
    }

    return (
        <body className="text-center" cz-shortcut-listen="true">
            <Container className="my-auto">
                <img className="mb-4" src="https://media.istockphoto.com/vectors/vector-illustration-register-now-speech-bubble-label-vector-id1303860322?k=20&amp;m=1303860322&amp;s=612x612&amp;w=0&amp;h=NNHlX8Q70qgc4Jcn-urDs5L1VhXwjaJWz_ypdxzNRc4=" alt="registerimage" width="200" height="200" />
            </Container>
            <main className="form-signin">
                {error && <h2>{error}</h2>}
                {loading && <h2>Loading</h2>}
                <form onSubmit={submitHandler}>
                    {/* <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                    <h1 className="h3 mb-3 fw-normal">Registration</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Firstname"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label for="floatingInput">Firstname</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Lastname"
                            value={lastName} onChange={(e) => setLastName(e.target.value)}
                        />
                        <label for="floatingInput">Lastname</label>
                    </div>
                    <div className="form-floating">
                        <input type="tel" className="form-control" id="floatingNumber" placeholder="PhoneNumber"
                            value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label for="floatingNumber">Phone number</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label for="floatingPassword">Confirm Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit" variant='primary'>Register</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>
            </main>

        </body>
    )
}

export default RegisterScreen
