<?php

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;

require dirname(__DIR__).'/vendor/autoload.php';

$kernel = new App\Kernel('test', true);
$kernel->boot();

$application = new Application($kernel);
$application->setAutoExit(false);

$output = new NullOutput();

$application->run(new ArrayInput([
    'command' => 'doctrine:database:drop',
    '--force' => true,
    '--if-exists' => true,
    '--env' => 'test',
    '--quiet' => true,
]), $output);

$application->run(new ArrayInput([
    'command' => 'doctrine:database:create',
    '--env' => 'test',
    '--quiet' => true,
]), $output);

$application->run(new ArrayInput([
    'command' => 'doctrine:migrations:migrate',
    '--no-interaction' => true,
    '--env' => 'test',
]), $output);

$application->run(new ArrayInput([
    'command' => 'hautelook:fixtures:load',
    '--env' => 'test',
    '--no-bundles' => true,
    '--no-interaction' => true,
    '--purge-with-truncate' => true,
]), $output);
