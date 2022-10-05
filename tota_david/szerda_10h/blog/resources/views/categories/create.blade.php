@extends('layouts.app')
@section('title', 'Create category')

@section('content')
<div class="container">
    <h1>Create category</h1>
    <div class="mb-4">
        {{-- TODO: Link --}}
        <a href="#"><i class="fas fa-long-arrow-alt-left"></i> Back to the homepage</a>
    </div>

    {{-- TODO: Session flashes --}}

    {{-- TODO: action, method --}}
    <form>

        <div class="form-group row mb-3">
            <label for="name" class="col-sm-2 col-form-label">Name*</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="name" name="name" value="">
            </div>
        </div>

        <div class="form-group row mb-3">
            <label for="style" class="col-sm-2 col-form-label py-0">Style*</label>
            <div class="col-sm-10">
                @foreach (['primary', 'secondary','danger', 'warning', 'info', 'dark'] as $style)
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="style"
                            id="{{ $style }}"
                            value="{{ $style }}"
                            {{-- TODO: checked --}}
                        >
                        <label class="form-check-label" for="{{ $style }}">
                            <span class="badge bg-{{ $style }}">{{ $style }}</span>
                        </label>
                    </div>
                @endforeach
                {{-- TODO: Error handling --}}

            </div>
        </div>

        <div class="text-center">
            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Store</button>
        </div>

    </form>
</div>
@endsection
