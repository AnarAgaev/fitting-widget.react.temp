import React from 'react'
import img from '../../assets/error.webp'
import styles from './ErrorBoundary.module.scss'

interface ErrorBoundaryProps {
    children: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
    errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({hasError: true, error, errorInfo})
    }

    render() {
        const {hasError, error, errorInfo} = this.state
        if (hasError) {
            console.log(error?.toString())
            console.log(errorInfo?.componentStack)
            const {container, title, picture} = styles
            return (
                <div className={container}>
                    <h1 className={title}>Что-то пошло не так.</h1>
                    <img className={picture} src={img} alt="Что-то пошло не так."/>
                </div>
            );
        }
        return this.props.children
    }
}

export default ErrorBoundary
