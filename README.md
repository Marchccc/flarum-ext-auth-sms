# SMS Login

A [Flarum](http://flarum.org) extension. Allow users to log in with SMS

### 重要说明
1. 本扩展目前仅支持阿里云SMS
2. 本扩展未做多语言包
3. 用户名默认取手机号前3位+后2位，若重复会自动增加随机字符串。
4. 建议搭配官方扩展 nicknames 使用，开启并设置所有用户可编辑自己的昵称。然后在基本设置中将User Display Name 设置为 nickname
5. 如果后续用户多的话，会进行调整以支持短信服务商和其他语言。

### Installation

```sh
composer require march/flarum-ext-auth-sms
php flarum cache:clear
```

### Updating

```sh
composer update march/flarum-ext-auth-sms
php flarum cache:clear
```

### Links

- [Packagist](https://packagist.org/packages/marchccc/flarum-ext-auth-sms)