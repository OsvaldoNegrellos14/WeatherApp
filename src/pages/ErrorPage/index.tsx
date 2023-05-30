import { useRouteError, Link } from 'react-router-dom'
import styles from './index.module.css'

export const ErrorPage = () => {
    const error: unknown = useRouteError()

    return (
        <div className={styles.errorPage}>
            <h1 className={styles.titleError}>Oops!</h1>
            <p className={styles.subtitleError}>Sorry, an unexpected error has occurred.</p>
            <p className={styles.description}>
                <i>"{(error as Error)?.message || (error as { statusText?: string })?.statusText}"</i>
            </p>
            <Link to='/'>
                <p className={styles.link}>
                    Go to Home
                </p>
            </Link>
        </div>
    )
}