import { useLogin, useMe } from '@features/auth/useAuth';
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
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <div className={styles.logoContainer}>
                        <Link to="/">
                            <div className={styles.logo}></div>
                        </Link>
                    </div>
                    <div className={styles.title}>Terminal des Urgences</div>
                </div>

                <div className={styles.authBox}>
                    {!user ? (
                        <div className={styles.authContainer}>
                            <form onSubmit={handleLogin}>
                                {/*TODO COMPONENT*/}
                                <input
                                    id="id"
                                    type="text"
                                    placeholder="Identifiant"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                {/*TODO COMPONENT*/}
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="mot de passe"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {/*TODO COMPONENT*/}
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
                                    {(loginMutation.error as Error)?.message ||
                                        'Erreur inconnue'}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.userInfo}>
                            <span>Connecté en tant que {user.username}</span>
                            <button onClick={handleLogout}>Déconnexion</button>
                        </div>
                    )}
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
};
