import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { AboutUs } from "./pages/aboutUs.jsx";
import { SignUp  } from "./pages/signup.jsx";
import { Admin  } from "./pages/admin.jsx";
import { Login } from "./pages/login.jsx";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Home } from "./pages/home.jsx";
import { Tienda } from "./pages/tienda.jsx";
import { Profile } from "./pages/protected/profile.jsx";
import { Favorites } from "./pages/protected/favorites.jsx";
import { Cart } from "./pages/protected/cart.jsx";
import { Fade } from "react-reveal";
import { TopNavbar } from "./component/topNavbar.js";
import { Slidetobuy } from "./pages/Slidetobuy.jsx";

import { ProtectedRoute } from "./pages/session.jsx";
import { useState } from "react";

import { CloudinaryImage } from "./pages/cloudinary.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    console.log("Backend URL:", process.env.BACKEND_URL);

    return (
        <Fade>
        <div>
            <TopNavbar />
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<SignUp  />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Slidetobuy />} path="/slidetobuy" />
                        <Route element={<Tienda />} path="/tienda" />
                        <Route element={<AboutUs />} path="/aboutUs" />
                        <Route element={<CloudinaryImage />} path="/cloudinary" />
                        <Route path="/session" element={<ProtectedRoute />}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="favorites" element={<Favorites />} />
                            <Route path="cart" element={<Cart />} />
                        </Route>
                        <Route path="admin" element={<Admin />} />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
        </Fade>
    );
};

export default injectContext(Layout);
