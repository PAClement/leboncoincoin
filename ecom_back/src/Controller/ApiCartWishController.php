<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\Wishlist;
use App\Repository\CartRepository;
use App\Repository\CustomerRepository;
use App\Repository\ProductRepository;
use App\Repository\WishlistRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class ApiCartWishController extends AbstractController
{
    public function __construct(CartRepository $cartR, ProductRepository $pr, CustomerRepository $cr, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $this->cartR = $cartR;
        $this->pr = $pr;
        $this->cr = $cr;
        $this->serializer = $serializer;
        $this->em = $em;
    }

    /**
     * Cart
     */

    #[Route('/api/addCart', methods: ['POST'], name: 'post_api_addCart')]
    public function addCart(Request $request)
    {
        $jsonRecu = $request->getContent();

        try {
            $addCart = $this->serializer->deserialize($jsonRecu, Cart::class, 'json');
            $dataDecode = json_decode($jsonRecu);

            $oneCustomer = $this->cr->findOneBy(array('uuid' => $dataDecode->customer));
            $oneProduct = $this->pr->findOneBy(array('id' => $dataDecode->product));

            $findProduct = $this->cartR->findOneBy(array('product' => $dataDecode->product, 'Customer' => $oneCustomer->getId())); // Si le produit + customer exist dans la bdd

            if ($findProduct) {
                //Permet d'ajouter ou de retirer la quantité d'un produit
                $newAddition = $dataDecode->quantity < $findProduct->getQuantity() ? $findProduct->setQuantity($findProduct->getQuantity() - 1) : $findProduct->setQuantity($findProduct->getQuantity() + 1);

                $this->em->persist($newAddition);
                $this->em->flush();

                return $this->json($this->cartR->findBy(array('Customer' => $oneCustomer->getId())), 200, [], ['groups' => 'cart:read']);
            }

            $addCart->setProduct($oneProduct)->setQuantity($dataDecode->quantity)->setCustomer($oneCustomer);

            $this->em->persist($addCart);
            $this->em->flush();

            return $this->json(['status' => 201]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/cartList/{user}', methods: ['GET'], name: 'get_api_cartList')]
    public function cartList(int $user)
    {

        $oneCustomer = $this->cr->findOneBy(array('uuid' => $user));
        return $this->json($this->cartR->findBy(array('Customer' => $oneCustomer->getId())), 200, [], ['groups' => 'cart:read']);
    }

    #[Route('/api/delete/{product}/{customer}', methods: ['DELETE'], name: 'api_del_oneCart')]
    public function delCart(string $product, string $customer)
    {

        try {

            $oneCustomer = $this->cr->findOneBy(array('uuid' => $customer));

            $findProduct = $this->cartR->findOneBy(array('product' => $product, 'Customer' => $oneCustomer->getId()));

            $this->em->remove($findProduct);
            $this->em->flush();

            return $this->json($this->cartR->findBy(array('Customer' => $oneCustomer->getId())), 200, [], ['groups' => 'cart:read']);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }


    /**
     * WISHLIST
     */

    #[Route('/api/addWishlist', methods: ['POST'], name: 'post_api_addWishlist')]
    public function addWishlist(Request $request, WishlistRepository $wish)
    {

        $jsonRecu = $request->getContent();

        try {

            $addWishlist = $this->serializer->deserialize($jsonRecu, Wishlist::class, 'json');
            $dataDecode = json_decode($jsonRecu);

            $oneCustomer = $this->cr->findOneBy(array('uuid' => $dataDecode->customer));
            $oneProduct = $this->pr->findOneBy(array('id' => $dataDecode->product));

            $findProductWishlist = $wish->findOneBy(array('product' => $dataDecode->product, 'customer' => $oneCustomer->getId())); // Si le produit + customer exist dans la bdd

            if ($findProductWishlist) {

                return $this->json(['status' => 'exist']);
            }

            $addWishlist->setProduct($oneProduct)->setCustomer($oneCustomer);

            $this->em->persist($addWishlist);
            $this->em->flush();

            return $this->json(['status' => 201]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/userWishlist/{user}', methods: ['GET'], name: 'get_api_userWishlist')]
    public function userWishlist(int $user, WishlistRepository $wish)
    {

        $oneCustomer = $this->cr->findOneBy(array('uuid' => $user));
        return $this->json($wish->findBy(array('customer' => $oneCustomer->getId())), 200, [], ['groups' => 'wishlist:read']);
    }

    #[Route('/api/deleteWishlist/{product}/{customer}', methods: ['DELETE'], name: 'api_del_deleteWishlist')]
    public function delWishlist(string $product, string $customer, WishlistRepository $wish)
    {

        try {

            $oneCustomer = $this->cr->findOneBy(array('uuid' => $customer));

            $findWishProduct = $wish->findOneBy(array('product' => $product, 'customer' => $oneCustomer->getId()));

            $this->em->remove($findWishProduct);
            $this->em->flush();

            return $this->json($wish->findBy(array('customer' => $oneCustomer->getId())), 200, [], ['groups' => 'wishlist:read']);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
