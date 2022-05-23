<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ApiProductController extends AbstractController
{
    public function __construct(ProductRepository $pr, SerializerInterface $serializer)
    {
        $this->pr = $pr;
        $this->serializer = $serializer;
    }

    #[Route('/api/product', methods: ['GET'], name: 'get_api_product')]
    public function index(): Response
    {

        return $this->json($this->pr->findAll(), 200, [], ['groups' => 'product:read']);
    }

    #[Route('/api/oneProduct/{id}', methods: ['GET'], name: 'get_api_oneProduct')]
    public function getOneProduct(int $id): Response
    {

        return $this->json($this->pr->findOneBy(array('id' => $id)), 200, [], ['groups' => 'product:read']);
    }
}
