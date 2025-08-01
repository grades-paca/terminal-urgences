<?php

namespace App\Validator;

use App\Entity\Fiche;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class FicheConstraintsValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (!$value instanceof Fiche) {
            return;
        }

        if (!$constraint instanceof FicheConstraints) {
            return;
        }

        if (null !== $value->getConfiguration()?->getConfiguration()) {
            $this->context->buildViolation($constraint->noNestedChild)
                ->atPath('configuration')
                ->addViolation();
        }

        if ($value->getConfiguration() && $value->getConfiguration()->isArchived()) {
            $this->context->buildViolation($constraint->noChildIfArchived)
                ->atPath('configuration')
                ->addViolation();
        }

        if ($value->getConfiguration() && !$value->isArchived() && $value->getConfiguration()->isArchived()) {
            $this->context->buildViolation($constraint->noUnarchiveIfParentArchived)
                ->atPath('archived')
                ->addViolation();
        }
    }
}
