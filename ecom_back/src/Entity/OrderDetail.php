<?php

namespace App\Entity;

use App\Repository\OrderDetailRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderDetailRepository::class)]
class OrderDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Order::class, inversedBy: 'orderDetails')]
    private $order;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'orderDetails')]
    private $product;

    #[ORM\Column(type: 'float')]
    private $price;

    #[ORM\Column(type: 'integer')]
    private $quantity;

    public function __construct()
    {
        $this->order = new ArrayCollection();
        $this->product = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, order>
     */
    public function getOrder(): Collection
    {
        return $this->order;
    }

    public function addOrder(order $Order): self
    {
        if (!$this->order->contains($Order)) {
            $this->order[] = $Order;
        }

        return $this;
    }

    public function removeOrder(order $Order): self
    {
        $this->order->removeElement($Order);

        return $this;
    }

    /**
     * @return Collection<int, product>
     */
    public function getProduct(): Collection
    {
        return $this->product;
    }

    public function addProduct(product $Product): self
    {
        if (!$this->product->contains($Product)) {
            $this->product[] = $Product;
        }

        return $this;
    }

    public function removeProduct(product $Product): self
    {
        $this->product->removeElement($Product);

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }
}
