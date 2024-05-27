<?php
namespace App\Controller;

use App\Email\HelloEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mailer\Envelope;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;

class EmailController extends AbstractController
{
    public function __construct(
        private HelloEmail $helloEmail
    )
    {
        
    }

    #[Route('/api/email', name: 'api_email', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $this->helloEmail->send('arotcarena.ib@gmail.com',);

        return $this->json('ok');
    }
}