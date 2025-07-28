<?php

namespace App\Security\Voter;

use App\Entity\Fiche;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

/**
 * @extends Voter<string, Fiche>
 */
class FicheVoter extends Voter
{
    protected function supports(string $attribute, mixed $subject): bool
    {
        // TODO Manage access feature auth
        return in_array($attribute, ['VIEW_FICHE', 'ADD_FICHE', 'UPDATE_FICHE', 'VIEW_FICHES']);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        // TODO Manage access feature auth

        $user = $token->getUser();
        if (!is_object($user)) {
            return false;
        }

        return true;
    }
}
