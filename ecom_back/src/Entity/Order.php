<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups('order:read')]
    private $id;

    #[ORM\Column(type: 'string', length: 25)]
    #[Groups('order:read')]
    private $state;

    #[ORM\Column(type: 'string', length: 25)]
    #[Groups('order:read')]
    private $mode;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups('order:read')]
    private $date;

    #[ORM\ManyToOne(targetEntity: Customer::class, inversedBy: 'orders')]
    private $client;

    #[ORM\ManyToOne(targetEntity: Transporteur::class, inversedBy: 'orders')]
    #[Groups('order:read')]
    private $transporteur;

    #[ORM\OneToMany(targetEntity: OrderDetail::class, mappedBy: 'order')]
    #[Groups('order:read')]
    private $orderDetails;

    public function __construct()
    {
        $this->orderDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getMode(): ?string
    {
        return $this->mode;
    }

    public function setMode(string $mode): self
    {
        $this->mode = $mode;

        return $this;
    }

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getClient(): ?customer
    {
        return $this->client;
    }

    public function setClient(?customer $client): self
    {
        $this->client = $client;

        return $this;
    }

    public function getTransporteur(): ?transporteur
    {
        return $this->transporteur;
    }

    public function setTransporteur(?transporteur $transporteur): self
    {
        $this->transporteur = $transporteur;

        return $this;
    }

    /**
     * @return Collection<int, OrderDetail>
     */
    public function getOrderDetails(): Collection
    {
        return $this->orderDetails;
    }

    // public function addOrderDetail(OrderDetail $orderDetail): self
    // {
    //     if (!$this->orderDetails->contains($orderDetail)) {
    //         $this->orderDetails[] = $orderDetail;
    //         $orderDetail->addOrder($this);
    //     }

    //     return $this;
    // }

    // public function removeOrderDetail(OrderDetail $orderDetail): self
    // {
    //     if ($this->orderDetails->removeElement($orderDetail)) {
    //         $orderDetail->removeOrder($this);
    //     }

    //     return $this;
    // }
}
