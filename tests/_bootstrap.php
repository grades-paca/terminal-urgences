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
    'command' => 'doctrine:schema:drop',
    '--force' => true,
    '--env' => 'test',
    '--quiet' => true,
]), $output);

$application->run(new ArrayInput([
    'command' => 'doctrine:schema:create',
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
    '--no-interaction' => true,
    '--env' => 'test',
]), $output);
