<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Bezhanov\Faker\Provider\Device;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $faker->addProvider(new Device($faker));

        for ($i=0; $i < 100; $i++) { 
            $product = new Product;
            $product->setDesignation($faker->deviceModelName)
                    ->setDescription($faker->paragraph(10))
                    ->setBrand($faker->deviceManufacturer)
                    ->setPrice(random_int(100, 1000000))
                    ->setPicture($faker->imageUrl(500, 500, true))
                    ->setCreatedAt(new DateTimeImmutable())
                    ;
            $manager->persist($product);
        }
        $manager->flush();
    }
}
