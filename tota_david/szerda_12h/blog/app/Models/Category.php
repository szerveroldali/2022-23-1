<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public static $styles = ['primary', 'secondary','danger', 'warning', 'info', 'dark'];

    public function posts() {
        return $this->belongsToMany(Post::class)->withTimestamps();
    }
}
