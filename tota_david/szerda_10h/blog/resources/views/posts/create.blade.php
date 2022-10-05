@extends('layouts.app')
@section('title', 'Create post')

@section('content')
<div class="container">
    <h1>Create post</h1>
    <div class="mb-4">
        {{-- TODO: Link --}}
        <a href="#"><i class="fas fa-long-arrow-alt-left"></i> Back to the homepage</a>
    </div>

    {{-- TODO: action, method, enctype --}}
    <form>

        {{-- TODO: Validation --}}

        <div class="form-group row mb-3">
            <label for="title" class="col-sm-2 col-form-label">Title*</label>
            <div class="col-sm-10">
                <input type="text" class="form-control " id="title" name="title" value="">
            </div>
        </div>

        {{--
            Handling invalid input fields:

            <input type="text" class="form-control is-invalid" ...>
            <div class="invalid-feedback">
                Message
            </div>
        --}}

        <div class="form-group row mb-3">
            <label for="description" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
                <input type="text" class="form-control " id="description" name="description" value="">
            </div>
        </div>

        <div class="form-group row mb-3">
            <label for="text" class="col-sm-2 col-form-label">Text*</label>
            <div class="col-sm-10">
                <textarea rows="5" class="form-control" id="text" name="text"></textarea>
            </div>
        </div>

        <div class="form-group row mb-3">
            <label for="categories" class="col-sm-2 col-form-label py-0">Categories</label>
            <div class="col-sm-10">
                {{-- TODO: Read post categories from DB --}}
                @forelse (['primary', 'secondary','danger', 'warning', 'info', 'dark'] as $category)
                    <div class="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            value="{{ $category }}"
                            id="{{ $category }}"
                            {{-- TODO: name, checked --}}
                        >
                        {{-- TODO --}}
                        <label for="{{ $category }}" class="form-check-label">
                            <span class="badge bg-{{ $category }}">{{ $category }}</span>
                        </label>
                    </div>
                @empty
                    <p>No categories found</p>
                @endforelse
            </div>
        </div>

        <div class="form-group row mb-3">
            <label for="cover_image" class="col-sm-2 col-form-label">Cover image</label>
            <div class="col-sm-10">
                <div class="form-group">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <input type="file" class="form-control-file" id="cover_image" name="cover_image">
                        </div>
                        <div id="cover_preview" class="col-12 d-none">
                            <p>Cover preview:</p>
                            <img id="cover_preview_image" src="#" alt="Cover preview">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center">
            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Store</button>
        </div>
    </form>
</div>
@endsection

@section('scripts')
<script>
    const coverImageInput = document.querySelector('input#cover_image');
    const coverPreviewContainer = document.querySelector('#cover_preview');
    const coverPreviewImage = document.querySelector('img#cover_preview_image');

    coverImageInput.onchange = event => {
        const [file] = coverImageInput.files;
        if (file) {
            coverPreviewContainer.classList.remove('d-none');
            coverPreviewImage.src = URL.createObjectURL(file);
        } else {
            coverPreviewContainer.classList.add('d-none');
        }
    }
</script>
@endsection
