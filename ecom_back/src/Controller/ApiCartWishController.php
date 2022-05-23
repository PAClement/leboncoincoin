<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Repository\CartRepository;
use App\Repository\CustomerRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class ApiCartWishController extends AbstractController
{
    public function __construct(CartRepository $cartR, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $this->cartR = $cartR;
        $this->serializer = $serializer;
        $this->em = $em;
    }

    #[Route('/api/addCart', methods: ['POST'], name: 'post_api_addCart')]
    public function addCart(Request $request, ProductRepository $pr, CustomerRepository $cr)
    {
        $jsonRecu = $request->getContent();

        try {
            $addCart = $this->serializer->deserialize($jsonRecu, Cart::class, 'json');
            $dataDecode = json_decode($jsonRecu);

            $oneCustomer = $cr->findOneBy(array('uuid' => $dataDecode->customer));
            $oneProduct = $pr->findOneBy(array('id' => $dataDecode->product));

            $findProduct = $this->cartR->findOneBy(array('product' => $dataDecode->product, 'Customer' => $oneCustomer->getId())); // Si le produit + customer exist dans la bdd

            if ($findProduct) {

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
    public function cartList(int $user, CustomerRepository $cr)
    {

        $oneCustomer = $cr->findOneBy(array('uuid' => $user));
        return $this->json($this->cartR->findBy(array('Customer' => $oneCustomer->getId())), 200, [], ['groups' => 'cart:read']);
    }

    #[Route('/api/delete/{product}/{customer}', methods: ['DELETE'], name: 'api_del_oneCart')]
    public function delCart(CustomerRepository $cr, string $product, string $customer)
    {

        try {

            $oneCustomer = $cr->findOneBy(array('uuid' => $customer));

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
}
