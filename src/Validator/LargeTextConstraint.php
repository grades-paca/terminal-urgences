<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class LargeTextConstraint extends Constraint
{
    public string $message = 'Le champ contient des caractères non autorisés.';

    public function validatedBy(): string
    {
        return static::class.'Validator';
    }
}
