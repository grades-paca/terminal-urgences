<?php

namespace App\Tests\Functional\Controller\Api;

use App\Entity\User;
use App\Tests\Support\FunctionalTester;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserControllerCest
{
    public function _before(FunctionalTester $I): void
    {
        $container = $I->grabService('test.service_container');
        $em = $container->get(EntityManagerInterface::class);
        $hasher = $container->get(UserPasswordHasherInterface::class);

        $user = $em->getRepository(User::class)->findOneBy(['username' => 'test']);
        if (!$user) {
            $user = new User();
            $user->setUsername('test');
            $user->setRoles(['ROLE_USER']);
            $user->setPassword($hasher->hashPassword($user, 'testpass'));
            $em->persist($user);
            $em->flush();
        }
    }

    public function testMeEndpointReturnsUserData(FunctionalTester $I): void
    {
        $I->haveHttpHeader('Content-Type', 'application/json');

        $I->sendPOST('/api/login', [
            'username' => 'test',
            'password' => 'testpass',
        ]);

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesJsonType([
            'token' => 'string',
        ]);

        $token = $I->grabDataFromResponseByJsonPath('$.token')[0] ?? null;
        $I->haveHttpHeader('Authorization', 'Bearer '.$token);

        $I->sendGET('/api/me');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(['username' => 'test']);
        $I->seeResponseMatchesJsonType([
            'id' => 'integer',
            'username' => 'string',
            'roles' => 'array',
        ]);
    }

    public function testMeEndpointUnauthorizedWithoutToken(FunctionalTester $I): void
    {
        $I->haveHttpHeader('Accept', 'application/json');
        $I->sendGET('/api/me');
        $I->seeResponseCodeIs(401);
    }

    public function _after(FunctionalTester $I): void
    {
        $container = $I->grabService('test.service_container');
        $em = $container->get(EntityManagerInterface::class);

        $user = $em->getRepository(User::class)->findOneBy(['username' => 'test']);
        if ($user) {
            $em->remove($user);
            $em->flush();
        }
    }
}
