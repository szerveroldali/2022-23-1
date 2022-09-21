<x-guest-layout>
    <x-slot name="title">
        Főoldal
    </x-slot>
<div class="container mx-auto p-3 lg:px-36">
    <div class="grid grid-cols-1 lg:grid-cols-2 mb-4">
        <div>
            <h1 class="font-bold my-4 text-4xl">Szerveroldali Blog</h1>
        </div>
        <div class="flex items-center gap-2 lg:justify-end">
            <a href="" class="bg-green-500 hover:bg-green-700 px-2 py-1 text-white"><i
                    class="fas fa-plus-circle"></i> Új kategória</a>
            <a href="" class="bg-green-500 hover:bg-green-700 px-2 py-1 text-white"><i
                    class="fas fa-plus-circle"></i> Új bejegyzés</a>
        </div>
    </div>
    <div class="grid grid-cols-4 gap-6">
        <div class="col-span-4 lg:col-span-3">
            <h2 class="font-semibold text-3xl my-2">Minden bejegyzés</h2>
            <div class="grid grid-cols-3 gap-3">
                <div class="col-span-3 lg:col-span-1">
                    <img src="https://www.ispreview.co.uk/wp-content/uploads/london_city_2017_uk.jpg">
                    <div class="px-2.5 py-2 border-r border-l border-b border-gray-400 ">
                        <h3 class="text-xl mb-0.5 font-semibold">
                            Egy almafa
                        </h3>
                        <h4 class="text-gray-400">
                            <span class="mr-2"><i class="fas fa-user"></i>John Doe</span>
                        </h4>
                        <p class="text-gray-600 mt-1">
                            Maecenas nibh massa, bibendum sit amet placerat eu, faucibus at massa. Nam condimentum nibh
                            leo, vitae hendrerit quam pretium sit amet.
                        </p>
                        <button
                            class="bg-blue-500 hover:bg-blue-600 px-1.5 py-1 text-white mt-3 font-semibold">Elolvasom <i
                                class="fas fa-angle-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-4 lg:col-span-1">
            <h2 class="font-semibold text-3xl my-2">Menü</h2>
            <div class="grid grid-cols-1 gap-3">
                <div class="border px-2.5 py-2 border-gray-400">
                    <form>
                        <label for="name" class="block font-medium text-xl text-gray-700">Keresés</label>
                        <input type="text" name="name" id="name"
                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300"
                            placeholder="Bejegyzés címe">
                        <button type="submit"
                            class="mt-3 bg-blue-500 hover:bg-blue-600 text-gray-100 font-semibold px-2 py-1"><i
                                class="fas fa-search"></i> Keresés</button>
                    </form>
                </div>
                <div class="border px-2.5 py-2 border-gray-400">
                    <h3 class="mb-0.5 text-xl font-semibold">
                        Kategóriák
                    </h3>
                    <div class="flex flex-row flex-wrap gap-1 mt-3">
                        <a href="#" class="py-0.5 px-1.5 font-semibold bg-blue-800 text-white text-sm">Kék</a>
                        <a href="#" class="py-0.5 px-1.5 font-semibold bg-red-800 text-white text-sm">Piros</a>
                        <a href="#" class="py-0.5 px-1.5 font-semibold bg-yellow-800 text-white text-sm">Sárga</a>
                        <a href="#" class="py-0.5 px-1.5 font-semibold bg-green-800 text-white text-sm">Zöld</a>
                    </div>
                </div>
                <div class="border px-2.5 py-2 border-gray-400">
                    <h3 class="mb-0.5 text-xl font-semibold">
                        Statisztika
                    </h3>
                    <ul class="fa-ul">
                        <li><span class="fa-li"><i class="fas fa-user"></i></span>Felhasználók: ?</li>
                        <li><span class="fa-li"><i class="fas fa-file-alt"></i></span>Bejegyzések: ?</li>
                        <li><span class="fa-li"><i class="fas fa-comments"></i></span>Hozzászólások: ?</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</div>
</x-guest-layout>