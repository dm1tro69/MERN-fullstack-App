import React from 'react';
import './Button.css'
import {Link} from "react-router-dom";

const Button = ({href, size, inverse, danger, children, to, disabled, onClick}) => {
    if (href){
        return (
            <a className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${danger && 'button--danger'}`} href={href}>
                {children}
            </a>
        )
    }
    if (to){
        return (
            <Link
                className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${danger && 'button--danger'}`}
                to={to}
            >
                {children}
            </Link>
        )
    }
    return (
        <button className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${danger && 'button--danger'}`}
                disabled={disabled}
                onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
