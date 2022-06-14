<?php

namespace App\Entity;

use App\Repository\TicketRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TicketRepository::class)]
class Ticket
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['ticket:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['ticket:read'])]
    private $type;

    #[ORM\ManyToOne(targetEntity: Customer::class, inversedBy: 'tickets')]
    private $customer;

    #[ORM\OneToMany(mappedBy: 'ticket', targetEntity: Message::class)]
    #[Groups(['ticket:read'])]
    private $historical;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['ticket:read'])]
    private $createdAt;

    public function __construct()
    {
        $this->historical = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getHistorical(): Collection
    {
        return $this->historical;
    }

    public function addHistorical(Message $historical): self
    {
        if (!$this->historical->contains($historical)) {
            $this->historical[] = $historical;
            $historical->setTicket($this);
        }

        return $this;
    }

    public function removeHistorical(Message $historical): self
    {
        if ($this->historical->removeElement($historical)) {
            // set the owning side to null (unless already changed)
            if ($historical->getTicket() === $this) {
                $historical->setTicket(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
