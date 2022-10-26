<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'priority',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'done' => 'boolean',
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
