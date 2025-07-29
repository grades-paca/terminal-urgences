<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250718124125 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add fiche table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            CREATE TABLE fiche (id VARCHAR(32) NOT NULL, configuration_id VARCHAR(32) DEFAULT NULL, id_terme VARCHAR(32) NOT NULL,
            description VARCHAR(255) DEFAULT NULL, importation VARCHAR(32) DEFAULT NULL, UNIQUE INDEX UNIQ_4C13CC7892F3CB10 (id_terme),
             INDEX IDX_4C13CC7873F32DD8 (configuration_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL
        );
        $this->addSql(<<<'SQL'
            ALTER TABLE fiche ADD CONSTRAINT FK_4C13CC7873F32DD8 FOREIGN KEY (configuration_id) REFERENCES fiche (id)
        SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<'SQL'
            ALTER TABLE fiche DROP FOREIGN KEY FK_4C13CC7873F32DD8
        SQL
        );
        $this->addSql(<<<'SQL'
            DROP TABLE fiche
        SQL
        );
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
