<?php
namespace App\Email;

use Symfony\Component\Mailer\Envelope;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

class EmailFactory
{
    public function __construct(
        private MailerInterface $mailer
    )
    {
    }

    public function sendEmail(Email $email, string $senderAccount = null)
    {
        if($senderAccount)
        {
            $email->getHeaders()->addTextHeader('X-Transport', $senderAccount);
        }
        $this->mailer->send($email);
    }

 

}