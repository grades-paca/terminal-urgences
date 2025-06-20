<?php

namespace App\Tests\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserControllerTest extends WebTestCase
{
    private EntityManagerInterface $em;
    private UserPasswordHasherInterface $passwordHasher;

    protected function setUp(): void
    {
        self::bootKernel();

        $this->em = static::getContainer()->get(EntityManagerInterface::class);
        $this->passwordHasher = static::getContainer()->get(UserPasswordHasherInterface::class);

        $this->createTestUser();
    }

    private function createTestUser(): void
    {
        $existing = $this->em->getRepository(User::class)->findOneBy(['username' => 'test']);
        if ($existing) return;

        $user = new User();
        $user->setUsername('test');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($this->passwordHasher->hashPassword($user, 'testpass'));

        $this->em->persist($user);
        $this->em->flush();
    }

    private function createAuthenticatedClient(): array
    {
        self::ensureKernelShutdown();
        $client = static::createClient();

        $client->request('POST', '/api/login', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'username' => 'test',
            'password' => 'testpass',
        ]));

        $data = json_decode($client->getResponse()->getContent(), true);

        return [
            'client' => $client,
            'token' => $data['token'] ?? null,
        ];
    }

    public function testMeEndpointReturnsUserData(): void
    {
        ['client' => $client, 'token' => $token] = $this->createAuthenticatedClient();

        $client->request('GET', '/api/me', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseFormatSame('json');

        $data = json_decode($client->getResponse()->getContent(), true);

        $this->assertArrayHasKey('id', $data);
        $this->assertSame('test', $data['username']);
        $this->assertArrayHasKey('roles', $data);
    }

    public function testMeEndpointUnauthorizedWithoutToken(): void
    {
        self::ensureKernelShutdown();
        $client = static::createClient();
        $client->request('GET', '/api/me');

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    protected function tearDown(): void
    {
        $em = static::getContainer()->get(EntityManagerInterface::class);
        $user = $em->getRepository(User::class)->findOneBy(['username' => 'test']);
        if ($user) {
            $em->remove($user);
            $em->flush();
        }

        parent::tearDown();
    }
}
