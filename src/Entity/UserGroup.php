<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Provider\GenericAuditEnricherProvider;
use App\Trait\AuditLoggableTrait;
use App\Validator\AlphanumericConstraint;
use App\Validator\GroupTimeWindowConstraint;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(security: "is_granted('VIEW_USER_GROUP', object)", provider: GenericAuditEnricherProvider::class),
        new GetCollection(security: "is_granted('VIEW_USER_GROUPS')", provider: GenericAuditEnricherProvider::class),
        new Post(security: "is_granted('ADD_USER_GROUP')"),
        new Patch(security: "is_granted('UPDATE_USER_GROUP', object)"),
    ],
    security: "is_granted('ROLE_USER')"
)]
#[ORM\Entity]
#[ORM\Table(name: '`user_group`')]
#[UniqueEntity('name')]
#[GroupTimeWindowConstraint]
class UserGroup
{
    use AuditLoggableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 32, unique: true)]
    #[Assert\Length(min: 5, max: 32)]
    #[AlphanumericConstraint]
    private string $name;

    #[ORM\Column(type: 'string', length: 32, nullable: true)]
    #[Assert\Length(max: 32)]
    #[AlphanumericConstraint]
    private ?string $targetIdentifier = null;

    #[ORM\Column(type: 'string', length: 20)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['none', 'establishment', 'service'])]
    private string $targetType = 'none';

    #[ORM\Column(type: 'boolean')]
    private bool $h24 = true;

    #[ORM\Column(name: 'time_from', type: 'string', length: 5, nullable: true)]
    #[Assert\Time(withSeconds: false)]
    private ?string $from = null;

    #[ORM\Column(name: 'time_to', type: 'string', length: 5, nullable: true)]
    #[Assert\Time(withSeconds: false)]
    private ?string $to = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getTargetIdentifier(): ?string
    {
        return $this->targetIdentifier;
    }

    public function setTargetIdentifier(?string $targetIdentifier): void
    {
        $this->targetIdentifier = $targetIdentifier;
    }

    public function getTargetType(): string
    {
        return $this->targetType;
    }

    public function setTargetType(string $targetType): void
    {
        $this->targetType = $targetType;
    }

    public function isH24(): bool
    {
        return $this->h24;
    }

    public function setH24(bool $h24): void
    {
        $this->h24 = $h24;
    }

    public function getFrom(): ?string
    {
        return $this->from;
    }

    public function setFrom(?string $from): void
    {
        $this->from = $from;
    }

    public function getTo(): ?string
    {
        return $this->to;
    }

    public function setTo(?string $to): void
    {
        $this->to = $to;
    }
}
