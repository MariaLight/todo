import { NavLink } from 'react-router-dom';
import styles from '../../app.module.css';


export const ReturnButton = () => {
    return (
        <NavLink className={styles.return__btn} key="main" to='/'>На главную</NavLink>
    )
}