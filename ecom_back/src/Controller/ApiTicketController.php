<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\Ticket;
use App\Repository\CustomerRepository;
use App\Repository\TicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

class ApiTicketController extends AbstractController
{
    public function __construct(TicketRepository $ticketRepo, CustomerRepository $cr, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        $this->serializer = $serializer;
        $this->ticketRepo = $ticketRepo;
        $this->em = $em;
        $this->cr = $cr;
    }

    #[Route('/api/newTicket', methods: ['POST'], name: 'post_api_newTicket')]
    public function newTicket(Request $request, CustomerRepository $cr)
    {

        $jsonRecu = $request->getContent();

        try {

            $newTicket = $this->serializer->deserialize($jsonRecu, Ticket::class, 'json');
            $dataDecode = json_decode($jsonRecu);

            $oneCustomer = $cr->findOneBy(array('uuid' => $dataDecode->customer));

            $newTicket->setCustomer($oneCustomer)->setCreatedAt(new \DateTimeImmutable('now'));

            $this->em->persist($newTicket);
            $this->em->flush();

            $currentTicket = $this->ticketRepo->findOneBy(array('id' => $newTicket->getId()));

            $messageTicket = new Message;

            $messageTicket->setTicket($currentTicket)
                ->setMessage($dataDecode->message)
                ->setSendAt(new \DateTimeImmutable('now'))
                ->setIsCustomer(true);

            $this->em->persist($messageTicket);
            $this->em->flush();

            return $this->json(['status' => 201, 'id' => $newTicket->getId()]);
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    #[Route('api/getTicket/{user}', methods: ['GET'], name: 'api_get_Ticket')]
    public function getTicket(int $user)
    {

        $oneCustomer = $this->cr->findOneBy(array('uuid' => $user));

        return $this->json($this->ticketRepo->findAllTicketAndMessage($oneCustomer->getId()), 200, [], ['groups' => 'ticket:read']);
    }
}
