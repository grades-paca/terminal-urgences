<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller\Api;

use App\Tests\Support\FunctionalTester;
use Codeception\Util\HttpCode;

final class UserGroupCest
{
    public function _before(FunctionalTester $I): void
    {
        $I->authenticateAsTestUser($I);
    }

    public function getSingleUserGroups(FunctionalTester $I): void
    {
        $I->sendGET('/api/user_groups/1');
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseContainsJson([
            'name' => 'Administrateur',
            'targetType' => 'service',
            'h24' => true,
        ]);
    }

    public function getAllUserGroups(FunctionalTester $I): void
    {
        $I->sendGET('/api/user_groups');
        $I->seeResponseCodeIsSuccessful();

        $I->seeResponseJsonMatchesJsonPath('member');
        $I->seeResponseJsonMatchesJsonPath('member[3].name');
    }

    public function createValidGroup(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => 'TestGroupeUnique',
            'targetType' => 'service',
            'h24' => false,
            'from' => '09:00',
            'to' => '17:00',
        ]);

        $I->seeResponseCodeIs(HttpCode::CREATED);
        $I->seeResponseIsJson();

        $I->seeResponseContainsJson([
            'name' => 'TestGroupeUnique',
            'h24' => false,
            'from' => '09:00',
            'to' => '17:00',
        ]);
    }

    public function failOnDuplicateName(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => 'Administrateur',
            'targetType' => 'service',
            'h24' => true,
        ]);

        $I->seeResponseCodeIs(422); // Unprocessable Entity
        $I->seeResponseJsonMatchesJsonPath('violations');
        $I->seeResponseContains('"propertyPath":"name"');
    }

    public function patchUserGroups(FunctionalTester $I): void
    {
        $I->haveHttpHeader('Content-Type', 'application/merge-patch+json');

        $I->sendPATCH('/api/user_groups/2', [
            'h24' => false,
            'from' => '09:00',
            'to' => '17:00',
        ]);

        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseContains('"from":"09:00"');
    }

    public function failOnInvalidName(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => 'Adminis-!@#$',
            'targetType' => 'service',
            'h24' => true,
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseContains('"propertyPath":"name"');
    }

    public function failOnTooLongFields(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => str_repeat('A', 33),
            'targetIdentifier' => str_repeat('B', 33),
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseContains('"propertyPath":"name"');
        $I->seeResponseContains('"propertyPath":"targetIdentifier"');
    }

    public function failOnMissingTimeRange(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => 'TestMissingRange',
            'targetType' => 'service',
            'h24' => false,
            'from' => null,
            'to' => null,
        ]);

        $I->seeResponseCodeIs(HttpCode::UNPROCESSABLE_ENTITY);
        $I->seeResponseIsJson();

        $I->seeResponseContains('"propertyPath":"from"');
    }

    public function failOnInvalidTimeFormat(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => 'TestInvalidFormat',
            'targetType' => 'service',
            'h24' => false,
            'from' => '9h00',
            'to' => '17:00',
        ]);

        $I->seeResponseCodeIs(HttpCode::UNPROCESSABLE_ENTITY);
        $I->seeResponseIsJson();

        $I->seeResponseContains('"propertyPath":"from"');
    }

    public function failOnInvalidTargetType(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => 'TestInvalidType',
            'targetType' => 'invalid_type',
            'h24' => true,
        ]);

        $I->seeResponseCodeIs(HttpCode::UNPROCESSABLE_ENTITY);
        $I->seeResponseIsJson();

        $I->seeResponseContains('"propertyPath":"targetType"');
    }

    public function failOnOutOfRangeTime(FunctionalTester $I): void
    {
        $I->sendPOST('/api/user_groups', [
            'name' => 'TestOutOfRange',
            'targetType' => 'service',
            'h24' => false,
            'from' => '65:40',
            'to' => '11:95',
        ]);

        $I->seeResponseCodeIs(HttpCode::UNPROCESSABLE_ENTITY);
        $I->seeResponseIsJson();
        $I->seeResponseContains('"propertyPath":"from"');
    }
}
