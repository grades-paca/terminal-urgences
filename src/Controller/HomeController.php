<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route(
        path: '/{reactRouting}',
        name: 'app_home',
        requirements: ['reactRouting' => '^(?!api|build|_(profiler|wdt)).*'],
        defaults: ['reactRouting' => null]
    )]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}
