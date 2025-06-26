<?php

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

if (method_exists(Dotenv::class, 'bootEnv')) {
    (new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
}

if ($_SERVER['APP_DEBUG']) {
    umask(0000);
}

if ('test' === $_SERVER['APP_ENV']) {
    $kernel = new App\Kernel('test', true);
    $application = new Application($kernel);
    $application->setAutoExit(false);

    $application->run(new ArrayInput([
        'command' => 'doctrine:schema:drop',
        '--force' => true,
        '--env' => 'test',
        '--quiet' => true,
    ]));

    $application->run(new ArrayInput([
        'command' => 'doctrine:schema:create',
        '--env' => 'test',
        '--quiet' => true,
    ]));

    $application->run(new ArrayInput([
        'command' => 'doctrine:migrations:migrate',
        '--no-interaction' => true,
        '--env' => 'test',
    ]));

    $application->run(new ArrayInput([
        'command' => 'doctrine:fixtures:load',
        '--no-interaction' => true,
        '--env' => 'test',
    ]));
}
