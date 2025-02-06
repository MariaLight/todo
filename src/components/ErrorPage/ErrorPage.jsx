import styles from './error.module.css';
import { ReturnButton } from '../ReturnButton/ReturnButton';

export const ErrorPage = () => {
    return (
        <>
            <div class={styles.content}>
                Такой страницы нет
            </div>
            <ReturnButton />

        </>
    );
}
