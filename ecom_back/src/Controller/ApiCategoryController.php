<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ApiCategoryController extends AbstractController
{
    public function __construct(CategoryRepository $categoryRepo, SerializerInterface $serializer)
    {
        $this->categoryRepo = $categoryRepo;
        $this->serializer = $serializer;
    }

    #[Route('/api/category', methods: ['GET'], name: 'get_api_Allcategory')]
    public function categoryGet()
    {
        return $this->json($this->categoryRepo->findAll(), 200, [], ['groups' => 'category:read']);
    }
}
