<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class FicheConstraints extends Constraint
{
    public string $noNestedChild = 'Une fiche enfant ne peut pas avoir elle-même un enfant.';
    public string $noChildIfArchived = 'Impossible d\'ajouter un enfant à une fiche archivée.';
    public string $noUnarchiveIfParentArchived = 'Impossible de désarchiver une fiche dont le parent est archivé.';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
