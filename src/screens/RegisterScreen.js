import React from 'react'
import {Container} from 'react-bootstrap'

function RegisterScreen() {
    return (
        <body className="text-center" cz-shortcut-listen="true">
        <Container className="my-auto">
            <img className="mb-4" src="https://i.pinimg.com/originals/89/7a/61/897a61f56ec18239c658bf02cdba1b6e.jpg" alt="" width="200" height="200" />
        </Container>
            <main className="form-signin">
                <form>
                    {/* <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                    <h1 className ="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className ="form-floating">
                    <input type ="text" className ="form-control" id="floatingInput" placeholder="Firstname"/>
                    <label for="floatingInput">Firstname</label>
                    </div>
                    <div className ="form-floating">
                    <input type ="text" className ="form-control" id="floatingInput" placeholder="Lastname"/>
                    <label for="floatingInput">Lastname</label>
                    </div>
                    <div className ="form-floating">
                    <input type ="text" className ="form-control" id="floatingInput" placeholder="Phone number"/>
                    <label for="floatingInput">Phone number</label>
                    </div>
                    <div className ="form-floating">
                    <input type ="email" className ="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Email address</label>
                    </div>
                    <div className ="form-floating">
                    <input type ="password" className ="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                    </div>

                    <button className ="w-100 btn btn-lg btn-primary" type ="submit">Sign in</button>
                    <p className ="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </main>





        </body>
    )
}

export default RegisterScreen
