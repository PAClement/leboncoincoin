<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220601152501 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F94113CAB');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F99DED506');
        $this->addSql('DROP INDEX IDX_B6BD307F94113CAB ON message');
        $this->addSql('DROP INDEX IDX_B6BD307F99DED506 ON message');
        $this->addSql('ALTER TABLE message ADD client_id INT DEFAULT NULL, ADD employee_id INT DEFAULT NULL, DROP id_client_id, DROP id_employee_id');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F19EB6921 FOREIGN KEY (client_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F8C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F19EB6921 ON message (client_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F8C03F15C ON message (employee_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F19EB6921');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F8C03F15C');
        $this->addSql('DROP INDEX IDX_B6BD307F19EB6921 ON message');
        $this->addSql('DROP INDEX IDX_B6BD307F8C03F15C ON message');
        $this->addSql('ALTER TABLE message ADD id_client_id INT DEFAULT NULL, ADD id_employee_id INT DEFAULT NULL, DROP client_id, DROP employee_id');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F94113CAB FOREIGN KEY (id_employee_id) REFERENCES employee (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F99DED506 FOREIGN KEY (id_client_id) REFERENCES customer (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F94113CAB ON message (id_employee_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F99DED506 ON message (id_client_id)');
    }
}
