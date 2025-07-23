export interface ConstraintViolation {
    propertyPath: string;
    message: string;
    code?: string;
}

export interface ApiPlatformError {
    '@context': string;
    '@id': string;
    '@type': 'ConstraintViolation' | string;
    title: string;
    detail: string;
    status: number;
    type: string;
    description?: string;
    violations?: ConstraintViolation[];
    trace?: {
        file: string;
        line: number;
        function?: string;
        class?: string;
        type?: string;
    }[];
}

export interface HydraCollection<T> {
    '@context': string;
    '@id': string;
    '@type': string;
    member: T[];
    totalItems: number;
}

export interface UseCreateOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiPlatformError | Error) => void;
}

export function isApiPlatformError(error: unknown): error is ApiPlatformError {
    return (
        typeof error === 'object' &&
        error !== null &&
        '@type' in error &&
        (error as any)['@type'] === 'ConstraintViolation' &&
        Array.isArray((error as any).violations)
    );
}

