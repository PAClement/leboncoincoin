<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Entity\Customer;
use App\Entity\Employee;
use App\Entity\Marque;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\Role;
use App\Entity\Transporteur;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;


class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $routeBuilder = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($routeBuilder->setController(CategoryCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Ecom Back');
    }

    public function configureMenuItems(): iterable
    {

        return [

            yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home'),

            yield MenuItem::section('Order'),
            yield MenuItem::linkToCrud('Orders', 'fa-solid fa-store', Order::class),

            yield MenuItem::section('Utils'),
            yield MenuItem::linkToCrud('Category', 'fas fa-list', Category::class),
            yield MenuItem::linkToCrud('Marque', 'fa-solid fa-code-branch', Marque::class),
            yield MenuItem::linkToCrud('Transporteur', 'fa-solid fa-truck-fast', Transporteur::class),
            yield MenuItem::linkToCrud('Product', 'fa-solid fa-box-open', Product::class),

            yield MenuItem::section('Users'),
            yield MenuItem::linkToCrud('Customers', 'fa-solid fa-users', Customer::class),
            yield MenuItem::linkToCrud('Employee', 'fa-solid fa-user-shield', Employee::class),
            yield MenuItem::linkToCrud('Role', 'fa-solid fa-screwdriver-wrench', Role::class),
            // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);
        ];
    }
}
