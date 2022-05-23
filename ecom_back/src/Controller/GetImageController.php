<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetImageController extends AbstractController
{
    #[Route('/get/image/{utils}/{fileName}', name: 'app_get_image')]
    public function index(string $utils, string $fileName): Response
    {

        $photo = '../public/assets/img/' . $utils . '/' . $fileName . '';
        $response = new BinaryFileResponse($photo);

        return $response;
    }
}
