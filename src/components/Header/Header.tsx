import Button from '@components/Button/Button';
import { Cash } from '@assets/img';

import styles from './header.module.scss';

const Header = () => {
    return (
        <div className={styles.headerBar}>
            <Cash className={styles.logoMoney} />
            <Button>Login</Button>
        </div>
    );
};

export default Header;
