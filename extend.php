<?php

/*
 * This file is part of march/oauth-sms.
 *
 * Copyright (c) 2021 Marchccc.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace March\OauthSMS;

use Flarum\Extend;
use March\OauthSMS\Controller;
use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface as Request;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),


    // (new Extend\Routes('forum'))
    //     ->get('/auth/sms', 'auth.sms', Controller\SMSAuthController::class),
    
    (new Extend\Routes('api'))
        ->post('/sendsms', 'march.sendsms', Controller\SMSController::class),
    (new Extend\Routes('api'))
        ->post('/smslogin', 'march.smslogin', Controller\SMSAuthController::class),

    // (new Extend\Routes('forum'))
    //     ->get('/hello-world', 'march.hello-world', Controller\HelloWorldController::class),
    
    // (new Extend\Frontend('forum'))
    //     ->route('/users', 'march.users', function (Document $document, Request $request) {
    //         $document->title = 'Users';
    //     })

];
