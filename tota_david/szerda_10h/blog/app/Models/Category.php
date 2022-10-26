<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public static $style = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

    public function posts()
    {
        return $this->belongsToMany(Post::class)->withTimestamps();
    }
}
