<?php

namespace March\OauthSMS\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Http\Rememberer;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Flarum\Http\AccessToken;
use Flarum\User\Event\LoggedIn;
use Flarum\Http\SessionAuthenticator;
use Flarum\User\UserRepository;
use March\OauthSMS\MarchSMS;

class SMSAuthController implements RequestHandlerInterface
{
    /**
     * @var \Flarum\User\UserRepository
     */
    protected $users;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var SessionAuthenticator
     */
    protected $authenticator;

    /**
     * @var Rememberer
     */
    protected $rememberer;

    protected $valid_period = 30 * 3; // sms timeout 3 minute

    public function __construct(
        UserRepository $users,
        SettingsRepositoryInterface $settings,
        SessionAuthenticator $authenticator,
        Rememberer $rememberer
    ) {
        $this->users = $users;
        $this->settings = $settings;
        $this->authenticator = $authenticator;
        $this->rememberer = $rememberer;
    }

    public function handle(ServerRequestInterface $request): Response
    {
        date_default_timezone_set("PRC");
        $body = $request->getParsedBody();
        $phone = Arr::get($body, 'phone');
        $code = (int) Arr::get($body, 'code');
        if ($phone == '') {
            return new JsonResponse('请输入手机号码', 404);
        }
        if ($code == '') {
            return new JsonResponse('请输入短信验证码', 404);
        }

        $sms_response = MarchSMS::where([
            'phone' => $phone,
            // 'code' => $code,
            'is_active' => 0
        ])->orderBy('id', 'desc')->first();

        if (!$sms_response) {
            return new JsonResponse('请先发送验证码', 404);
        }

        if ((int) $sms_response->code !== $code) {
            return new JsonResponse('验证码错误', 404);
        }

        $sms_response->is_active = 1;
        $sms_response->save();

        if ($sms_response->created_at > date('Y-m-d H:i:s', time() + $this->valid_period)) {
            return new JsonResponse('验证码已过期，请重新获取', 404);
        }

        // Login
        $user = User::where([
            'email' => $phone
        ])->first();

        if (!$user) {
            // Register
            $password = Str::random(20);
            $username = substr_replace($phone, '', 3, 6);
            if (User::where([
                'username' => $username
            ])->first()) {
                $username .= '_';
            }

            // random username by only
            while (User::where([
                'username' => $username
            ])->first()) {
                $username .= Str::random(1);
            }

            $user = User::register($username, $phone, $password);
            $user->activate();
            $user->save();
        }

        $lifetime = 3600;
        $session = $request->getAttribute('session');
        $this->authenticator->logIn($session, $user->id);


        $token = AccessToken::generate($user->id, $lifetime);
        $token->save();
        event(new LoggedIn($this->users->findOrFail($user->id), $token));

        $response = new JsonResponse([
            'token' => $token->token,
            'userId' => $user->id
        ]);
        $response = $this->rememberer->remember($response, $token);
        return $response;
    }
}
