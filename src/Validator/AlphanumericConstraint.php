<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class AlphanumericConstraint extends Constraint
{
    public string $message = 'Ce champ doit être alphanumérique strict (a-z, A-Z, 0-9)';
}
