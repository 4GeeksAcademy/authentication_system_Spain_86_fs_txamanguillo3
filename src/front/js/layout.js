import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { AboutUs } from "./pages/aboutUs.jsx";
import { SignUp  } from "./pages/signup.jsx";
import { Login } from "./pages/login.jsx";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Home } from "./pages/home.jsx";
import { Session } from "./pages/session.jsx";
import { Newsletter } from "./pages/newsletter.jsx";
import { Tienda } from "./pages/tienda.jsx";
import { ProtectedOne } from "./pages/protected/protected-one.jsx";
import { ProtectedTwo } from "./pages/protected/protected-two.jsx";
import { Fade } from "react-reveal"

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <Fade>
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* <Route element={<Home />} path="/" /> */}
                        <Route element={<SignUp  />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<AboutUs />} path="/aboutUs" />
                        <Route element={<Session />} path="/session">
                            {/* <Route path='/protected-one' element={<ProtectedTwo />} />  */}
                        </Route>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
        </Fade>
    );
};

export default injectContext(Layout);
