<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'priority',
        'user_id',
    ];

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
