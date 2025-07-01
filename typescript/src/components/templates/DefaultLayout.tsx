import { useLogin } from '@features/auth/useLogin';
import { useMe } from '@features/auth/useMe';
import { Navigation } from '@organisms/Navigation';
import { FormEvent, ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import styles from './DefaultLayout.module.scss';

interface DefaultLayoutProps {
    children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: user, isLoading } = useMe();
    const loginMutation = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ username, password });
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');

        if (location.pathname === '/') {
            window.location.reload();
        } else {
            navigate('/');
        }
    };

    if (isLoading) return <div>Chargement...</div>;

    return (
        <div className={styles.defaultLayout}>
            <header>
                <div className={styles.headerTopBar}>
                    <div className={styles.tilteContainer}>
                        <div className={styles.logoContainer}>
                            <Link to="/">
                                <div className={styles.logo}></div>
                            </Link>
                        </div>
                        <div className={styles.title}>
                            Terminal des Urgences
                        </div>
                    </div>

                    <div className={styles.authBox}>
                        {!user ? (
                            <div className={styles.authContainer}>
                                <form onSubmit={handleLogin}>
                                    {/*TODO COMPONENT Atoms*/}
                                    <input
                                        id="id"
                                        type="text"
                                        placeholder="Identifiant"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    {/*TODO COMPONENT Atoms*/}
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="mot de passe"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    {/*TODO COMPONENT Atoms*/}
                                    <button
                                        id="submitButton"
                                        data-testid="submitButton"
                                        type="submit"
                                        disabled={loginMutation.isPending}
                                    >
                                        ✓
                                    </button>
                                </form>

                                {loginMutation.isError && (
                                    <div className={styles.errorMessage}>
                                        {(loginMutation.error as Error)
                                            ?.message || 'Erreur inconnue'}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={styles.userInfo}>
                                <span>
                                    Connecté en tant que {user.username}
                                </span>
                                <button onClick={handleLogout}>
                                    Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <Navigation />
            </header>

            <main>{children}</main>
        </div>
    );
};
