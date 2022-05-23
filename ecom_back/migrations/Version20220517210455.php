<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220517210455 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F52993987E96AC2C');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F529939899DED506');
        $this->addSql('DROP INDEX IDX_F52993987E96AC2C ON `order`');
        $this->addSql('DROP INDEX IDX_F529939899DED506 ON `order`');
        $this->addSql('ALTER TABLE `order` ADD client_id INT DEFAULT NULL, ADD transporteur_id INT DEFAULT NULL, DROP id_client_id, DROP id_transporteur_id');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F529939819EB6921 FOREIGN KEY (client_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F529939897C86FA4 FOREIGN KEY (transporteur_id) REFERENCES transporteur (id)');
        $this->addSql('CREATE INDEX IDX_F529939819EB6921 ON `order` (client_id)');
        $this->addSql('CREATE INDEX IDX_F529939897C86FA4 ON `order` (transporteur_id)');
        $this->addSql('ALTER TABLE order_detail DROP FOREIGN KEY FK_ED896F46DD4481AD');
        $this->addSql('ALTER TABLE order_detail DROP FOREIGN KEY FK_ED896F46E00EE68D');
        $this->addSql('DROP INDEX IDX_ED896F46E00EE68D ON order_detail');
        $this->addSql('DROP INDEX IDX_ED896F46DD4481AD ON order_detail');
        $this->addSql('ALTER TABLE order_detail ADD order_id INT DEFAULT NULL, ADD product_id INT DEFAULT NULL, DROP id_order_id, DROP id_product_id');
        $this->addSql('ALTER TABLE order_detail ADD CONSTRAINT FK_ED896F468D9F6D38 FOREIGN KEY (order_id) REFERENCES `order` (id)');
        $this->addSql('ALTER TABLE order_detail ADD CONSTRAINT FK_ED896F464584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('CREATE INDEX IDX_ED896F468D9F6D38 ON order_detail (order_id)');
        $this->addSql('CREATE INDEX IDX_ED896F464584665A ON order_detail (product_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F529939819EB6921');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F529939897C86FA4');
        $this->addSql('DROP INDEX IDX_F529939819EB6921 ON `order`');
        $this->addSql('DROP INDEX IDX_F529939897C86FA4 ON `order`');
        $this->addSql('ALTER TABLE `order` ADD id_client_id INT DEFAULT NULL, ADD id_transporteur_id INT DEFAULT NULL, DROP client_id, DROP transporteur_id');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993987E96AC2C FOREIGN KEY (id_transporteur_id) REFERENCES transporteur (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F529939899DED506 FOREIGN KEY (id_client_id) REFERENCES customer (id)');
        $this->addSql('CREATE INDEX IDX_F52993987E96AC2C ON `order` (id_transporteur_id)');
        $this->addSql('CREATE INDEX IDX_F529939899DED506 ON `order` (id_client_id)');
        $this->addSql('ALTER TABLE order_detail DROP FOREIGN KEY FK_ED896F468D9F6D38');
        $this->addSql('ALTER TABLE order_detail DROP FOREIGN KEY FK_ED896F464584665A');
        $this->addSql('DROP INDEX IDX_ED896F468D9F6D38 ON order_detail');
        $this->addSql('DROP INDEX IDX_ED896F464584665A ON order_detail');
        $this->addSql('ALTER TABLE order_detail ADD id_order_id INT DEFAULT NULL, ADD id_product_id INT DEFAULT NULL, DROP order_id, DROP product_id');
        $this->addSql('ALTER TABLE order_detail ADD CONSTRAINT FK_ED896F46DD4481AD FOREIGN KEY (id_order_id) REFERENCES `order` (id)');
        $this->addSql('ALTER TABLE order_detail ADD CONSTRAINT FK_ED896F46E00EE68D FOREIGN KEY (id_product_id) REFERENCES product (id)');
        $this->addSql('CREATE INDEX IDX_ED896F46E00EE68D ON order_detail (id_product_id)');
        $this->addSql('CREATE INDEX IDX_ED896F46DD4481AD ON order_detail (id_order_id)');
    }
}
