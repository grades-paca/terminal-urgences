<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource(operations: [new GetCollection()], security: "is_granted('ROLE_ADMIN')")]
class AuditLog
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private \DateTimeImmutable $timestamp;

    #[ORM\Column]
    private string $action;

    #[ORM\Column]
    private string $entityClass;

    #[ORM\Column(length: 64, nullable: true)]
    private ?string $entityId = null;

    /**
     * @var array<string, array{0: string|null, 1: string|null}>|null
     */
    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $changes = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getTimestamp(): \DateTimeImmutable
    {
        return $this->timestamp;
    }

    public function setTimestamp(\DateTimeImmutable $timestamp): void
    {
        $this->timestamp = $timestamp;
    }

    public function getAction(): string
    {
        return $this->action;
    }

    public function setAction(string $action): void
    {
        $this->action = $action;
    }

    public function getEntityClass(): string
    {
        return $this->entityClass;
    }

    public function setEntityClass(string $entityClass): void
    {
        $this->entityClass = $entityClass;
    }

    public function getEntityId(): ?string
    {
        return $this->entityId;
    }

    public function setEntityId(?string $entityId): void
    {
        $this->entityId = $entityId;
    }

    /**
     * @return array<string, array{0: string|null, 1: string|null}>|null
     */
    public function getChanges(): ?array
    {
        return $this->changes;
    }

    /**
     * @param array<string, array{0: string|null, 1: string|null}>|null $changes
     */
    public function setChanges(?array $changes): void
    {
        $this->changes = $changes;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): void
    {
        $this->user = $user;
    }
}
