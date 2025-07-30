<?php

namespace App\Repository;

use App\Entity\AuditLog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AuditLog>
 */
class AuditLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AuditLog::class);
    }

    /**
     * @return AuditLog[]
     */
    public function findByEntity(object $entity): array
    {
        if (!method_exists($entity, 'getId')) {
            throw new \InvalidArgumentException('L\'entité fournie doit avoir une méthode getId().');
        }

        $entityClass = get_class($entity);
        $entityId = (string) $entity->getId();

        return $this->createQueryBuilder('log')
            ->where('log.entityClass = :class')
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

        return $this->createQueryBuilder('log')
            ->where('log.entityClass = :class')
            ->andWhere('log.entityId = :id')
            ->setParameter('class', get_class($entity))
            ->setParameter('id', (string) $entity->getId())
            ->orderBy('log.timestamp', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
