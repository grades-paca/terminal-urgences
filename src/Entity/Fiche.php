<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\DataPersister\FicheDataPersister;
use App\Provider\GenericAuditEnricherProvider;
use App\Trait\AuditLoggableTrait;
use App\Validator\AlphanumericConstraint;
use App\Validator\FicheConstraints;
use App\Validator\LargeTextConstraint;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(security: "is_granted('VIEW_FICHE', object)", provider: GenericAuditEnricherProvider::class),
        new Post(security: "is_granted('ADD_FICHE', object)"),
        new Patch(security: "is_granted('UPDATE_FICHE', object)", processor: FicheDataPersister::class),
        new GetCollection(security: "is_granted('VIEW_FICHES', object)", provider: GenericAuditEnricherProvider::class),
    ],
    security: "is_granted('ROLE_USER')"
)]
#[ORM\Entity]
#[UniqueEntity('idTerme')]
#[FicheConstraints]
class Fiche
{
    use AuditLoggableTrait;

    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 32)]
    #[Assert\Length(min: 5, max: 32)]
    #[AlphanumericConstraint]
    private string $id;

    #[ORM\Column(type: 'string', length: 32, unique: true)]
    #[Assert\Length(min: 5, max: 32)]
    #[AlphanumericConstraint]
    private string $idTerme;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Assert\Length(max: 255)]
    #[LargeTextConstraint]
    private ?string $description = null;

    #[ORM\Column(type: 'string', length: 32, nullable: true)]
    #[Assert\Length(max: 32)]
    #[AlphanumericConstraint]
    private ?string $importation = null;

    #[ORM\ManyToOne(targetEntity: Fiche::class)]
    private ?Fiche $configuration = null;

    /** @var Collection<int, Fiche> */
    #[ORM\OneToMany(targetEntity: Fiche::class, mappedBy: 'configuration')]
    #[ApiProperty(readable: false, writable: false)]
    private Collection $children;

    #[ORM\Column(type: 'boolean', nullable: false)]
    private bool $archived = false;

    public function __construct()
    {
        $this->children = new ArrayCollection();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    public function getIdTerme(): string
    {
        return $this->idTerme;
    }

    public function setIdTerme(string $idTerme): void
    {
        $this->idTerme = $idTerme;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getImportation(): ?string
    {
        return $this->importation;
    }

    public function setImportation(?string $importation): void
    {
        $this->importation = $importation;
    }

    public function getConfiguration(): ?Fiche
    {
        return $this->configuration;
    }

    public function setConfiguration(?Fiche $configuration): void
    {
        $this->configuration = $configuration;
    }

    public function isArchived(): bool
    {
        return $this->archived;
    }

    public function setArchived(bool $archived): void
    {
        $this->archived = $archived;
    }

    /** @return Collection<int, Fiche> */
    public function getChildren(): Collection
    {
        return $this->children;
    }
}
