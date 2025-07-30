<?php

namespace App\Trait;

use ApiPlatform\Metadata\ApiProperty;

trait AuditLoggableTrait
{
    /**
     * @var array<int, array{
     *     '@id': string,
     *     '@type': string,
     *     id: int,
     *     timestamp: string,
     *     action: string,
     *     entityClass: string,
     *     entityId: string,
     *     changes: array<string, array{0: string|null, 1: string|null}>,
     *     user: string
     * }> | null
     */
    #[ApiProperty(readable: true, writable: false)]
    private ?array $logs = null;

    /**
     * @return array<int, array{'@id': string, '@type': string, id: int, timestamp: string, action: string, entityClass: string, entityId: string, changes: array<string, array{0: string|null, 1: string|null}>, user: string}>|null $logs
     */
    public function getLogs(): ?array
    {
        return $this->logs;
    }

    /**
     * @param array<int, array{'@id': string, '@type': string, id: int, timestamp: string, action: string, entityClass: string, entityId: string, changes: array<string, array{0: string|null, 1: string|null}>, user: string}>|null $logs
     */
    public function setLogs(?array $logs): void
    {
        $this->logs = $logs;
    }
}
