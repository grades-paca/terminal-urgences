<?php

namespace App\Provider;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\AuditLog;
use App\Repository\AuditLogRepository;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Contracts\Service\Attribute\Required;

/**
 * @implements ProviderInterface<object>
 */
class GenericAuditEnricherProvider implements ProviderInterface
{
    /**
     * @var ProviderInterface<object>
     */
    private ProviderInterface $itemProvider;

    /**
     * @var ProviderInterface<object>
     */
    private ProviderInterface $collectionProvider;

    public function __construct(
        private readonly AuditLogRepository $logRepository,
    ) {
    }

    /**
     * @param ProviderInterface<object> $provider
     */
    #[Required]
    public function setItemProvider(#[Autowire(service: 'api_platform.doctrine.orm.state.item_provider')] ProviderInterface $provider): void
    {
        $this->itemProvider = $provider;
    }

    /**
     * @param ProviderInterface<object> $provider
     */
    #[Required]
    public function setCollectionProvider(
        #[Autowire(service: 'api_platform.doctrine.orm.state.collection_provider')]
        ProviderInterface $provider,
    ): void {
        $this->collectionProvider = $provider;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $result = match (true) {
            $operation instanceof GetCollection => $this->collectionProvider->provide($operation, $uriVariables, $context),
            $operation instanceof Get => $this->itemProvider->provide($operation, $uriVariables, $context),
            default => null,
        };

        if ($operation instanceof GetCollection && is_iterable($result)) {
            foreach ($result as $entity) {
                $this->enrichEntityWithLastLog($entity);
            }
        }

        if ($operation instanceof Get && is_object($result)) {
            $this->enrichEntityWithAllLogs($result);
        }

        return $result;
    }

    private function enrichEntityWithLastLog(object $entity): void
    {
        if (!method_exists($entity, 'getId') || !method_exists($entity, 'setLogs')) {
            return;
        }

        $log = $this->logRepository->findLastLogForEntity($entity);
        $entity->setLogs($log ? [$this->formatLog($log)] : []);
    }

    private function enrichEntityWithAllLogs(object $entity): void
    {
        if (!method_exists($entity, 'getId') || !method_exists($entity, 'setLogs')) {
            return;
        }

        $logs = $this->logRepository->findByEntity($entity);
        $formattedLogs = array_map([$this, 'formatLog'], $logs);
        $entity->setLogs($formattedLogs);
    }

    /**
     * @return array{
     *      id: int,
     *      timestamp: \DateTimeInterface,
     *      action: string,
     *      entityClass: string,
     *      entityId: string,
     *      user: array{
     *          id: int,
     *          username: string
     *      }|null
     * }
     */
    private function formatLog(AuditLog $log): array
    {
        $user = $log->getUser();

        return [
            'id' => $log->getId(),
            'timestamp' => $log->getTimestamp(),
            'action' => $log->getAction(),
            'entityClass' => $log->getEntityClass(),
            'changes' => $log->getChanges(),
            'entityId' => $log->getEntityId(),
            'user' => $user ? [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
            ] : null,
        ];
    }
}
