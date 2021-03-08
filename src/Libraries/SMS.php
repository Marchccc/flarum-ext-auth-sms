<?php

namespace March\OauthSMS\Libraries;

use AlibabaCloud\Client\AlibabaCloud;

class SMS
{
    protected $config;

    public function __construct($seeting)
    {
        AlibabaCloud::accessKeyClient(
            $seeting->get('march-oauth-sms.accessKeyId'),
            $seeting->get('march-oauth-sms.accessKeySecret')
        )
            ->regionId('cn-hangzhou')
            ->asDefaultClient();
    }

    public function sendSMS($phone, $TemplateCode, $params = [], $SignName)
    {

        $query = [
            'RegionId' => 'cn-hangzhou',
            'PhoneNumbers' => $phone,
            'SignName' => $SignName,
            'TemplateCode' => $TemplateCode,
        ];
        if ($params) {
            $query['TemplateParam'] = json_encode($params);
        }

        $result = AlibabaCloud::rpc()
            ->product('Dysmsapi')
            // ->scheme('https') // https | http
            ->version('2017-05-25')
            ->action('SendSms')
            ->method('POST')
            ->host('dysmsapi.aliyuncs.com')
            ->options([
                'query' => $query,
            ])
            ->request();
        $res = $result->toArray();
        if ($res['Code'] == 'OK') {

            return true;
        }

        return false;
    }
}
