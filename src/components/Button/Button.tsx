import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
    const buttonClass = classNames(
        styles.button,
        className
    );

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
