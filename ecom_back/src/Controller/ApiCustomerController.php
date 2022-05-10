<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiCustomerController extends AbstractController
{

    #[Route('/api/customer', methods: ['GET'], name: 'get_api_customer')]
    public function index(CustomerRepository $customer): Response
    {

        return $this->json($customer->findAll(), 200, [], ['groups' => 'customer:read']);
    }

    #[Route('/api/customer', methods: ['POST'], name: 'post_api_customer')]
    public function auth(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator)
    {

        $jsonRecu = $request->getContent();

        try {
            $auth_customer = $serializer->deserialize($jsonRecu, Customer::class, 'json');

            $auth_customer->setCreatedAt(new \DateTime());

            $errors = $validator->validate($auth_customer); // valid with assert on entity class

            if (count($errors) > 0) { // if validate function give an error
                return $this->json($errors, 400);
            }

            $em->persist($auth_customer);
            $em->flush();

            return $this->json($auth_customer, 201, [], ['groups' => 'customer:read']); // Return informations of user if inscription is ok
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
