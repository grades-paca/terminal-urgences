<?php

namespace App\Subscriber;

use App\Entity\AuditLog;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\SecurityBundle\Security;

#[AsDoctrineListener(event: Events::postPersist)]
#[AsDoctrineListener(event: Events::postUpdate)]
#[AsDoctrineListener(event: Events::postRemove)]
readonly class AuditLogSubscriber
{
    public function __construct(
        private Security $security,
        private EntityManagerInterface $em,
    ) {
    }

    /**
     * @return array<string>
     */
    public function getSubscribedEvents(): array
    {
        return [Events::postPersist, Events::postUpdate, Events::postRemove];
    }

    /**
     * @param LifecycleEventArgs<ObjectManager> $args
     */
    public function postPersist(LifecycleEventArgs $args): void
    {
        $this->log('create', $args);
    }

    /**
     * @param LifecycleEventArgs<ObjectManager> $args
     */
    public function postUpdate(LifecycleEventArgs $args): void
    {
        $this->log('update', $args);
    }

    /**
     * @param LifecycleEventArgs<ObjectManager> $args
     */
    public function postRemove(LifecycleEventArgs $args): void
    {
        $this->log('delete', $args);
    }

    /**
     * @param LifecycleEventArgs<ObjectManager> $args
     */
    private function log(string $action, LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();
        if ($entity instanceof AuditLog || $entity instanceof User) {
            return;
        }

        $log = new AuditLog();
        $log->setTimestamp(new \DateTimeImmutable());
        $log->setAction($action);
        $log->setEntityClass(get_class($entity));
        $log->setEntityId($entity->getId());

        if ($this->security->getUser() instanceof User) {
            $log->setUser($this->security->getUser());
        }

        if ('update' === $action) {
            $uow = $this->em->getUnitOfWork();
            $changes = $uow->getEntityChangeSet($entity);
            $log->setChanges($changes);
        }

        $this->em->persist($log);
        $this->em->flush();
    }
}
