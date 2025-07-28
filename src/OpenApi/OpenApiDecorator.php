<?php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\PathItem;
use ApiPlatform\OpenApi\Model\RequestBody;
use ApiPlatform\OpenApi\Model\Response;
use ApiPlatform\OpenApi\OpenApi;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;

#[AsDecorator(decorates: 'api_platform.openapi.factory')]
class OpenApiDecorator implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        $schemas = $openApi->getComponents()->getSchemas();

        $schemas['Credentials'] = [
            'type' => 'object',
            'properties' => [
                'username' => ['type' => 'string'],
                'password' => ['type' => 'string'],
            ],
        ];

        $schemas['Token'] = [
            'type' => 'object',
            'properties' => [
                'token' => ['type' => 'string'],
            ],
        ];

        $pathItem = new PathItem(
            post: new Operation(
                operationId: 'postCredentialsItem',
                tags: ['Auth'],
                responses: [
                    '200' => new Response(
                        description: 'JWT Token',
                        content: new \ArrayObject([
                            'application/json' => [
                                'schema' => ['$ref' => '#/components/schemas/Token'],
                            ],
                        ])
                    ),
                ],
                summary: 'Get JWT token',
                requestBody: new RequestBody(
                    description: 'User credentials',
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => ['$ref' => '#/components/schemas/Credentials'],
                        ],
                    ]),
                )
            )
        );

        $openApi->getPaths()->addPath('/api/login', $pathItem);

        return $openApi;
    }
}
