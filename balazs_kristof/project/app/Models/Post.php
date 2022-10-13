<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function Symfony\Component\String\b;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'text',
    ];


    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
