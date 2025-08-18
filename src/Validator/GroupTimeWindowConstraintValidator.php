<?php

namespace App\Validator;

use App\Entity\UserGroup;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class GroupTimeWindowConstraintValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$value instanceof UserGroup) {
            return;
        }

        if (!$constraint instanceof GroupTimeWindowConstraint) {
            return;
        }

        if (true === $value->isH24()) {
            return;
        }

        $from = $value->getFrom();
        $to = $value->getTo();

        if (empty($from) || empty($to)) {
            if (empty($from)) {
                $this->context->buildViolation($constraint->missingRangeMessage)->atPath('from')->addViolation();
            }
            if (empty($to)) {
                $this->context->buildViolation($constraint->missingRangeMessage)->atPath('to')->addViolation();
            }
        }
    }
}
