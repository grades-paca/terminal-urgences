<?php

namespace App\Security\Voter;

use App\Entity\UserGroup;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

/**
 * @extends Voter<string, UserGroup>
 */
class UserGroupVoter extends Voter
{
    protected function supports(string $attribute, mixed $subject): bool
    {
        // TODO Manage access feature auth
        return in_array($attribute, ['VIEW_USER_GROUP', 'ADD_USER_GROUP', 'UPDATE_USER_GROUP', 'VIEW_USER_GROUPS']);
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
