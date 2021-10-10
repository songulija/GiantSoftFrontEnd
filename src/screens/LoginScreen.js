import React from 'react'
import { Container } from 'react-bootstrap'
import Eimis from '../components/Eimis'

function LoginScreen() {
    return (
        <>
            <body class="text-center" cz-shortcut-listen="true">
            <Container className="my-auto">
                <img class="mb-4" src="https://i.pinimg.com/originals/89/7a/61/897a61f56ec18239c658bf02cdba1b6e.jpg" alt="" width="200" height="200" />
            </Container>
                <main class="form-signin">
                    <form>
                        {/* <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                        <h1 class ="h3 mb-3 fw-normal">Please sign in</h1>

                        <div class ="form-floating">
                        <input type ="email" class ="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                        </div>
                        <div class ="form-floating">
                        <input type ="password" class ="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                        </div>

                        <div class ="checkbox mb-3">
                        <label>
                        <input type ="checkbox" value="remember-me"/>Remember me
                        </label>
                        </div>
                        <button class ="w-100 btn btn-lg btn-primary" type ="submit">Sign in</button>
                        <p class ="mt-5 mb-3 text-muted">© 2017–2021</p>
                    </form>
                </main>





            </body>
        </>
    )
}

export default LoginScreen
