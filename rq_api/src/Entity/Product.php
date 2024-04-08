<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ProductRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['product:read:collection']],
            paginationClientItemsPerPage: true,
            paginationMaximumItemsPerPage: 30,
            order: ['createdAt' => 'DESC']
        ),
        new Get(
            normalizationContext: ['groups' => ['product:read:item']]
        ),
        new Put(),
        new Patch(),
        new Delete(),
        new Post()
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['designation' => 'partial'])]
#[ApiFilter(RangeFilter::class, properties: ['price'])]
#[ApiFilter(OrderFilter::class, properties: ['price', 'createdAt'])]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[Groups(['product:read:collection'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['product:read:item', 'product:read:collection'])]
    #[ORM\Column(length: 255)]
    private ?string $designation = null;

    #[Groups(['product:read:item'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[Groups(['product:read:item', 'product:read:collection'])]
    #[ORM\Column(length: 255)]
    private ?string $brand = null;

    #[Groups(['product:read:item', 'product:read:collection'])]
    #[ORM\Column]
    private ?int $price = null;

    #[Groups(['product:read:item', 'product:read:collection'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['product:read:item', 'product:read:collection'])]
    #[ORM\Column(length: 255)]
    private ?string $picture = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->picture = 'https://picsum.photos/500/500';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDesignation(): ?string
    {
        return $this->designation;
    }

    public function setDesignation(string $designation): static
    {
        $this->designation = $designation;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): static
    {
        $this->picture = $picture;

        return $this;
    }
}
