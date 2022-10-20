@extends('layouts.app')
@section('title', 'Posts')

@section('content')
<div class="container">
    <div class="row justify-content-between">
        <div class="col-12 col-md-8">
            <h1>All posts</h1>
        </div>
        <div class="col-12 col-md-4">
            <div class="float-lg-end">
                {{-- TODO: Links, policy --}}

                <a href="#" role="button" class="btn btn-sm btn-success mb-1"><i class="fas fa-plus-circle"></i> Create post</a>

                <a href="/categories/create" role="button" class="btn btn-sm btn-success mb-1"><i class="fas fa-plus-circle"></i> Create category</a>

            </div>
        </div>
    </div>

    {{-- TODO: Session flashes --}}

    <div class="row mt-3">
        <div class="col-12 col-lg-9">
            <div class="row">
                @forelse ($posts as $post)
                    <div class="col-12 col-md-6 col-lg-4 mb-3 d-flex align-self-stretch">
                        <div class="card w-100">
                            <img
                                src="{{ asset('images/default_post_cover.jpg') }}"
                                class="card-img-top"
                                alt="Post cover"
                            >
                            <div class="card-body">
                                <h5 class="card-title mb-0">{{ $post->title }}</h5>
                                <p class="small mb-0">
                                    <span class="me-2">
                                        <i class="fas fa-user"></i>
                                        <span>By {{ $post->user->name }}</span>
                                    </span>

                                    <span>
                                        <i class="far fa-calendar-alt"></i>
                                        <span>{{ $post->created_at }}</span>
                                    </span>
                                </p>

                                @foreach ($post->categories as $category)
                                    <a href="/categories/{{ $category->id }}" class="text-decoration-none">
                                        <span class="badge" style="background-color: {{ $category->color}};">{{ $category->name }}</span>
                                    </a>
                                @endforeach

                                <p class="card-text mt-1">{{ $post->desc }}</p>
                            </div>
                            <div class="card-footer">
                                <a href="{{ route('posts.show', $post->id) }}" class="btn btn-primary">
                                    <span>View post</span> <i class="fas fa-angle-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="alert alert-warning" role="alert">
                            No posts found!
                        </div>
                    </div>
                @endforelse
            </div>

            <div class="d-flex justify-content-center">
                {{-- TODO: Pagination --}}
            </div>

        </div>
        <div class="col-12 col-lg-3">
            <div class="row">
                <div class="col-12 mb-3">
                    <div class="card bg-light">
                        <div class="card-header">
                            Categories
                        </div>
                        <div class="card-body">
                            @foreach ($categories as $category)
                                <a href="{{ route('categories.show', $category->id) }}" class="text-decoration-none">
                                    <span class="badge" style="background-color: {{ $category->color }}">{{ $category->name }}</span>
                                </a>
                            @endforeach
                        </div>
                    </div>
                </div>

                <div class="col-12 mb-3">
                    <div class="card bg-light">
                        <div class="card-header">
                            Statistics
                        </div>
                        <div class="card-body">
                            <div class="small">
                                <ul class="fa-ul">
                                    <li><span class="fa-li"><i class="fas fa-user"></i></span>Users: {{ $user_count }}</li>
                                    <li><span class="fa-li"><i class="fas fa-layer-group"></i></span>Categories: {{ $categories->count() }}</li>
                                    <li><span class="fa-li"><i class="fas fa-file-alt"></i></span>Posts: {{ $posts->count() }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
