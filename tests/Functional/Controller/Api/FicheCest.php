<?php

namespace App\Tests\Functional\Controller\Api;

use App\Tests\Support\FunctionalTester;

class FicheCest
{
    public function _before(FunctionalTester $I): void
    {
        $I->authenticateAsTestUser($I);
    }

    public function getSingleFiche(FunctionalTester $I): void
    {
        $I->sendGET('/api/fiches/FICHE001');
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseContainsJson([
            'id' => 'FICHE001',
            'idTerme' => 'TERME001',
            'description' => 'Description de test',
            'importation' => 'IMPORT001',
        ]);
    }

    public function getAllFiches(FunctionalTester $I): void
    {
        $I->sendGET('/api/fiches');
        $I->seeResponseCodeIsSuccessful();

        $I->seeResponseJsonMatchesJsonPath('member');
        $I->seeResponseJsonMatchesJsonPath('member[2].idTerme');
    }

    public function createValidFiche(FunctionalTester $I): void
    {
        $I->sendPOST('/api/fiches', [
            'id' => 'FICHE999',
            'idTerme' => 'UNIQUE999',
            'description' => 'Nouvelle fiche de test',
            'importation' => 'IMPORT999',
            'configuration' => '/api/fiches/FICHE002',
        ]);

        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseContainsJson([
            'id' => 'FICHE999',
            'idTerme' => 'UNIQUE999',
            'configuration' => '/api/fiches/FICHE002',
        ]);
    }

    public function failOnDuplicateIdTerme(FunctionalTester $I): void
    {
        $I->sendPOST('/api/fiches', [
            'id' => 'FICHE998',
            'idTerme' => 'TERME001',
            'description' => 'Duplication',
            'importation' => 'IMPORT998',
        ]);

        $I->seeResponseCodeIs(422); // Unprocessable Entity
        $I->seeResponseJsonMatchesJsonPath('violations');
        $I->seeResponseContains('"propertyPath":"idTerme"');
    }

    public function patchFiche(FunctionalTester $I): void
    {
        $I->haveHttpHeader('Content-Type', 'application/merge-patch+json');

        $I->sendPATCH('/api/fiches/FICHE003', [
            'description' => 'Mise à jour description',
        ]);

        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseContains('"description":"Mise à jour description"');
    }

    public function failOnInvalidId(FunctionalTester $I): void
    {
        $I->sendPOST('/api/fiches', [
            'id' => 'FICHE-!@#$', // non alphanumérique
            'idTerme' => 'INVALID1',
            'description' => 'Test',
            'importation' => null,
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseContains('"propertyPath":"id"');
    }

    public function failOnTooLongFields(FunctionalTester $I): void
    {
        $I->sendPOST('/api/fiches', [
            'id' => str_repeat('A', 33),
            'idTerme' => str_repeat('B', 33),
            'description' => str_repeat('C', 300),
            'importation' => str_repeat('D', 33),
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseContains('"propertyPath":"id"');
        $I->seeResponseContains('"propertyPath":"idTerme"');
        $I->seeResponseContains('"propertyPath":"description"');
        $I->seeResponseContains('"propertyPath":"importation"');
    }
}
