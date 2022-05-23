<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220517203252 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE order_detail_order');
        $this->addSql('DROP TABLE order_detail_product');
        $this->addSql('ALTER TABLE order_detail ADD id_order_id INT DEFAULT NULL, ADD id_product_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE order_detail ADD CONSTRAINT FK_ED896F46DD4481AD FOREIGN KEY (id_order_id) REFERENCES `order` (id)');
        $this->addSql('ALTER TABLE order_detail ADD CONSTRAINT FK_ED896F46E00EE68D FOREIGN KEY (id_product_id) REFERENCES product (id)');
        $this->addSql('CREATE INDEX IDX_ED896F46DD4481AD ON order_detail (id_order_id)');
        $this->addSql('CREATE INDEX IDX_ED896F46E00EE68D ON order_detail (id_product_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE order_detail_order (order_detail_id INT NOT NULL, order_id INT NOT NULL, INDEX IDX_8C19CCAB64577843 (order_detail_id), INDEX IDX_8C19CCAB8D9F6D38 (order_id), PRIMARY KEY(order_detail_id, order_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE order_detail_product (order_detail_id INT NOT NULL, product_id INT NOT NULL, INDEX IDX_DCF554C864577843 (order_detail_id), INDEX IDX_DCF554C84584665A (product_id), PRIMARY KEY(order_detail_id, product_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE order_detail_order ADD CONSTRAINT FK_8C19CCAB64577843 FOREIGN KEY (order_detail_id) REFERENCES order_detail (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE order_detail_order ADD CONSTRAINT FK_8C19CCAB8D9F6D38 FOREIGN KEY (order_id) REFERENCES `order` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE order_detail_product ADD CONSTRAINT FK_DCF554C84584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE order_detail_product ADD CONSTRAINT FK_DCF554C864577843 FOREIGN KEY (order_detail_id) REFERENCES order_detail (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE order_detail DROP FOREIGN KEY FK_ED896F46DD4481AD');
        $this->addSql('ALTER TABLE order_detail DROP FOREIGN KEY FK_ED896F46E00EE68D');
        $this->addSql('DROP INDEX IDX_ED896F46DD4481AD ON order_detail');
        $this->addSql('DROP INDEX IDX_ED896F46E00EE68D ON order_detail');
        $this->addSql('ALTER TABLE order_detail DROP id_order_id, DROP id_product_id');
    }
}
