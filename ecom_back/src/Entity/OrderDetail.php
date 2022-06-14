<?php

namespace App\Entity;

use App\Repository\OrderDetailRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderDetailRepository::class)]
class OrderDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups('order:read')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Order::class, inversedBy: 'orderDetails')]
    private $order;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'orderDetails')]
    #[Groups('order:read')]
    private $product;

    #[ORM\Column(type: 'float')]
    #[Groups('order:read')]
    private $price;

    #[ORM\Column(type: 'integer')]
    #[Groups('order:read')]
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
    public function getOrder()
    {
        return $this->order;
    }

    public function setOrder($order)
    {

        $this->order = $order;

        return $this;
    }

    /**
     * @return Collection<int, product>
     */
    public function getProduct()
    {
        return $this->product;
    }

    public function setProduct($product)
    {

        $this->product = $product;
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
