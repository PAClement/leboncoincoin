<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class ApiCustomerController extends AbstractController
{

    public function __construct(CustomerRepository $cr, EntityManagerInterface $em, ValidatorInterface $validator, SerializerInterface $serializer, UserPasswordHasherInterface $passwordHash)
    {
        $this->cr = $cr;
        $this->em = $em;
        $this->serializer = $serializer;
        $this->passwordHash = $passwordHash;
        $this->validate = $validator;
    }


    #[Route('/api/customer', methods: ['GET'], name: 'get_api_customer')]
    public function index(): Response
    {

        return $this->json($this->cr->findAll(), 200, [], ['groups' => 'customer:read']);
    }

    #[Route('/api/oneCustomer/{uuid}', methods: ['GET'], name: 'get_api_oneCustomer')]
    public function oneCusomter(string $uuid): Response
    {

        return $this->json($this->cr->findOneBy(array('uuid' => $uuid)), 200, [], ['groups' => 'customer:read']);
    }

    #[Route('/api/customer_connexion', methods: ['POST'], name: 'connexion_api_customer')]
    public function connexion(Request $request)
    {

        $jsonRecu = $request->getContent();

        try {

            $connexion_customer = $this->serializer->deserialize($jsonRecu, Customer::class, 'json');

            $userActif = $this->cr->findOneBy(array('email' => $connexion_customer->getEmail()));

            if (!$userActif || !$this->passwordHash->isPasswordValid($userActif, $connexion_customer->getPassword())) {

                return $this->json("Email ou mot de passe incorret");
            }

            return $this->json($userActif, 201, [], ['groups' => 'customer:send']); // Return informations of user if inscription is ok
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/customer', methods: ['POST'], name: 'post_api_customer')]
    public function auth(Request $request)
    {

        $jsonRecu = $request->getContent();

        try {

            $auth_customer = $this->serializer->deserialize($jsonRecu, Customer::class, 'json');

            $emailExist = $this->cr->findBy(array('email' => $auth_customer->getEmail()));

            if (count($emailExist) > 0) {

                return $this->json("Cette email est déjà utilisée");
            }

            $auth_customer->setCreatedAt(new \DateTime('now', new \DateTimeZone('Europe/Berlin')));
            $auth_customer->setToken("token_" . rand());
            $auth_customer->setUuid(rand());

            $errors = $this->validate->validate($auth_customer); // valid with assert on entity class

            if (count($errors) > 0) { // if validate function give an error
                return $this->json($errors);
            }

            $auth_customer->setPassword($this->passwordHash->hashPassword(
                $auth_customer,
                $auth_customer->getPassword()
            ));

            $this->em->persist($auth_customer);
            $this->em->flush();

            return $this->json($auth_customer, 201, [], ['groups' => 'customer:send']); // Return informations of user if inscription is ok
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('/api/customer_edit', methods: ['PUT'], name: 'put_api_customer')]
    public function editCustomer(Request $request, ManagerRegistry $doctrine)
    {
        $jsonRecu = $request->getContent();

        try {
            $edit_customer = $this->serializer->deserialize($jsonRecu, Customer::class, 'json');

            $entityManager = $doctrine->getManager();
            $user = $entityManager->getRepository(Customer::class)->findOneBy(array('uuid' => $edit_customer->getUuid()));

            if (!$user) {

                return $this->json([
                    'status' => 400,
                    'message' => "Une erreur est survenue"
                ], 400);
            }

            $user->setName($edit_customer->getName());
            $user->setFirstName($edit_customer->getFirstName());
            $user->setAddress($edit_customer->getAddress());
            $user->setCity($edit_customer->getCity());
            $user->setPostalCode($edit_customer->getPostalCode());
            $user->setTel($edit_customer->getTel());

            $entityManager->flush();

            // return $this->json($edit_customer, 201, [], ['groups' => 'customer:edit']); // Return informations of user if inscription is ok
            return $this->json("Vos informations ont bien été modifiées");
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
