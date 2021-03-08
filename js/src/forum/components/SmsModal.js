import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import extractText from 'flarum/utils/extractText';
import Stream from 'flarum/utils/Stream';

/**
 * The `ForgotPasswordModal` component displays a modal which allows the user to
 * enter their email address and request a link to reset their password.
 *
 * ### Attrs
 *
 * - `email`
 */
export default class SmsModal extends Modal {
  oninit(vnode) {

    this.sendingSms = false;

    super.oninit(vnode);

    /**
     * The value of the email input.
     *
     * @type {Function}
     */
    this.email = Stream(this.attrs.email || '');
    this.code = Stream(this.attrs.code || '');
    this.send_button_text = '发送验证码';

    /**
     * Whether or not the password reset email was sent successfully.
     *
     * @type {Boolean}
     */
    this.success = false;
  }

  className() {
    return 'ForgotPasswordModal Modal--small';
  }

  title() {
    // return app.translator.trans('core.forum.forgot_password.title');
    return '短信登录';
  }

  content() {
    // if (this.success) {
      // return (
      //   <div className="Modal-body">
      //     <div className="Form Form--centered">
      //       <p className="helpText">{app.translator.trans('core.forum.forgot_password.email_sent_message')}</p>
      //       <div className="Form-group">
      //         <Button className="Button Button--primary Button--block" onclick={this.hide.bind(this)}>
      //           {app.translator.trans('core.forum.forgot_password.dismiss_button')}
      //         </Button>
      //       </div>
      //     </div>
      //   </div>
      // );
    // }

    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
            <div className="Form-group">
                <input
                className="FormControl"
                name="email"
                type="text"
                placeholder="手机号"
                bidi={this.email}
                disabled={this.loading}
                autocomplete="off"
                />
            </div>
            <div className="Form-group">
                <input
                className="FormControl"
                name="code"
                type="text"
                placeholder='验证码'
                style="width:50%;float:left;"
                bidi={this.code}
                disabled={this.loading}
                autocomplete="off"
                />
                {Button.component(
                {
                    className: 'Button Button--primary Button--block',
                    type: 'button',
                    style: "width:45%;",
                    onclick: () => this.sendSms(),
                    disabled: this.sendingSms,
                    loading: this.smsloading,
                },
                this.send_button_text
                )}
          </div>
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary Button--block',
                type: 'submit',
                loading: this.loading,
              },
              '登录 / 注册'
            )}
          </div>
        </div>
      </div>
    );
  }
  
    sendSms() {
      this.sendingSms = true;
      this.smsloading = true;
      super.onerror("");
      app
      .request({
          method: 'POST',
          url: app.forum.attribute('apiUrl') + '/sendsms',
          body: { 
              phone: this.email(),
              code: this.code(),
          },
          errorHandler: this.onerror.bind(this),
      })
      .then(() => {
          this.success = true;
          this.alert = null;
          this.smsloading = false;
          this.send_button_text = '已发送';
          console.log(111);
      })
      .catch(() => {})
      .then(this.loaded.bind(this));
    }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/smslogin',
        body: { 
            phone: this.email(),
            code: this.code(),
        },
        errorHandler: this.onerror.bind(this),
        // function(){
        //   this.loading = false;
        //   this.alert.content = this.response;
        //   super.onerror(error);
        // },
      })
      .then(() => {
        this.alert = null;
        this.success = true;
        this.alert = null;
        window.location.reload();
      })
      .catch(() => {})
      .then(this.loaded.bind(this));
  }

  onerror(error) {
    error.alert.content = error.response;
    super.onerror(error);
    this.smsloading = false;
    this.sendingSms = false;
    this.loading = false;
    console.log('err');
  }
}
