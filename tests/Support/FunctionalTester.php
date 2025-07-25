<?php

declare(strict_types=1);

namespace App\Tests\Support;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * Inherited Methods.
 *
 * @method void wantTo($text)
 * @method void wantToTest($text)
 * @method void execute($callable)
 * @method void expectTo($prediction)
 * @method void expect($prediction)
 * @method void amGoingTo($argumentation)
 * @method void am($role)
 * @method void lookForwardTo($achieveValue)
 * @method void comment($description)
 * @method void pause($vars = [])
 *
 * @SuppressWarnings(PHPMD)
 */
class FunctionalTester extends \Codeception\Actor
{
    use _generated\FunctionalTesterActions;

    public function authenticateAsTestUser(FunctionalTester $I): void
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

        $I->haveHttpHeader('Content-Type', 'application/ld+json');
        $I->sendPOST('/api/login', [
            'username' => 'test',
            'password' => 'testpass',
        ]);
        $I->seeResponseCodeIs(200);

        $token = $I->grabDataFromResponseByJsonPath('$.token')[0] ?? null;
        $I->haveHttpHeader('Authorization', 'Bearer '.$token);
    }
}
