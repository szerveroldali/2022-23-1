<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'content', 'author_id', 'image_filename'];

    public function author(){
        return $this->belongsTo(User::class);
    }

    public function categories(){
        return $this -> belongsToMany(Category::class);
    }
}
