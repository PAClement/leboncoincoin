<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['product:read', 'cart:read', 'order:read', 'wishlist:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['product:read', 'cart:read', 'order:read', 'wishlist:read'])]
    private $name;

    #[ORM\Column(type: 'string', length: 25)]
    #[Groups(['product:read', 'cart:read', 'order:read', 'wishlist:read'])]
    private $ref;

    #[ORM\Column(type: 'text')]
    #[Groups(['product:read'])]
    private $description;

    #[ORM\Column(type: 'integer')]
    #[Groups(['product:read', 'cart:read', 'wishlist:read'])]
    private $quantity;

    #[ORM\Column(type: 'float')]
    #[Groups(['product:read', 'cart:read', 'wishlist:read'])]
    private $price;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['product:read', 'cart:read', 'order:read', 'wishlist:read'])]
    private $photo;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'products')]
    #[Groups(['product:read', 'cart:read'])]
    private $category;

    #[ORM\ManyToOne(targetEntity: Marque::class, inversedBy: 'products')]
    #[Groups(['product:read', 'cart:read'])]
    private $marque;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Wishlist::class)]
    private $wishlists;

    public function __construct()
    {
        $this->orderDetails = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->wishlists = new ArrayCollection();
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

    public function getRef(): ?string
    {
        return $this->ref;
    }

    public function setRef(string $ref): self
    {
        $this->ref = $ref;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getCategory(): ?category
    {
        return $this->category;
    }

    public function setCategory(?category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getMarque(): ?marque
    {
        return $this->marque;
    }

    public function setMarque(?marque $marque): self
    {
        $this->marque = $marque;

        return $this;
    }

    /**
     * @return Collection<int, Wishlist>
     */
    public function getWishlists(): Collection
    {
        return $this->wishlists;
    }

    public function addWishlist(Wishlist $wishlist): self
    {
        if (!$this->wishlists->contains($wishlist)) {
            $this->wishlists[] = $wishlist;
            $wishlist->setProduct($this);
        }

        return $this;
    }

    public function removeWishlist(Wishlist $wishlist): self
    {
        if ($this->wishlists->removeElement($wishlist)) {
            // set the owning side to null (unless already changed)
            if ($wishlist->getProduct() === $this) {
                $wishlist->setProduct(null);
            }
        }

        return $this;
    }
}
