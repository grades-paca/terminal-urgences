<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class GroupTimeWindowConstraint extends Constraint
{
    public string $missingRangeMessage = 'Les champs "de" et "à" doivent être renseignés lorsque h24 est désactivé.';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
