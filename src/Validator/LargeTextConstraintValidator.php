<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class LargeTextConstraintValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$constraint instanceof LargeTextConstraint) {
            return;
        }

        if (null === $value || '' === $value) {
            return; // Champ nullable
        }

        if (!is_string($value)) {
            return;
        }

        $pattern = '/^[\p{L}0-9\s.,;:!?\'"()\[\]{}\-_\/\\\\@#€%&+=]*$/u';

        if (!preg_match($pattern, $value)) {
            $this->context->buildViolation($constraint->message)->addViolation();
        }
    }
}
