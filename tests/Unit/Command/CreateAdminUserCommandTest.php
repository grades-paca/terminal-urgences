<?php

namespace App\Tests\Unit\Command;

use App\Command\CreateAdminUserCommand;
use App\Entity\User;
use Codeception\Test\Unit;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CreateAdminUserCommandTest extends Unit
{
    private function createCommandTester(
        ?EntityManagerInterface $em = null,
        ?UserPasswordHasherInterface $hasher = null,
        ?ContainerBagInterface $params = null,
    ): CommandTester {
        $em ??= $this->createMock(EntityManagerInterface::class);
        $hasher ??= $this->createMock(UserPasswordHasherInterface::class);
        $params ??= $this->createMock(ContainerBagInterface::class);

        $command = new CreateAdminUserCommand($em, $hasher, $params);
        $application = new Application();
        $application->add($command);

        return new CommandTester($application->find('app:create-admin'));
    }

    public function testFailsWithoutEnvVars(): void
    {
        $params = $this->createMock(ContainerBagInterface::class);
        $params->method('get')
            ->willReturnMap([
                ['admin.username', null],
                ['admin.password', null],
            ]);

        $tester = $this->createCommandTester(null, null, $params);
        $exitCode = $tester->execute([]);

        $this->assertEquals(Command::FAILURE, $exitCode);
        $this->assertStringContainsString('Les variables ADMIN_USERNAME et ADMIN_PASSWORD doivent être définies.', $tester->getDisplay());
    }

    public function testCreatesNewUser(): void
    {
        $params = $this->createMock(ContainerBagInterface::class);
        $params->method('get')
            ->willReturnMap([
                ['admin.username', 'admin'],
                ['admin.password', 'secret'],
            ]);

        $repo = $this->createMock(EntityRepository::class);
        $repo->method('findOneBy')->willReturn(null);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->method('getRepository')->willReturn($repo);
        $em->expects($this->once())->method('persist');
        $em->expects($this->once())->method('flush');

        $hasher = $this->createMock(UserPasswordHasherInterface::class);
        $hasher->method('hashPassword')->willReturn('hashed_password');

        $tester = $this->createCommandTester($em, $hasher, $params);
        $exitCode = $tester->execute([]);

        $this->assertEquals(Command::SUCCESS, $exitCode);
        $this->assertStringContainsString('Création d’un nouvel utilisateur admin.', $tester->getDisplay());
        $this->assertStringContainsString('Admin admin configuré avec succès.', $tester->getDisplay());
    }

    public function testUpdatesExistingUserWithConfirmation(): void
    {
        $user = new User();
        $user->setUsername('admin');

        $params = $this->createMock(ContainerBagInterface::class);
        $params->method('get')->willReturnMap([
            ['admin.username', 'admin'],
            ['admin.password', 'new_secret'],
        ]);

        $repo = $this->createMock(EntityRepository::class);
        $repo->method('findOneBy')->willReturn($user);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->method('getRepository')->willReturn($repo);
        $em->expects($this->once())->method('persist')->with($user);
        $em->expects($this->once())->method('flush');

        $hasher = $this->createMock(UserPasswordHasherInterface::class);
        $hasher->method('hashPassword')->willReturn('new_hashed_password');

        $tester = $this->createCommandTester($em, $hasher, $params);
        $tester->setInputs(['yes']);

        $exitCode = $tester->execute([]);

        $this->assertEquals(Command::SUCCESS, $exitCode);
        $this->assertStringContainsString('Mise à jour de l’utilisateur existant.', $tester->getDisplay());
    }

    public function testSkipsUpdateOnNegativeConfirmation(): void
    {
        $user = new User();
        $user->setUsername('admin');

        $params = $this->createMock(ContainerBagInterface::class);
        $params->method('get')->willReturnMap([
            ['admin.username', 'admin'],
            ['admin.password', 'ignored_password'],
        ]);

        $repo = $this->createMock(EntityRepository::class);
        $repo->method('findOneBy')->willReturn($user);

        $em = $this->createMock(EntityManagerInterface::class);
        $em->method('getRepository')->willReturn($repo);

        $tester = $this->createCommandTester($em, null, $params);
        $tester->setInputs(['no']);

        $exitCode = $tester->execute([]);

        $this->assertEquals(Command::SUCCESS, $exitCode);
        $this->assertStringContainsString('Aucun changement effectué.', $tester->getDisplay());
    }
}
