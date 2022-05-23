<?php

namespace App\Controller;

use App\Repository\CartRepository;
use App\Repository\CategoryRepository;
use App\Repository\CustomerRepository;
use App\Repository\TransporteurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;


class ApiOrderController extends AbstractController
{
    public function __construct(CartRepository $cartR, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $this->cartR = $cartR;
        $this->serializer = $serializer;
        $this->em = $em;
    }
}
