import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { AboutUs } from "./pages/aboutUs.jsx";
import { SignUp } from "./pages/signup.jsx";
import { ExportProductImage } from "./pages/admin.jsx";
import { Login } from "./pages/login.jsx";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Home } from "./pages/home.jsx";
import AddProductForm from "./pages/AddProductForm.jsx";
import { Tienda } from "./pages/tienda.jsx";
import { Profile } from "./pages/protected/profile.jsx";
import { Favorites } from "./pages/protected/favorites.jsx";
import { Cart } from "./pages/cart.jsx";
import { Checkout } from "./pages/protected/checkout.jsx";
import { Payment } from "./pages/protected/payment.jsx";
import { Fade } from "react-reveal";
import { TopNavbar } from "./component/topNavbar.js";
import { Slidetobuy } from "./pages/Slidetobuy.jsx";
import { Loader } from "./component/loader.js";
import { CartProvider } from "./store/carritoContext.js";

import { ProtectedRoute } from "./pages/session.jsx";
import { CloudinaryImage } from "./pages/cloudinary.jsx";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    console.log("Backend URL:", process.env.BACKEND_URL);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);
    return (

        <Fade>
            <div>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                    <TopNavbar />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<SignUp />} path="/signup" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<Slidetobuy />} path="/slidetobuy" />
                            <Route element={<Tienda />} path="/tienda" />
                            <Route element={<AboutUs />} path="/aboutUs" />
                            <Route element={<Cart />}  path="/cart" />
                            <Route element={<CloudinaryImage />} path="/cloudinary" />
                            <Route element={<AddProductForm />} path="/add-product" />
                            <Route path="/session" element={<ProtectedRoute />}>
                                <Route path="profile" element={<Profile />} />
                                <Route path="favorites" element={<Favorites />} />
                                {/* <Route path="checkout" element={<Checkout />} /> */}
                                <Route path="payment" element={<Payment />} />
                            </Route>
                            <Route path="admin" element={<ExportProductImage />} />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    </ScrollToTop>
                </BrowserRouter>
            </div>
        </Fade>

    );
};
export default injectContext(Layout);