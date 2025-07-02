import { InputHTMLAttributes } from 'react';
import styles from './InputField.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputField = (props: InputFieldProps) => (
    <input className={styles.input} {...props} />
);
