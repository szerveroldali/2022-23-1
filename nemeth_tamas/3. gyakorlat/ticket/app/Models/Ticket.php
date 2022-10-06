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
    ];

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function users() {
        return $this->belongsToMany(User::class)->withPivot('is_submitter', 'is_responsible');
    }

    public function submitter() {
        return $this->belongsToMany(User::class)
            ->withPivot('is_submitter', 'is_responsible')
            ->wherePivot('is_submitter', 1);
    }

    public function notSubmitters() {
        return $this->belongsToMany(User::class)
            ->withPivot('is_submitter', 'is_responsible')
            ->wherePivot('is_submitter', 0);
    }
}
