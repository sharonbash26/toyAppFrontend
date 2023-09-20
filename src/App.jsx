import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { AboutUs } from './pages/AboutUs'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { store } from './store/store'
// import { AppFooter } from './cmps/AppFooter'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}