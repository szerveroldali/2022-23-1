@extends('layouts.app')
@section('title', 'Create category')

@section('content')
<div class="container">
    <h1>Create category</h1>
    <div class="mb-4">
        <a href="{{ route('posts.index') }}"><i class="fas fa-long-arrow-alt-left"></i> Back to the homepage</a>
    </div>

    @if (Session::has('category_created'))
        <div class="alert alert-success">
            Category successfully created!
        </div>
    @endif

    <form method="post" action="{{ route('categories.store') }}">
        @csrf

        <div class="form-group row mb-3">
            <label for="name" class="col-sm-2 col-form-label">Name*</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}">
                @error('name')
                    {{ $message }}
                @enderror
            </div>
        </div>

        <div class="form-group row mb-3">
            <label for="color" class="col-sm-2 col-form-label">Color*</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="color" name="color" value="{{ old('color') }}">
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
