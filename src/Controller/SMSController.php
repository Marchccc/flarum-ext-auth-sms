<?php

namespace March\OauthSMS\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Illuminate\Support\Arr;
use March\OauthSMS\Libraries\SMS;
use March\OauthSMS\MarchSMS;
use Carbon\Carbon;

class SMSController implements RequestHandlerInterface
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(ServerRequestInterface $request): Response
    {
        date_default_timezone_set("PRC");
        $body = $request->getParsedBody();
        $phone = Arr::get($body, 'phone');
        if ($phone == '') {
            return new JsonResponse('请输入手机号码', 404);
        }

        $code = random_int(100000, 999999);
        $SMS = new SMS($this->settings);
        try {
            // $res = true;
            $res = $SMS->sendSMS(
                $phone,
                $this->settings->get('march-auth-sms.TemplateCode'),
                $params = [
                    'code' => $code
                ],
                $this->settings->get('march-auth-sms.SignName')
            );
        } catch (\Throwable $th) {
            return new JsonResponse($th->getMessage(), 404);
        }

        if ($res === false) {
            return new JsonResponse('验证码发送失败', 404);
        }

        date_default_timezone_set("PRC");
        $created_at = Carbon::now();
        // 记录到表，后续用于校验
        MarchSMS::create([
            'phone' => $phone,
            'code' => $code,
            'is_active' => 0,
            'created_at' => $created_at
        ]);

        return new JsonResponse('验证码已发送', 200);
    }
}
