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

export interface ApiPlatformResource {
    '@context': string;
    '@id': string;
    '@type': string;
}

export type ApiPlatformResponse<T> = ApiPlatformResource & T;

export interface HydraCollection<T> {
    '@context': string;
    '@id': string;
    '@type': string;
    member: T[];
    totalItems: number;
}

export function isApiPlatformError(error: unknown): error is ApiPlatformError {
    return (
        typeof error === 'object' &&
        error !== null &&
        '@type' in error &&
        error['@type'] === 'ConstraintViolation' &&
        'violations' in error &&
        Array.isArray(error['violations'])
    );
}
