// flarum可扩展的js列表
// https://api.docs.flarum.org/js/master/

// 或查看： vendor/flarum/core/js/src/forum/compat.js

// icont: https://fontawesome.com/icons?m=free


// 引入框架的 extend 功能
import { extend } from 'flarum/extend';

// 引入登录按钮列表
import LogInButtons from 'flarum/components/LogInButtons';

// 引入登录按钮
import LogInButton from 'flarum/components/LogInButton';
import SmsModal from './components/SmsModal';
import Button from 'flarum/components/Button';


app.initializers.add('march/oauth-sms', () => {
  // console.log('[march/oauth-sms] Hello, forum!');

  // 可以引入界面组件，然后修改，操作。
  // extend(HeaderPrimary.prototype, 'items', function(items) {
  //   items.add('google', <a href="https://google.com">Google</a>);
  // });

  // 扩展登录按钮列表
  extend(LogInButtons.prototype, 'items', (items) => {
      items.add('steam',
          <Button
              className={'Button LogInButton--steam LogInButton'}
              icon={'fas fa-mobile-alt'}
              onclick={() => app.modal.show(SmsModal)}>
              {'验证码登录'}
          </Button>
      );
  });

  
});

