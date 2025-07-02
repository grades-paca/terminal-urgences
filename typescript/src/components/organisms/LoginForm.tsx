import { Button } from '@atoms/Button';
import { InputField } from '@atoms/input/InputField';
import { useLogin } from '@services/auth/useLogin';
import { useMe } from '@services/auth/useMe';
import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
    const loginMutation = useLogin();
    const { data: user } = useMe();
    const navigate = useNavigate();
    const location = useLocation();

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

    return (
        <div className={styles.authBox}>
            {!user ? (
                <div className={styles.authContainer}>
                    <form onSubmit={handleLogin}>
                        <InputField
                            id="id"
                            type="text"
                            placeholder="Identifiant"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <InputField
                            id="password"
                            type="password"
                            placeholder="mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            id="submitButton"
                            data-testid="submitButton"
                            type="submit"
                            disabled={loginMutation.isPending}
                        >
                            ✓
                        </Button>
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
    );
};
