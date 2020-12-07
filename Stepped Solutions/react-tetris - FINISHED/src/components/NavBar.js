import React from 'react';
import s from './styles/NavBar.module.css';
import {NavLink} from "react-router-dom";

export function NavBar(props) {
    return (
        <div className={s.divNavContainer}>
            {props.authorized ?
                <div className={s.divNavElement}>
                    Wallet:{props.walletName}
                </div> : ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                    <NavLink to='/tetris' className={s.navRef}>
                        Tetris
                    </NavLink>
                </div> : ''
            }
            {props.authorized ? '' :
                <div className={s.divNavElement}>
                    <NavLink to="generate-wallet" className={s.navRef}>
                        Generate Wallet
                    </NavLink>
                </div>
            }
            {props.authorized ? '' :
                <div className={s.divNavElement}>
                    <NavLink to="load-wallet" className={s.navRef}>
                        Load Wallet
                    </NavLink>
                </div>
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                    <NavLink to="send" className={s.navRef}>
                        Send
                    </NavLink>
                </div>: ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                <NavLink to="history" className={s.navRef}>
                    History
                </NavLink>
                </div>: ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                Balance: {props.balance / 1e9} TFC
            </div>: ''
            }
            {props.authorized ?
                <div className={s.divNavElement}>
                    <button
                        onClick={props.logOutButtonClick}
                        className={s.logOutButton}>
                        LogOut
                    </button>
                </div>: ''
            }
        </div>
    );
}
