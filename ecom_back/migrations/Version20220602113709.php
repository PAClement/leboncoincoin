<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220602113709 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ticket (id INT AUTO_INCREMENT NOT NULL, customer_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_97A0ADA39395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA39395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F19EB6921');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F8C03F15C');
        $this->addSql('DROP INDEX IDX_B6BD307F8C03F15C ON message');
        $this->addSql('DROP INDEX IDX_B6BD307F19EB6921 ON message');
        $this->addSql('ALTER TABLE message ADD ticket_id INT DEFAULT NULL, DROP client_id, DROP employee_id, DROP type');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F700047D2 FOREIGN KEY (ticket_id) REFERENCES ticket (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F700047D2 ON message (ticket_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F700047D2');
        $this->addSql('DROP TABLE ticket');
        $this->addSql('DROP INDEX IDX_B6BD307F700047D2 ON message');
        $this->addSql('ALTER TABLE message ADD employee_id INT DEFAULT NULL, ADD type VARCHAR(20) NOT NULL, CHANGE ticket_id client_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F19EB6921 FOREIGN KEY (client_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F8C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F8C03F15C ON message (employee_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F19EB6921 ON message (client_id)');
    }
}
