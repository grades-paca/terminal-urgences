<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-admin',
    description: 'Crée ou met à jour un utilisateur admin.',
)]
class CreateAdminUserCommand extends Command
{
    private EntityManagerInterface $em;
    private UserPasswordHasherInterface $hasher;
    private ContainerBagInterface $params;

    public function __construct(
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        ContainerBagInterface $params,
    ) {
        parent::__construct();
        $this->em = $em;
        $this->hasher = $hasher;
        $this->params = $params;
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        /** @var QuestionHelper $helper */
        $helper = $this->getHelper('question');

        $username = $this->params->get('admin.username');
        $plainPassword = $this->params->get('admin.password');

        if (!$username || !$plainPassword) {
            $io->error('Les variables ADMIN_USERNAME et ADMIN_PASSWORD doivent être définies.');

            return Command::FAILURE;
        }

        $repo = $this->em->getRepository(User::class);
        $existingUser = $repo->findOneBy(['username' => $username]);

        if ($existingUser) {
            $question = new ConfirmationQuestion(
                "Un utilisateur avec l'username <info>$username</info> existe déjà. Voulez-vous l’écraser ? (y/N) ",
                false
            );

            if (!$helper->ask($input, $output, $question)) {
                $io->warning('Aucun changement effectué.');

                return Command::SUCCESS;
            }

            $user = $existingUser;
            $io->note('Mise à jour de l’utilisateur existant.');
        } else {
            $user = new User();
            $user->setUsername($username);
            $io->note('Création d’un nouvel utilisateur admin.');
        }

        $user->setRoles(['ROLE_ADMIN']);
        $hashedPassword = $this->hasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);

        $this->em->persist($user);
        $this->em->flush();

        $io->success("Admin $username configuré avec succès.");

        return Command::SUCCESS;
    }
}
