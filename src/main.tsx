import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorBoundary from './Components/ErrorBoundary'
import App from './App.tsx'
import './main.scss'

declare global {
    interface Window {
        fitting?: {
            "token": string,
            "source": string,
            "root": string,
            "selected": string,
            "products": string[]
            "hideLink"?: boolean
        }
    }
}
ReactDOM.createRoot(document.getElementById(window.fitting?.root || 'fitting') as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </React.StrictMode>
)
