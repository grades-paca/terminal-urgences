<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250814091043 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            CREATE TABLE `user_group` (
                id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(32) NOT NULL,
                target_identifier VARCHAR(32) DEFAULT NULL,
                target_type VARCHAR(20) NOT NULL,
                h24 TINYINT(1) NOT NULL,
                time_from VARCHAR(5) DEFAULT NULL,
                time_to VARCHAR(5) DEFAULT NULL,
                UNIQUE INDEX UNIQ_8F02BF9D5E237E06 (name),
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            DROP TABLE `user_group`
        SQL);
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
