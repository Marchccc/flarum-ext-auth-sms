app.initializers.add('march-auth-sms', function(app) {
  // 增加设置项
  app.extensionData
    .for('march-auth-sms')
    .registerSetting(
      {
        setting: 'march-auth-sms.accessKeyId', // This is the key the settings will be saved under in the settings table in the database.
        // label: app.translator.trans('acme-interstellar.admin.coordinates_label'), // The label to be shown letting the admin know what the setting does.
        label: 'accessKeyId', // The label to be shown letting the admin know what the setting does.
        type: 'text', // What type of setting this is, valid options are: boolean, text (or any other <input> tag type), and select. 
      },
    )
    .registerSetting(
      {
        setting: 'march-auth-sms.accessKeySecret',
        label: 'accessKeySecret',
        type: 'text',
      },
    )
    .registerSetting(
      {
        setting: 'march-auth-sms.SignName',
        label: 'SignName（签名名称）',
        type: 'text',
      },
    )
    .registerSetting(
      {
        setting: 'march-auth-sms.TemplateCode',
        label: 'TemplateCode（短信模板CODE）',
        type: 'text',
      },
    )
});
