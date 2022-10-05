@extends('layouts.app')
{{-- TODO: Post title --}}
@section('title', 'View post: ')

@section('content')
<div class="container">

    {{-- TODO: Session flashes --}}

    <div class="row justify-content-between">
        <div class="col-12 col-md-8">
            {{-- TODO: Title --}}
            <h1>Post title</h1>

            <p class="small text-secondary mb-0">
                <i class="fas fa-user"></i>
                {{-- TODO: Author --}}
                <span>By Author</span>
            </p>
            <p class="small text-secondary mb-0">
                <i class="far fa-calendar-alt"></i>
                {{-- TODO: Date --}}
                <span>01/01/2022</span>
            </p>

            <div class="mb-2">
                {{-- TODO: Read post categories from DB --}}
                @foreach (['primary', 'secondary','danger', 'warning', 'info', 'dark'] as $category)
                    <a href="#" class="text-decoration-none">
                        <span class="badge bg-{{ $category }}">{{ $category }}</span>
                    </a>
                @endforeach
            </div>

            {{-- TODO: Link --}}
            <a href="#"><i class="fas fa-long-arrow-alt-left"></i> Back to the homepage</a>

        </div>

        <div class="col-12 col-md-4">
            <div class="float-lg-end">

                {{-- TODO: Links, policy --}}
                <a role="button" class="btn btn-sm btn-primary" href="#"><i class="far fa-edit"></i> Edit post</a>

                <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#delete-confirm-modal"><i class="far fa-trash-alt">
                    <span></i> Delete post</span>
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
                    {{-- TODO: Title --}}
                    Are you sure you want to delete post <strong>N/A</strong>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="document.getElementById('delete-post-form').submit();"
                    >
                        Yes, delete this post
                    </button>

                    {{-- TODO: Route, directives --}}
                    <form id="delete-post-form" action="#" method="POST" class="d-none">

                    </form>
                </div>
            </div>
        </div>
    </div>

    <img
        id="cover_preview_image"
        {{-- TODO: Cover --}}
        src="{{ asset('images/default_post_cover.jpg') }}"
        alt="Cover preview"
        class="my-3"
    >

    <div class="mt-3">
        {{-- TODO: Post paragraphs --}}
         Lorem ipsum
    </div>
</div>
@endsection
