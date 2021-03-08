<?php

/*
 * This file is part of fof/oauth.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('marchsms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('phone');
            $table->string('code');
            $table->tinyInteger('is_active');
            $table->dateTime('created_at');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('marchsms');
    }
];