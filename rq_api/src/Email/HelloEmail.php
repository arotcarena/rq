<?php
namespace App\Email;

use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

class HelloEmail extends EmailFactory
{
    public function send(string $address)
    {
        $email = (new Email)
                ->from(new Address('ibayarobayaro@gmail.com', 'Bonjour'))
                ->to($address)
                ->subject('Symfony messenger test')
                ->text('Symfony messenger test')
                ->html('<p>Essai envoi email avec symfony messenger</p>')
                ;

        $this->sendEmail($email, 'gmail');
    }
}