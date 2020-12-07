import React from 'react';
import s from './styles/NavBar.module.css';
import {NavLink} from "react-router-dom";

export function NavBar(props) {
    return (
        <div className={s.divNavContainer}>
            {props.authorized ?
                <div className={s.divNavElement}>
                    {props.walletName}
                </div> : ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                    <a href='/tetris' className={s.navRef}>
                        Tetris
                    </a>
                </div> : ''
            }
            {props.authorized ? '' :
                <div className={s.divNavElement}>
                    <a href="generate-wallet" className={s.navRef}>
                        Generate Wallet
                    </a>
                </div>
            }
            {props.authorized ? '' :
                <div className={s.divNavElement}>
                    <a href="load-wallet" className={s.navRef}>
                        Load Wallet
                    </a>
                </div>
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                    <a href="send" className={s.navRef}>
                        Send
                    </a>
                </div>: ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                <a href="history" className={s.navRef}>
                    History
                </a>
                </div>: ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                Balance: {props.balance}
            </div>: ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                    <button
                        onClick={ () => props.setAuthorized(false)}
                        className={s.logOutButton}>
                        LogOut
                    </button>
                </div>: ''
            }
        </div>
    );
}
