<?php

namespace App\Repository;

use App\Entity\AuditLog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\Proxy;

/**
 * @extends ServiceEntityRepository<AuditLog>
 */
class AuditLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AuditLog::class);
    }

    private function realClass(object $entity): string
    {
        return $entity instanceof Proxy ? (string) get_parent_class($entity) : $entity::class;
    }

    private function entityId(object $entity): string
    {
        $uow = $this->getEntityManager()->getUnitOfWork();
        $id = $uow->getSingleIdentifierValue($entity);

        if (null === $id) {
            throw new \InvalidArgumentException('Unidentified entity (not managed or null ID).');
        }

        return (string) $id;
    }

    /**
     * @return AuditLog[]
     */
    public function findByEntity(object $entity): array
    {
        if (!method_exists($entity, 'getId')) {
            throw new \InvalidArgumentException('Entity must have getId()');
        }

        $entityClass = $this->realClass($entity);
        $entityId = $this->entityId($entity);

        return $this->createQueryBuilder('log')
            ->andWhere('log.entityClass = :class')
            ->andWhere('log.entityId = :id')
            ->setParameter('class', $entityClass)
            ->setParameter('id', $entityId)
            ->orderBy('log.timestamp', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findLastLogForEntity(object $entity): ?AuditLog
    {
        if (!method_exists($entity, 'getId')) {
            throw new \InvalidArgumentException('Entity must have getId()');
        }

        $entityClass = $this->realClass($entity);
        $entityId = $this->entityId($entity);

        return $this->createQueryBuilder('log')
            ->andWhere('log.entityClass = :class')
            ->andWhere('log.entityId = :id')
            ->setParameter('class', $entityClass)
            ->setParameter('id', $entityId)
            ->orderBy('log.timestamp', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
