<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\OrderDetail;
use App\Repository\CartRepository;
use App\Repository\CustomerRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\TransporteurRepository;
use App\Repository\WishlistRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;


class ApiOrderController extends AbstractController
{
    public function __construct(CartRepository $cartR, CustomerRepository $cr, TransporteurRepository $tr, ProductRepository $pr, OrderRepository $or, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $this->cartR = $cartR;
        $this->cr = $cr;
        $this->tr = $tr;
        $this->pr = $pr;
        $this->or = $or;
        $this->serializer = $serializer;
        $this->em = $em;
    }

    #[Route('/api/createOrder', methods: ['POST'], name: 'post_api_createOrder')]
    public function createOrder(Request $request, WishlistRepository $wishRepo)
    {
        $jsonRecu = $request->getContent();

        try {


            $createOrder = $this->serializer->deserialize($jsonRecu, Order::class, 'json');
            $dataDecode = json_decode($jsonRecu);

            $oneCustomer = $this->cr->findOneBy(array('uuid' => $dataDecode->customer));
            $transporteur = $this->tr->findOneBy(array('name' => $dataDecode->transporteur));

            $createOrder->setClient($oneCustomer)
                ->setTransporteur($transporteur)
                ->setState("En préparation")
                ->setDate(new DateTimeImmutable('now'));

            $cartCustomer = $this->cartR->findBy(array('Customer' => $oneCustomer->getId()));

            $this->em->persist($createOrder);
            $this->em->flush();

            $currentOrder = $this->or->findOneBy(array('id' => $createOrder->getId())); // recupération de la commande grâce à l'id fournie par la base

            for ($i = 0; $i < count($cartCustomer); $i++) {

                $orderDetail = new OrderDetail;

                $currentProduct = $this->pr->findOneBy(array('id' => $cartCustomer[$i]->getProduct()->getId()));
                $currentWish = $wishRepo->findOneBy(array('customer' => $oneCustomer->getId(), 'product' => $currentProduct->getId()));

                if ($currentWish) {

                    $this->em->remove($currentWish);
                    $this->em->flush();
                }

                $currentProduct->setQuantity($currentProduct->getQuantity() - $cartCustomer[$i]->getQuantity());

                $orderDetail->setQuantity($cartCustomer[$i]->getQuantity())
                    ->setPrice($currentProduct->getPrice())
                    ->setProduct($cartCustomer[$i]->getProduct())
                    ->setOrder($currentOrder);

                $this->em->persist($currentProduct);
                $this->em->persist($orderDetail);
                $this->em->remove($cartCustomer[$i]);
                $this->em->flush();
            }

            return $this->json(['status' => 201]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
    #[Route('/api/userOrder/{user}', methods: ['GET'], name: 'post_api_userOrder')]
    public function userOrder(int $user)
    {
        $oneCustomer = $this->cr->findOneBy(array('uuid' => $user));
        return $this->json($this->or->findBy(array('client' => $oneCustomer->getId())), 200, [], ['groups' => 'order:read']);
    }
}
