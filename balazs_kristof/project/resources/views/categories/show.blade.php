@extends('layouts.app')
@section('title', 'Posts')

@section('content')
<div class="container">
    <div class="row justify-content-between">
        <div class="col-12 col-md-8">
            <h1>Posts for <span class="badge" style="background-color: {{ $category->color }}">{{ $category->name }}</span></h1>
        </div>
        <div class="col-12 col-md-4">
            <div class="float-lg-end">

                <a href="{{ route('categories.edit', $category->id) }}" role="button" class="btn btn-sm btn-primary">
                    <i class="far fa-edit"></i> Edit category
                </a>

                <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#delete-confirm-modal">
                    <i class="far fa-trash-alt"></i> Delete category
                </button>

            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="delete-confirm-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Confirm delete</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete category <strong>{{ $category->name }}</strong>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="document.getElementById('delete-category-form').submit();"
                    >
                        Yes, delete this category
                    </button>

                    <form id="delete-category-form" action="{{ route('categories.destroy', $category->id) }}" method="POST" class="d-none">
                        @csrf    
                        @method('DELETE')
                    </form>
                </div>
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
                                        <span>By {{ $post->user->name }} </span>
                                    </span>

                                    <span>
                                        <i class="far fa-calendar-alt"></i>
                                        <span>{{ $post->created_at }}</span>
                                    </span>
                                </p>

                                @foreach ($post->categories as $category)
                                    <a href="{{ route('categories.show', $category->id) }}" class="text-decoration-none">
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
                {{ $posts->links() }}
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
                                    <li><span class="fa-li"><i class="fas fa-layer-group"></i></span>Categories:  {{ $categories->count() }}</li>
                                    <li><span class="fa-li"><i class="fas fa-file-alt"></i></span>Posts:  {{ $post_count }}</li>
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
