<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // Mivel a mezők alapértelmezés szerint guarded által védettek, így a fillable-t ki kell tölteni a Post::create() használatához
    // protected $fillable = ["title", "text", "description", "cover_image_path", "author_id"];

    use HasFactory;

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories() {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
}
