import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Footer } from "./component/footer";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
// import { Planet } from "./views/Planet.jsx";
// import { Person } from "./views/Person.jsx";
import { DetailView } from "./views/DetailView.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/planets/:id"
              element={<DetailView title="Planets" type="planets" />}
            />
            <Route
              path="/people/:id"
              element={<DetailView title="People" type="people" />}
            />
            <Route
              path="/starships/:id"
              element={<DetailView title="Starships" type="starships" />}
            />
          </Routes>
          <Footer/>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
