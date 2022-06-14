<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\CustomerRepository;
use App\Repository\MessageRepository;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;

class ApiMessageController extends AbstractController
{
    public function __construct(MessageRepository $messageRepo, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        $this->serializer = $serializer;
        $this->messageRepo = $messageRepo;
        $this->em = $em;
    }

    #[Route('/api/addCustomerResponse', methods: ['POST'], name: 'post_api_addResponse')]
    public function addCustomerResponse(Request $request, TicketRepository $ticketRepo, CustomerRepository $cr)
    {

        $jsonRecu = $request->getContent();

        try {

            $newMessage = $this->serializer->deserialize($jsonRecu, Message::class, 'json');
            $jsonDecode = json_decode($jsonRecu);

            $getTicket = $ticketRepo->findOneBy(array('id' => $jsonDecode->ticket));

            $newMessage->setTicket($getTicket)
                ->setSendAt(new \DateTimeImmutable('now'))
                ->setIsCustomer(true);

            $this->em->persist($newMessage);
            $this->em->flush();

            $oneCustomer = $cr->findOneBy(array('uuid' => $jsonDecode->customer));
            return $this->json($ticketRepo->findAllTicketAndMessage($oneCustomer->getId()), 200, [], ['groups' => 'ticket:read']);
        } catch (NotEncodableValueException $e) {

            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
