<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 20)]
    private $type;

    #[ORM\Column(type: 'text')]
    private $message;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $precedant_id;

    #[ORM\ManyToOne(targetEntity: Customer::class, inversedBy: 'messages')]
    private $id_client;

    #[ORM\ManyToOne(targetEntity: Employee::class, inversedBy: 'messages')]
    private $id_employee;

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

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getPrecedantId(): ?int
    {
        return $this->precedant_id;
    }

    public function setPrecedantId(?int $precedant_id): self
    {
        $this->precedant_id = $precedant_id;

        return $this;
    }

    public function getIdClient(): ?customer
    {
        return $this->id_client;
    }

    public function setIdClient(?customer $id_client): self
    {
        $this->id_client = $id_client;

        return $this;
    }

    public function getIdEmployee(): ?employee
    {
        return $this->id_employee;
    }

    public function setIdEmployee(?employee $id_employee): self
    {
        $this->id_employee = $id_employee;

        return $this;
    }
}
