<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class AlphanumericConstraintValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof AlphanumericConstraint) {
            return;
        }

        if (!is_string($value)) {
            return;
        }

        if (!preg_match('/^[a-zA-Z0-9]*$/', $value)) {
            $this->context->buildViolation($constraint->message)->addViolation();
        }
    }
}
