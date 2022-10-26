@extends('layouts.app')
@section('title', 'Edit category: ' . $category->name)

@section('content')
<div class="container">
    <h1>Edit category <span class="badge" style="background-color: {{ $category->color }}">{{ $category->name }}</span></h1>
    <div class="mb-4">
        <a href="{{ route('posts.index') }}"><i class="fas fa-long-arrow-alt-left"></i> Back to the homepage</a>
    </div>

    @if (Session::has('category_updated'))
        <div class="alert alert-success">
            Category successfully updated!
        </div>
    @endif

    {{-- TODO: action, method --}}
    <form method="post" action="{{ route('categories.update', $category->id) }}">
        @csrf
        @method('PATCH')

        <div class="form-group row mb-3">
            <label for="name" class="col-sm-2 col-form-label">Name*</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="name" name="name" value="{{ $category->name }}">
                @error('name')
                    {{ $message }}
                @enderror
            </div>
        </div>

        <div class="form-group row mb-3">
            <label for="color" class="col-sm-2 col-form-label">Color*</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="color" name="color" value="{{ $category->color }}">
                @error('color')
                    {{ $message }}
                @enderror
            </div>
        </div>
        </div>

        <div class="text-center">
            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Store</button>
        </div>

    </form>
</div>
@endsection