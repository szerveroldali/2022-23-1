<x-guest-layout>
    <x-slot name="title">
        {{ $post -> title }}
    </x-slot>

    <div class="container mx-auto">
    <h1 class="text-2xl font-medium">{{ $post -> title }}</h1>
    Szerző: {{ $post -> author -> name }}<br><br>
    {!! str_replace('\n\n', '<br><br>', $post -> content) !!} <br>

    @can('delete', $post)
    <form method="POST" action="{{ route('posts.destroy', $post) }}" id="post-delete-form">
        @csrf
        @method('DELETE')
    <a href="{{ route('posts.destroy', $post) }}"
    onclick="event.preventDefault(); document.querySelector('#post-delete-form').submit();"
    class="bg-red-500 hover:bg-red-700 px-2 py-1 text-white"><i
        class="fas fa-trash"></i> Törlés</a>
    </form>
    @endcan 
    
    </div>

    
</x-guest-layout>