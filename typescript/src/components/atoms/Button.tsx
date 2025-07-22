import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => (
    <button className={styles.button} {...props} />
);
