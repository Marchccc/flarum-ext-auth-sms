<?php
namespace March\OauthSMS;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\Group\Group;
use Flarum\Post\Post;
use Flarum\User\User;
use SychO\ActionLog\Event\Logged;

class MarchSMS extends AbstractModel
{
    use EventGeneratorTrait;
    
    protected $guarded = [];
    
    protected $table = 'marchsms';
}