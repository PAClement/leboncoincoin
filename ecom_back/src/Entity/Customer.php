<?php

namespace App\Entity;

use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: CustomerRepository::class)]
class Customer implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['customer:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['customer:read', 'customer:edit'])]
    #[Assert\NotBlank]
    private $name;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['customer:read', 'customer:edit'])]
    #[Assert\NotBlank]
    private $firstName;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['customer:read'])]
    #[Assert\NotBlank(message: "Une email est obligatoire")]
    #[Assert\Email(message: "Votre email n'est pas conforme")]
    private $email;

    #[ORM\Column(type: 'string', length: 100)]
    #[Groups(['customer:read'])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 8, minMessage: "Le mot de passe doit avoir au moins 8 caractères.")]
    #[Assert\Regex(pattern: "/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/", match: true, message: "Le mot de passe n'est pas conforme, au moins 1 majuscule, minuscule, 1 chiffre et 1 caractère spécial")]
    private $password;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['customer:read', 'customer:edit'])]
    #[Assert\NotBlank]
    private $address;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['customer:read', 'customer:edit'])]
    #[Assert\NotBlank]
    private $city;

    #[ORM\Column(type: 'string', length: 20)]
    #[Groups(['customer:read', 'customer:edit'])]
    #[Assert\NotBlank]
    private $postalCode;

    #[ORM\Column(type: 'string', length: 100)]
    #[Groups(['customer:read', 'customer:edit'])]
    #[Assert\NotBlank]
    #[Assert\Regex(pattern: "/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/", match: true, message: "Le format du téléphone n'est pas conforme")]
    private $tel;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\NotBlank]
    private $token;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['customer:read'])]
    #[Assert\NotBlank]
    private $createdAt;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['customer:read', 'customer:send'])]
    #[Assert\NotBlank]
    private $uuid;

    #[ORM\OneToMany(mappedBy: 'id_client', targetEntity: Message::class)]
    private $messages;

    #[ORM\OneToMany(mappedBy: 'id_client', targetEntity: Order::class)]
    private $orders;

    #[ORM\OneToMany(mappedBy: 'Customer', targetEntity: Cart::class, orphanRemoval: true)]
    private $carts;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->carts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): self
    {
        $this->tel = $tel;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): self
    {
        $this->uuid = $uuid;

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setIdClient($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getIdClient() === $this) {
                $message->setIdClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setClient($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getClient() === $this) {
                $order->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Cart>
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }

    public function addCart(Cart $cart): self
    {
        if (!$this->carts->contains($cart)) {
            $this->carts[] = $cart;
            $cart->setCustomer($this);
        }

        return $this;
    }

    public function removeCart(Cart $cart): self
    {
        if ($this->carts->removeElement($cart)) {
            // set the owning side to null (unless already changed)
            if ($cart->getCustomer() === $this) {
                $cart->setCustomer(null);
            }
        }

        return $this;
    }
}
