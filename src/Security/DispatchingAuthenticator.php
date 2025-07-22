<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;

class DispatchingAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private readonly BddAuthenticator $bddAuthenticator,
        private readonly string $authMode,
    ) {
    }

    public function supports(Request $request): ?bool
    {
        return '/api/login' === $request->getPathInfo() && $request->isMethod('POST');
    }

    public function authenticate(Request $request): Passport
    {
        return match ($this->authMode) {
            'bdd' => $this->bddAuthenticator->authenticate($request),
            default => throw new \RuntimeException('Unknown auth mode'),
        };
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return match ($this->authMode) {
            'bdd' => $this->bddAuthenticator->onAuthenticationSuccess($request, $token, $firewallName),
            default => throw new \RuntimeException('Unknown auth mode'),
        };
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        return match ($this->authMode) {
            'bdd' => $this->bddAuthenticator->onAuthenticationFailure($request, $exception),
            default => throw new \RuntimeException('Unknown auth mode'),
        };
    }
}
