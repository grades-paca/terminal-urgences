<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Fiche;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/** @implements ProcessorInterface<Fiche, Fiche> */
final readonly class FicheDataPersister implements ProcessorInterface
{
    /**
     * @param ProcessorInterface<Fiche, Fiche> $persistProcessor
     */
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')] private ProcessorInterface $persistProcessor,
        private EntityManagerInterface $em,
    ) {
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = []): Fiche
    {
        $wasArchived = $this->em->getUnitOfWork()->getOriginalEntityData($data)['archived'] ?? false;
        if ($data->isArchived() && !$wasArchived) {
            foreach ($data->getChildren() as $child) {
                $child->setArchived(true);
                $this->em->persist($child);
            }
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
