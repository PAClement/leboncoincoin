<?php

namespace App\Controller;

use App\Repository\TransporteurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiTransporteurController extends AbstractController
{
    #[Route('/api/transporteur', methods: ['GET'], name: 'get_api_transporteur')]
    public function index(TransporteurRepository $tr): Response
    {

        return $this->json($tr->findAll(), 200, [], ['groups' => 'transporteur:read']);
    }
}
