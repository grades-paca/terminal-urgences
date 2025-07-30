<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250730070638 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            CREATE TABLE audit_log (
                id INT AUTO_INCREMENT NOT NULL,
                user_id INT DEFAULT NULL,
                timestamp DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)',
                action VARCHAR(255) NOT NULL,
                entity_class VARCHAR(255) NOT NULL,
                entity_id VARCHAR(64) DEFAULT NULL,
                changes JSON DEFAULT NULL COMMENT '(DC2Type:json)',
                INDEX IDX_F6E1C0F5A76ED395 (user_id), PRIMARY KEY(id)
           ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE audit_log ADD CONSTRAINT FK_F6E1C0F5A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            ALTER TABLE audit_log DROP FOREIGN KEY FK_F6E1C0F5A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE audit_log
        SQL);
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
